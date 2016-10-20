"use strict";
var https = require('http');
function init() {
	Homey.log('Initialize ANWB Traffic application');


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
		triggerReportAllTrafficInformation();
		callback(null,true);
	})

	Homey.manager('flow').on('action.anwb_tell_traffic_single',function(callback,args){
		triggerReportSingleTrafficInformation(args['road']);
		callback(null,true);
	})

	Homey.manager('flow').on('action.anwb_tell_various',function(callback,args){
		triggerVariousTrafficInformation(args['road'],args['eventType']);
	});

	Homey.manager('flow').on('condition.anwb_check_traffic',function(callback,args){
		
		triggerCheckTrafficCondition(callback,args['road'],['trafficjam']);
	});


	Homey.log('Done initialize ANWB Traffic application');
}

var triggerCheckTrafficCondition = function(callback, roadName, eventType){

	var options = {};
	options.host = 'www.anwb.nl';
	options.path = '/feeds/gethf';
	var returnValue = true;
	https.get(options,function(res){
		var body = '';
		res.on('data',function(chunk){
			body += chunk;	
		}).on('end',function(){
			var trafficInfo = JSON.parse(body).roadEntries;
				trafficInfo = filterEventType(trafficInfo,eventType); // filter road entries based on event type
				trafficInfo = filterRoadNames(trafficInfo,roadName); // filter road entries based on road name
				callback(null,(trafficInfo.length > 0));
				return;
		});
	}).on('error',function(error){
		Homey.log('error retrieving schedule');
		Homey.log(JSON.stringify(error));
	});
	
	//callback(null,true);
}

var triggerVariousTrafficInformation = function(roadName,eventtype){

	if(roadName != ""){
		roadName = [roadName];
	}else{
		roadName = [];
	}
	var options = {};
		options.host = 'www.anwb.nl';
		options.path = '/feeds/gethf';
		
		https.get(options,function(res){
			var body = '';
			res.on('data',function(chunk){
				body += chunk;	
			}).on('end',function(){
				onreportTraficInformation(JSON.parse(body).roadEntries,[],roadName,[eventtype]);
			});
		}).on('error',function(error){
			Homey.log('error retrieving schedule');
			Homey.log(JSON.stringify(error));
		});

}

var triggerReportSingleTrafficInformation = function(roadName){

	var options = {};
	options.host = 'www.anwb.nl';
	options.path = '/feeds/gethf';
	
	https.get(options,function(res){
		var body = '';
		res.on('data',function(chunk){
			body += chunk;	
		}).on('end',function(){
			onreportTraficInformation(JSON.parse(body).roadEntries,[],[roadName],['trafficjam']);
		});
	}).on('error',function(error){
		Homey.log('error retrieving schedule');
		Homey.log(JSON.stringify(error));
	});

}

var triggerReportAllTrafficInformation = function(){
	var options = {};
	options.host = 'www.anwb.nl';
	options.path = '/feeds/gethf';
	
	https.get(options,function(res){
		var body = '';
		res.on('data',function(chunk){
			body += chunk;	
		}).on('end',function(){
			onreportTraficInformation(JSON.parse(body).roadEntries,[],[],['trafficjam']);
		});
	}).on('error',function(error){
		Homey.log('error retrieving schedule');
		Homey.log(JSON.stringify(error));
		Homey.manager('speech-output').say('noinformationfound');
	});
}

var onreportTraficInformation =  function(data, roadType,roadnames,eventType){
	
	var trafficInfo = data;
	trafficInfo = filterEventType(trafficInfo,eventType); // filter road entries based on event type
	trafficInfo = filterRoadTypes(trafficInfo, roadType); // filter road entries based on road type
	trafficInfo = filterRoadNames(trafficInfo, roadnames); // filter road entries based on road name
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
			option.description = eventData.description;
		break;
		case 'trafficjam':
			label = "trafficjamentry";
			options.from = eventData.from;
			options.to = eventData.to;
			options.distance = formatDistance(eventData.distance);
			options.delay = formatDelay(eventData.delay);
			options.description = eventData.description;
			
		break;
	}
	Homey.manager('speech-output').say(__(label,options));
	Homey.manager('speech-output').say(__(options.description));
	

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

var formatDistance = function(distance){
	if(distance != null && distance != undefined){
		if(Homey.manager('i18n').getUnits() == "metric"){
			return Math.ceil(distance) / 1000 + " kilometer";
		}else{
			return Math.ceil(distance) / 1609 + " miles";
		}
	}
	return "";
}

// filter on event type (trafficjam, roadworks, radar);

var filterEventType = function(data,eventtype){
	
	var filtered = [];
	if(eventtype != null && eventtype.length > 0){
		for(var j = 0; j < eventtype.length;j++){
			var eventType = eventtype[j];
			for(var i = 0; i < data.length;i++){
				var entry = data[i];
				Homey.log('Even type'+entry)
				switch(eventType){
					case 'trafficjam':
						if(entry.events.trafficJams.length > 0){
							filtered.push(entry);
						}
						break;
					case 'roadwork':
						if(entry.events.roadWorks.length > 0){
							filtered.push(entry);
						}
						break;
					case 'radar':
						if(entry.events.radars.length > 0){
								filtered.push(entry);
						}
						break;
				}
			}
		}
	}else{
		filtered = data;
	}

	Homey.log("Data length after event type filter");
	Homey.log(filtered.length);

	return filtered;	
}

// filter traffic road entries by roadtype
var filterRoadTypes = function(data, roadTypes){
	
	var filtered = data;
	if(roadTypes == null){
		Homey.log('No road type filter set');
	}

	for(var i = 0;i < roadTypes.length;i++){
		var rtype = roadTypes[i];
		var newFiltered = [];
		for(var j = 0; j < filtered.length;j++){
			if(filtered[j].roadType == rtype){
				newFiltered.push(filtered[j]);
			}
		}
		filtered = newFiltered;
	}

	Homey.log("Data length after road type filter");
	Homey.log(filtered.length);

	return filtered;	
}
// filter traffic road entries by road name
var filterRoadNames = function(data,names){
	
	var filtered = data;
	if(names == null){
		Homey.log('No road name filter set');
	}

	if( typeof names === 'string' ) {
    	names = [ names ];
	}


	for(var i = 0;i < names.length;i++){
		var name = names[i];
		var newFiltered = [];
		for(var j = 0; j < filtered.length;j++){
			if(filtered[j].road == name){
				newFiltered.push(filtered[j]);
			}
		}
		filtered = newFiltered;
	}

	Homey.log("Data length after road name filter");
	Homey.log(filtered.length);

	return filtered;	
}


module.exports.init = init;