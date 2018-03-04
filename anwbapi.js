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



method.getTrafficInfo = function(success,error,roadType, roadNames,eventType,segment_start,segment_end){
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
			console.log(traficInfo);
            traficInfo = self.filterEventTypes(traficInfo,eventType,segment_start,segment_end);
			
            traficInfo = self.filterRoadNames(traficInfo,roadNames);
			
            traficInfo = self.filterRoadTypes(traficInfo,roadType);
			
            success(traficInfo);
		});
	}).on('error',function(data){
       error(data);
    });

}

method.filterSegments = function(events,segment_start, segment_end){
	console.log("Filter segstart / segend");

	var filtered = [];
	console.log("entries found "+events.length);
	if(segment_start != null && segment_start.trim() != ""){
		events.forEach((entry)=>{
			if(entry.segStart.toLowerCase() == segment_start.toLowerCase()){
				filtered.push(entry);;
			}
		});
	}else{
		filtered = events;
	}

	if(segment_end != null && segment_end.trim() != ""){
		events.forEach((entry)=>{
			if(entry.segEnd.toLowerCase() == segment_end.toLowerCase()){
				filtered.push(entry);;
			}
		});
	}
	console.log("entries returned "+events.length);
	return filtered;
}

method.filterEventTypes =function(data,eventtype,segment_start,segment_end){
	var filtered = [];
	if(eventtype != null && eventtype.length > 0){
		for(var j = 0; j < eventtype.length;j++){
			var eventType = eventtype[j];
			for(var i = 0; i < data.length;i++){
				var entry = data[i];
				switch(eventType){
					case 'trafficjam':
						entry.events.trafficJams = this.filterSegments(entry.events.trafficJams,segment_start,segment_end);
						if(entry.events.trafficJams.length > 0){
							filtered.push(entry);
						}
						break;
					case 'roadwork':
						entry.events.roadWorks = this.filterSegments(entry.events.roadWorks,segment_start,segment_end);
						if(entry.events.roadWorks.length > 0){	
							filtered.push(entry);
						}
						break;
					case 'radar':
						entry.events.radars = this.filterSegments(entry.events.radars,segment_start,segment_end);
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
