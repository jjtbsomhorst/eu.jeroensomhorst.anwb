"use strict"
var https = require('https');
const hostname = "www.anwb.nl";
const endpoint_summary = "/feeds/gethfsummary";
const endpoint_trafficinfo = "/feeds/gethf";


var method = AnwbApi.prototype;

function AnwbApi(){
};

method.getSummary = function(success, error){
    var options = {};
    options.host = hostname;
    options.path = endpoint_summary;
    https.get(options,function(res){
		var body = '';
		res.on('data',function(chunk){
			body += chunk;	
		}).on('end',function(){
			success(JSON.parse(body));
		});
	}).on('error',function(data){
       error(data);
    });
}



method.getTrafficInfo = function(success,error,roadType, roadNames,eventType){
    var self = this;
    var options = {};
    options.host = hostname;
    options.path = endpoint_trafficinfo;
    https.get(options,function(res){
		var body = '';
		res.on('data',function(chunk){
			body += chunk;	
		}).on('end',function(){
			var traficInfo = JSON.parse(body).roadEntries;
            traficInfo = self.filterEventTypes(traficInfo,eventType);
			
            traficInfo = self.filterRoadNames(traficInfo,roadNames);
			
            traficInfo = self.filterRoadTypes(traficInfo,roadType);
			
            success(traficInfo);
		});
	}).on('error',function(data){
       error(data);
    });

}

method.filterEventTypes =function(data,eventtype){
	var filtered = [];
	if(eventtype != null && eventtype.length > 0){
		for(var j = 0; j < eventtype.length;j++){
			var eventType = eventtype[j];
			for(var i = 0; i < data.length;i++){
				var entry = data[i];
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

	return filtered;	
}

method.filterRoadTypes = function(data, roadTypes){
	
	var filtered= [];
	if(roadTypes != null){
		if(typeof roadTypes === 'string'){
			roadTypes = [roadTypes];
		}	
		if(roadTypes.length>0){
			for(var i = 0;i < roadTypes.length;i++){
				var roadType = roadTypes[i];
				for(var j = 0; j < data.length;j++){
					if(data[j].road == roadType){
						filtered.push(data[j]);
					}
				}
			}
		}else{
			filtered= data;
		}
	}else{
		filtered = data;
	}
	return filtered;	

		
}
method.filterRoadNames = function(data,names){
	
	var filtered= [];
	if(names != null){
		if(typeof names === 'string'){
			names = [names];
		}	
		if(names.length>0){
		for(var i = 0;i < names.length;i++){
			var name = names[i];
			for(var j = 0; j < data.length;j++){
				if(data[j].road == name){
					filtered.push(data[j]);
				}
			}
		}
		}else{
			filtered=data;
		}
	}else{
		filtered = data;
	}
	return filtered;	
}


module.exports = AnwbApi;
