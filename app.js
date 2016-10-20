"use strict";
var anwbApi = require('./anwbapi');
var api = null;
function init() {
	Homey.log('Initialize ANWB Traffic application');

	api = new anwbApi();
	
	//Homey React on speech inputs
	Homey.log("Init speech inputs");
	Homey.manager('speech-input').on('speech',function(speech,callback){
		switch(trigger.id){
			case 'tell_traffic_info':
				reportAllTrafficInformation();
				return true;
		}
	});

	// Homey react on actions from flows
	Homey.log("Init flow actions and triggers");
	Homey.manager('flow').on('action.anwb_tell_trafic_all',function(callback,args){
		triggerReportAllTrafficInformation(callback);
		callback(null,true);
	})

	Homey.manager('flow').on('action.anwb_tell_traffic_single',function(callback,args){
		triggerReportSingleTrafficInformation(callback,args['road']);
		callback(null,true);
	})

	Homey.manager('flow').on('action.anwb_tell_various',function(callback,args){
		triggerVariousTrafficInformation(callback,args['road'],args['eventType']);
	});

	Homey.manager('flow').on('action.anwb_check_traffic_size',function(callback,args){
		
		triggerReportSummary(callback,args['road']);
	});

	Homey.manager('flow').on('condition.anwb_check_traffic',function(callback,args){
		
		triggerCheckTrafficCondition(callback,args['road']);
	});



	Homey.log('Done initialize ANWB Traffic application');
}

var triggerReportSummary = function(callback){
	
	api.getSummary(function(data){
		Homey.log(JSON.stringify(data));
		reportSummary(data);
		callback(null,true);
	},
	function(data){
		Homey.log(JSON.stringify(data));
		callback(null,false);
	});
}

var triggerCheckTrafficCondition = function(callback, roadName){
	api.getTrafficInfo(function(data){
		Homey.log(JSON.stringify(data));
		callback(null,(data.length > 0));
	},function(data){
		onError(data);
		callback(null,false);
	},[],roadName,['trafficjam']);	
}

var triggerVariousTrafficInformation = function(callback,roadName,eventtype){
	api.getTrafficInfo(function(data){
		onreportTraficInformation(data,[eventtype])
		callback(null,true);
	},onError,[],roadName,[eventtype]);
}

var triggerReportSingleTrafficInformation = function(callback, roadName){
	api.getTrafficInfo(function(data){
		onreportTraficInformation(data,['trafficjam'])
		callback(null,true);
	},onError,[],[roadName],['trafficjam']);
}

var triggerReportAllTrafficInformation = function(callback){
	api.getTrafficInfo(function(data){
		onreportTraficInformation(data,['trafficjam']);
		callback(null,true);
	},function(data){
		Homey.log('Fout tijdens ophalen data.');
		callback(null,false);
	},[],[],['trafficjam']);
}

var onreportTraficInformation =  function(trafficInfo,eventType){
	
	Homey.log(eventType);
	var strLabelNoData = "noinformationfound";
	switch(eventType[0]){
		case 'trafficjam':
			strLabelNoData  = 'notrafficjams';
			break;
		case 'roadwork':
			strLabelNoData = 'noroadblocks';
			break;
		case 'radar':
			strLabelNoData = 'nopolicechecks';
			break;
	}

	if(trafficInfo.length == 0){
		Homey.manager('speech-output').say(__(strLabelNoData));
		return true;
	}

	for(var i = 0; i < trafficInfo.length;i++){
		for(var j = 0; j < eventType.length;j++){
			speakRoadEntry(trafficInfo[i],eventType[j]);
		}
	}
	return true;
	
}

var onError = function(data){
	Homey.log(JSON.stringify(data));
	Homey.manager('speech-output').say(_('onerror'));
}

var reportSummary = function(data){
	var totals = data.totals.all;

	var label = "summary_plural";
	var options = {};
	options.count = totals.count;
	options.distance = formatDistance(totals.distance,false);

	if(options.count == 1){
		label = "summary_single";
	}
	if(options.count == 0){
		label = "notrafficjams";
	}

	Homey.manager('speech-output').say(__(label,options));


}

var speakRoadEntry = function(entry,eventType){
	var entries = [];
	var labelNoEntries = "noinformationfound"
	switch(eventType){
		case 'trafficjam':
			if(entry.events.trafficJams.length > 0){
				entries = entry.events.trafficJams;
			}
			break;
		case 'roadwork':
			if(entry.events.roadWorks.length > 0){
				entries = entry.events.roadWorks;
			}
			break;
		case 'radar':
			if(entry.events.radars.length > 0){
				entries = entry.events.radars;
			}
			break;
	}
	
	Homey.log(entries.length);

	if(entries.length < 0){
		Homey.manager('speech-output').say(__('noinformationfound'));
		return;
	}

	for(var i = 0;i<entries.length;i++){
		var entryLine = entries[i];
		speakEventEntry(entry.road,entryLine,eventType);
	}
}

var speakEventEntry = function(roadname,eventData,eventType){
	Homey.log('Speak event entry');
	Homey.log('Road name : '+roadname);
	
	var label = "";
	var options = {};
	options.roadname = roadname;
	switch(eventType){
		case 'roadwork':
			label = "roadworkentry";
			options.description = eventData.description;
		break;
		case 'radar':
			label = "policecheckentry";
			options.description = eventData.description;
		break;
		case 'trafficjam':
			label = "trafficjamentry";
			options.from = eventData.from;
			options.to = eventData.to;
			options.distance = formatDistance(eventData.distance,true);
			options.delay = formatDelay(eventData.delay);
			options.description = eventData.description;
			
		break;
	}
	if(options.hasOwnProperty('to')){
		options.to = formatDescription(options.to);
	}
	if(options.hasOwnProperty('from')){
		options.from = formatDescription(options.from);
	}
	if(options.hasOwnProperty('description')){
		options.description = formatDescription(options.description);
	}
	

	Homey.manager('speech-output').say(__(label,options));
	Homey.manager('speech-output').say(__(options.description));
	

}

var formatDescription = function(txt){
	var placeholder = "knp";
	var replacement = "knooppunt";
	var currentLanguage = Homey.manager('i18n').getLanguage();
	if(currentLanguage != "nl"){
		replacement = "junction";
	}
	return txt.replace(/knp/g,replacement);
}


var formatDelay = function(delay){
	if(delay == null || delay == undefined){
		return Homey.manager('i18n').__('unknown');
	}
	if(delay < 60){
		return Homey.manager('i18n').__('less_then_minute'); // TODO vertaling
	}else{
		delay = Math.ceil(delay);
	}
	return delay / 60 + Homey.manager('i18n').__('minutes'); 
}

var formatDistance = function(distance,meters){
	if(distance != null && distance != undefined){
	
		if(Homey.manager('i18n').getUnits() == "metric"){
			if(meters){
				return Math.ceil(distance) / 1000 + " kilometer";
			}else{
				return distance + " kilometer";
			}
			
		}else{
			if(meters){
				return Math.ceil(distance) / 1609 + " miles";
			}else{
				return Math.ceil(distance / 1,609)+ " miles";
			}
			
		}
	}
	return "";
}

module.exports.init = init;