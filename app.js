"use strict";
const anwbApi = require('./anwbapi');
const aRoads = [{ "id": "", "name": "" },{ "id": "A1", "name": "A1" },{ "id": "A2", "name": "A2" },{ "id": "A4", "name": "A4" },{ "id": "A5", "name": "A5" },{ "id": "A6", "name": "A6" },{ "id": "A7", "name": "A7" },{ "id": "A8", "name": "A8" },{ "id": "A9", "name": "A9" },{ "id": "A10", "name": "A10" },{ "id": "A12", "name": "A12" },{ "id": "A13", "name": "A13" },{ "id": "A15", "name": "A15" },{ "id": "A16", "name": "A16" },{ "id": "A17", "name": "A17" },{ "id": "A18", "name": "A18" },{ "id": "A20", "name": "A20" },{ "id": "A22", "name": "A22" },{ "id": "A27", "name": "A27" },{ "id": "A28", "name": "A28" },{ "id": "A29", "name": "A29" },{ "id": "A30", "name": "A30" },{ "id": "A31", "name": "A30 (N31)" },{ "id": "A32", "name": "A32" },{ "id": "A35", "name": "A35 (N35)" },{ "id": "A37", "name": "A37" },{ "id": "A38", "name": "A38" },{ "id": "A44", "name": "A44 (N44)" },{ "id": "A50", "name": "A50" },{ "id": "A58", "name": "A58 (N58)" },{ "id": "A59", "name": "A59 (N59)" },{ "id": "A65", "name": "A65 (N65)" },{ "id": "A67", "name": "A67" },{ "id": "A73", "name": "A73" },{ "id": "A76", "name": "A76" },{ "id": "A77", "name": "A77" },{ "id": "A79", "name": "A79" },{ "id": "A200", "name": "A200 (N200)" },{ "id": "A208", "name": "A208" },{ "id": "A256", "name": "A256" },{ "id": "A270", "name": "A270" },{ "id": "A325", "name": "A325" },{ "id": "A326", "name": "A326" },{ "id": "A348", "name": "A348" },{ "id": "A783", "name": "A783" }];
var nRoads = [{"id":"N34","name":"N34"},{"id":"N46","name":"N46"},{"id":"N351","name":"N351"},{"id":"N353","name":"N353"},{"id":"N354","name":"N354"},{"id":"N355","name":"N355"},{"id":"N356","name":"N356"},{"id":"N357","name":"N357"},{"id":"N358","name":"N358"},{"id":"N359","name":"N359"},{"id":"N360","name":"N360"},{"id":"N361","name":"N361"},{"id":"N362","name":"N362"},{"id":"N363","name":"N363"},{"id":"N365","name":"N365"},{"id":"N366","name":"N366"},{"id":"N367","name":"N367"},{"id":"N368","name":"N368"},{"id":"N369","name":"N369"},{"id":"N370","name":"N370"},{"id":"N371","name":"N371"},{"id":"N372","name":"N372"},{"id":"N373","name":"N373"},{"id":"N374","name":"N374"},{"id":"N375","name":"N375"},{"id":"N376","name":"N376"},{"id":"N378","name":"N378"},{"id":"N379","name":"N379"},{"id":"N380","name":"N380"},{"id":"N381","name":"N381"},{"id":"N382","name":"N382"},{"id":"N383","name":"N383"},{"id":"N384","name":"N384"},{"id":"N385","name":"N385"},{"id":"N386","name":"N386"},{"id":"N387","name":"N387"},{"id":"N388","name":"N388"},{"id":"N390","name":"N390"},{"id":"N391","name":"N391"},{"id":"N392","name":"N392"},{"id":"N393","name":"N393"},{"id":"N851","name":"N851"},{"id":"N852","name":"N852"},{"id":"N853","name":"N853"},{"id":"N854","name":"N854"},{"id":"N855","name":"N855"},{"id":"N856","name":"N856"},{"id":"N857","name":"N857"},{"id":"N858","name":"N858"},{"id":"N860","name":"N860"},{"id":"N861","name":"N861"},{"id":"N862","name":"N862"},{"id":"N863","name":"N863"},{"id":"N865","name":"N865"},{"id":"N910","name":"N910"},{"id":"N913","name":"N913"},{"id":"N917","name":"N917"},{"id":"N918","name":"N918"},{"id":"N919","name":"N919"},{"id":"N924","name":"N924"},{"id":"N927","name":"N927"},{"id":"N928","name":"N928"},{"id":"N962","name":"N962"},{"id":"N963","name":"N963"},{"id":"N964","name":"N964"},{"id":"N966","name":"N966"},{"id":"N967","name":"N967"},{"id":"N969","name":"N969"},{"id":"N972","name":"N972"},{"id":"N973","name":"N973"},{"id":"N974","name":"N974"},{"id":"N975","name":"N975"},{"id":"N976","name":"N976"},{"id":"N977","name":"N977"},{"id":"N978","name":"N978"},{"id":"N979","name":"N979"},{"id":"N980","name":"N980"},{"id":"N981","name":"N981"},{"id":"N982","name":"N982"},{"id":"N983","name":"N983"},{"id":"N984","name":"N984"},{"id":"N985","name":"N985"},{"id":"N986","name":"N986"},{"id":"N987","name":"N987"},{"id":"N988","name":"N988"},{"id":"N989","name":"N989"},{"id":"N990","name":"N990"},{"id":"N991","name":"N991"},{"id":"N992","name":"N992"},{"id":"N993","name":"N993"},{"id":"N994","name":"N994"},{"id":"N995","name":"N995"},{"id":"N996","name":"N996"},{"id":"N997","name":"N997"},{"id":"N998","name":"N998"},{"id":"N999","name":"N999"},{"id":"N23","name":"N23"},{"id":"N34","name":"N34"},{"id":"N224","name":"N224"},{"id":"N225","name":"N225"},{"id":"N233","name":"N233"},{"id":"N271","name":"N271"},{"id":"N301","name":"N301"},{"id":"N302","name":"N302"},{"id":"N303","name":"N303"},{"id":"N304","name":"N304"},{"id":"N305","name":"N305"},{"id":"N306","name":"N306"},{"id":"N307","name":"N307"},{"id":"N308","name":"N308"},{"id":"N309","name":"N309"},{"id":"N310","name":"N310"},{"id":"N311","name":"N311"},{"id":"N312","name":"N312"},{"id":"N313","name":"N313"},{"id":"N314","name":"N314"},{"id":"N315","name":"N315"},{"id":"N316","name":"N316"},{"id":"N317","name":"N317"},{"id":"N318","name":"N318"},{"id":"N319","name":"N319"},{"id":"N320","name":"N320"},{"id":"N321","name":"N321"},{"id":"N322","name":"N322"},{"id":"N323","name":"N323"},{"id":"N324","name":"N324"},{"id":"N325/A325","name":"N325/A325"},{"id":"N326/A326","name":"N326/A326"},{"id":"N327","name":"N327"},{"id":"N329","name":"N329"},{"id":"N330","name":"N330"},{"id":"N331","name":"N331"},{"id":"N332","name":"N332"},{"id":"N333","name":"N333"},{"id":"N334","name":"N334"},{"id":"N335","name":"N335"},{"id":"N336","name":"N336"},{"id":"N337","name":"N337"},{"id":"N338","name":"N338"},{"id":"N339","name":"N339"},{"id":"N340","name":"N340"},{"id":"N341","name":"N341"},{"id":"N342","name":"N342"},{"id":"N343","name":"N343"},{"id":"N344","name":"N344"},{"id":"N345","name":"N345"},{"id":"N346","name":"N346"},{"id":"N347","name":"N347"},{"id":"N348/A348","name":"N348/A348"},{"id":"N349","name":"N349"},{"id":"N350","name":"N350"},{"id":"N352","name":"N352"},{"id":"N377","name":"N377"},{"id":"N701","name":"N701"},{"id":"N702","name":"N702"},{"id":"N703","name":"N703"},{"id":"N704","name":"N704"},{"id":"N705","name":"N705"},{"id":"N706","name":"N706"},{"id":"N707","name":"N707"},{"id":"N708","name":"N708"},{"id":"N709","name":"N709"},{"id":"N710","name":"N710"},{"id":"N711","name":"N711"},{"id":"N712","name":"N712"},{"id":"N713","name":"N713"},{"id":"N714","name":"N714"},{"id":"N715","name":"N715"},{"id":"N716","name":"N716"},{"id":"N717","name":"N717"},{"id":"N718","name":"N718"},{"id":"N719","name":"N719"},{"id":"N731","name":"N731"},{"id":"N732","name":"N732"},{"id":"N733","name":"N733"},{"id":"N734","name":"N734"},{"id":"N735","name":"N735"},{"id":"N736","name":"N736"},{"id":"N737","name":"N737"},{"id":"N738","name":"N738"},{"id":"N739","name":"N739"},{"id":"N740","name":"N740"},{"id":"N741","name":"N741"},{"id":"N742","name":"N742"},{"id":"N743","name":"N743"},{"id":"N744","name":"N744"},{"id":"N745","name":"N745"},{"id":"N746","name":"N746"},{"id":"N747","name":"N747"},{"id":"N748","name":"N748"},{"id":"N749","name":"N749"},{"id":"N750","name":"N750"},{"id":"N751","name":"N751"},{"id":"N752","name":"N752"},{"id":"N753","name":"N753"},{"id":"N754","name":"N754"},{"id":"N755","name":"N755"},{"id":"N756","name":"N756"},{"id":"N757","name":"N757"},{"id":"N758","name":"N758"},{"id":"N759","name":"N759"},{"id":"N760","name":"N760"},{"id":"N761","name":"N761"},{"id":"N762","name":"N762"},{"id":"N763","name":"N763"},{"id":"N764","name":"N764"},{"id":"N765","name":"N765"},{"id":"N766","name":"N766"},{"id":"N781","name":"N781"},{"id":"N782","name":"N782"},{"id":"N783","name":"N783"},{"id":"N784","name":"N784"},{"id":"N785","name":"N785"},{"id":"N786","name":"N786"},{"id":"N787","name":"N787"},{"id":"N788","name":"N788"},{"id":"N789","name":"N789"},{"id":"N790","name":"N790"},{"id":"N791","name":"N791"},{"id":"N792","name":"N792"},{"id":"N794","name":"N794"},{"id":"N795","name":"N795"},{"id":"N796","name":"N796"},{"id":"N797","name":"N797"},{"id":"N798","name":"N798"},{"id":"N800","name":"N800"},{"id":"N801","name":"N801"},{"id":"N802","name":"N802"},{"id":"N803","name":"N803"},{"id":"N804","name":"N804"},{"id":"N805","name":"N805"},{"id":"N806","name":"N806"},{"id":"N810","name":"N810"},{"id":"N811","name":"N811"},{"id":"N812","name":"N812"},{"id":"N813","name":"N813"},{"id":"N814","name":"N814"},{"id":"N815","name":"N815"},{"id":"N816","name":"N816"},{"id":"N817","name":"N817"},{"id":"N818","name":"N818"},{"id":"N819","name":"N819"},{"id":"N820","name":"N820"},{"id":"N821","name":"N821"},{"id":"N822","name":"N822"},{"id":"N823","name":"N823"},{"id":"N824","name":"N824"},{"id":"N825","name":"N825"},{"id":"N826","name":"N826"},{"id":"N827","name":"N827"},{"id":"N830","name":"N830"},{"id":"N831","name":"N831"},{"id":"N832","name":"N832"},{"id":"N833","name":"N833"},{"id":"N834","name":"N834"},{"id":"N835","name":"N835"},{"id":"N836","name":"N836"},{"id":"N837","name":"N837"},{"id":"N838","name":"N838"},{"id":"N839","name":"N839"},{"id":"N840","name":"N840"},{"id":"N841","name":"N841"},{"id":"N842","name":"N842"},{"id":"N843","name":"N843"},{"id":"N844","name":"N844"},{"id":"N845","name":"N845"},{"id":"N846","name":"N846"},{"id":"N847","name":"N847"},{"id":"N848","name":"N848"},{"id":"N196","name":"N196"},{"id":"N197","name":"N197"},{"id":"N198","name":"N198"},{"id":"N199","name":"N199"},{"id":"N200","name":"N200"},{"id":"N201","name":"N201"},{"id":"N202","name":"N202"},{"id":"N203","name":"N203"},{"id":"N204","name":"N204"},{"id":"N205","name":"N205"},{"id":"N206","name":"N206"},{"id":"N207","name":"N207"},{"id":"N208","name":"N208"},{"id":"N209","name":"N209"},{"id":"N210","name":"N210"},{"id":"N211","name":"N211"},{"id":"N212","name":"N212"},{"id":"N213","name":"N213"},{"id":"N214","name":"N214"},{"id":"N215","name":"N215"},{"id":"N216","name":"N216"},{"id":"N217","name":"N217"},{"id":"N218","name":"N218"},{"id":"N219","name":"N219"},{"id":"N220","name":"N220"},{"id":"N221","name":"N221"},{"id":"N222","name":"N222"},{"id":"N223","name":"N223"},{"id":"N226","name":"N226"},{"id":"N227","name":"N227"},{"id":"N228","name":"N228"},{"id":"N229","name":"N229"},{"id":"N230","name":"N230"},{"id":"N231","name":"N231"},{"id":"N232","name":"N232"},{"id":"N234","name":"N234"},{"id":"N235","name":"N235"},{"id":"N236","name":"N236"},{"id":"N237","name":"N237"},{"id":"N238","name":"N238"},{"id":"N239","name":"N239"},{"id":"N240","name":"N240"},{"id":"N241","name":"N241"},{"id":"N242","name":"N242"},{"id":"N243","name":"N243"},{"id":"N244","name":"N244"},{"id":"N245","name":"N245"},{"id":"N246","name":"N246"},{"id":"N247","name":"N247"},{"id":"N248","name":"N248"},{"id":"N249","name":"N249"},{"id":"N250","name":"N250"},{"id":"N401","name":"N401"},{"id":"N402","name":"N402"},{"id":"N403","name":"N403"},{"id":"N404","name":"N404"},{"id":"N405","name":"N405"},{"id":"N406","name":"N406"},{"id":"N407","name":"N407"},{"id":"N408","name":"N408"},{"id":"N409","name":"N409"},{"id":"N410","name":"N410"},{"id":"N411","name":"N411"},{"id":"N412","name":"N412"},{"id":"N413","name":"N413"},{"id":"N414","name":"N414"},{"id":"N415","name":"N415"},{"id":"N416","name":"N416"},{"id":"N417","name":"N417"},{"id":"N439","name":"N439"},{"id":"N440","name":"N440"},{"id":"N441","name":"N441"},{"id":"N442","name":"N442"},{"id":"N443","name":"N443"},{"id":"N444","name":"N444"},{"id":"N445","name":"N445"},{"id":"N446","name":"N446"},{"id":"N447","name":"N447"},{"id":"N448","name":"N448"},{"id":"N449","name":"N449"},{"id":"N450","name":"N450"},{"id":"N451","name":"N451"},{"id":"N452","name":"N452"},{"id":"N453","name":"N453"},{"id":"N454","name":"N454"},{"id":"N455","name":"N455"},{"id":"N456","name":"N456"},{"id":"N458","name":"N458"},{"id":"N459","name":"N459"},{"id":"N460","name":"N460"},{"id":"N461","name":"N461"},{"id":"N462","name":"N462"},{"id":"N463","name":"N463"},{"id":"N464","name":"N464"},{"id":"N465","name":"N465"},{"id":"N466","name":"N466"},{"id":"N467","name":"N467"},{"id":"N468","name":"N468"},{"id":"N469","name":"N469"},{"id":"N470","name":"N470"},{"id":"N471","name":"N471"},{"id":"N472","name":"N472"},{"id":"N473","name":"N473"},{"id":"N474","name":"N474"},{"id":"N475","name":"N475"},{"id":"N476","name":"N476"},{"id":"N477","name":"N477"},{"id":"N478","name":"N478"},{"id":"N479","name":"N479"},{"id":"N480","name":"N480"},{"id":"N481","name":"N481"},{"id":"N482","name":"N482"},{"id":"N483","name":"N483"},{"id":"N484","name":"N484"},{"id":"N487","name":"N487"},{"id":"N488","name":"N488"},{"id":"N489","name":"N489"},{"id":"N490","name":"N490"},{"id":"N491","name":"N491"},{"id":"N492","name":"N492"},{"id":"N493","name":"N493"},{"id":"N494","name":"N494"},{"id":"N495","name":"N495"},{"id":"N496","name":"N496"},{"id":"N497","name":"N497"},{"id":"N498","name":"N498"},{"id":"N501","name":"N501"},{"id":"N502","name":"N502"},{"id":"N503","name":"N503"},{"id":"N504","name":"N504"},{"id":"N505","name":"N505"},{"id":"N506","name":"N506"},{"id":"N507","name":"N507"},{"id":"N508","name":"N508"},{"id":"N509","name":"N509"},{"id":"N510","name":"N510"},{"id":"N511","name":"N511"},{"id":"N512","name":"N512"},{"id":"N513","name":"N513"},{"id":"N514","name":"N514"},{"id":"N515","name":"N515"},{"id":"N516","name":"N516"},{"id":"N517","name":"N517"},{"id":"N518","name":"N518"},{"id":"N519","name":"N519"},{"id":"N520","name":"N520"},{"id":"N521","name":"N521"},{"id":"N522","name":"N522"},{"id":"N523","name":"N523"},{"id":"N524","name":"N524"},{"id":"N525","name":"N525"},{"id":"N526","name":"N526"},{"id":"N527","name":"N527"},{"id":"N62","name":"N62"},{"id":"N69","name":"N69"},{"id":"N251","name":"N251"},{"id":"N252","name":"N252"},{"id":"N253","name":"N253"},{"id":"N254","name":"N254"},{"id":"N255","name":"N255"},{"id":"N256","name":"N256"},{"id":"N257","name":"N257"},{"id":"N258","name":"N258"},{"id":"N260","name":"N260"},{"id":"N261","name":"N261"},{"id":"N262","name":"N262"},{"id":"N263","name":"N263"},{"id":"N264","name":"N264"},{"id":"N266","name":"N266"},{"id":"N267","name":"N267"},{"id":"N268","name":"N268"},{"id":"N269","name":"N269"},{"id":"N270","name":"N270"},{"id":"N272","name":"N272"},{"id":"N274","name":"N274"},{"id":"N275","name":"N275"},{"id":"N276","name":"N276"},{"id":"N277","name":"N277"},{"id":"N278","name":"N278"},{"id":"N279","name":"N279"},{"id":"N280","name":"N280"},{"id":"N281","name":"N281"},{"id":"N282","name":"N282"},{"id":"N283","name":"N283"},{"id":"N284","name":"N284"},{"id":"N285","name":"N285"},{"id":"N286","name":"N286"},{"id":"N287","name":"N287"},{"id":"N288","name":"N288"},{"id":"N289","name":"N289"},{"id":"N290","name":"N290"},{"id":"N291","name":"N291"},{"id":"N292","name":"N292"},{"id":"N293","name":"N293"},{"id":"N294","name":"N294"},{"id":"N295","name":"N295"},{"id":"N296","name":"N296"},{"id":"N297","name":"N297"},{"id":"N298","name":"N298"},{"id":"N299","name":"N299"},{"id":"N300","name":"N300"},{"id":"N389","name":"N389"},{"id":"N394","name":"N394"},{"id":"N395","name":"N395"},{"id":"N396","name":"N396"},{"id":"N397","name":"N397"},{"id":"N554","name":"N554"},{"id":"N556","name":"N556"},{"id":"N562","name":"N562"},{"id":"N564","name":"N564"},{"id":"N570","name":"N570"},{"id":"N572","name":"N572"},{"id":"N590","name":"N590"},{"id":"N595","name":"N595"},{"id":"N598","name":"N598"},{"id":"N602","name":"N602"},{"id":"N605","name":"N605"},{"id":"N607","name":"N607"},{"id":"N612","name":"N612"},{"id":"N613","name":"N613"},{"id":"N615","name":"N615"},{"id":"N616","name":"N616"},{"id":"N617","name":"N617"},{"id":"N618","name":"N618"},{"id":"N620","name":"N620"},{"id":"N622","name":"N622"},{"id":"N625","name":"N625"},{"id":"N629","name":"N629"},{"id":"N631","name":"N631"},{"id":"N632","name":"N632"},{"id":"N637","name":"N637"},{"id":"N638","name":"N638"},{"id":"N639","name":"N639"},{"id":"N640","name":"N640"},{"id":"N641","name":"N641"},{"id":"N651","name":"N651"},{"id":"N652","name":"N652"},{"id":"N653","name":"N653"},{"id":"N654","name":"N654"},{"id":"N655","name":"N655"},{"id":"N656","name":"N656"},{"id":"N658","name":"N658"},{"id":"N659","name":"N659"},{"id":"N660","name":"N660"},{"id":"N661","name":"N661"},{"id":"N662","name":"N662"},{"id":"N663","name":"N663"},{"id":"N664","name":"N664"},{"id":"N665","name":"N665"},{"id":"N666","name":"N666"},{"id":"N667","name":"N667"},{"id":"N668","name":"N668"},{"id":"N669","name":"N669"},{"id":"N670","name":"N670"},{"id":"N671","name":"N671"},{"id":"N673","name":"N673"},{"id":"N674","name":"N674"},{"id":"N675","name":"N675"},{"id":"N676","name":"N676"},{"id":"N682","name":"N682"},{"id":"N683","name":"N683"},{"id":"N686","name":"N686"},{"id":"N689","name":"N689"},{"id":"N690","name":"N690"},{"id":"N843","name":"N843"}]


var api = new anwbApi();
var debug = false;
var tokens = [];
function init() {
	Homey.log('Initialize ANWB Traffic application');

	//Homey React on speech inputs
	Homey.log("Init speech inputs");
	Homey.manager('speech-input').on('speech',function(speech,callback){
		speech.triggers.forEach(function(trigger){
			switch(trigger.id){
				case 'tell_traffic_info':
					triggerReportAllTrafficInformation(callback);
					return true;
			}
		});
		
	});

	Homey.log("Init tokens");
	registerToken('ANWB_summary', 'string', '', function(err, token) { tokens['summary'] = token; });

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

	Homey.manager('flow').on('action.anwb_update_tokens',function(callback,args){
		updateToken(callback);
	});

	Homey.manager('flow').on('condition.anwb_check_traffic',function(callback,args){
		triggerCheckTrafficCondition(callback,args['road']);
	});

	Homey.manager('flow').on('condition.awnb_check_roadworks',function(callback,args){
		triggerCheckRoadWorks(callback,args['road']);
	});

	Homey.manager('flow').on('condition.awnb_check_policechecks',function(callback,args){
		triggerCheckRadarControles(callback,args['road']);
	});

	Homey.manager('flow').on('condition.awnb_check_roadworks.road.autocomplete',onRoadAutoComplete);
	Homey.manager('flow').on('condition.awnb_check_policechecks.road.autocomplete',onRoadAutoComplete);
	Homey.manager('flow').on('condition.anwb_check_traffic.road.autocomplete',onRoadAutoComplete);

	Homey.manager('flow').on('action.anwb_tell_various.road.autocomplete',onRoadAutoComplete);
	Homey.manager('flow').on('action.anwb_tell_traffic_single.road.autocomplete',onRoadAutoComplete);
	Homey.manager('flow').on('action.anwb_tell_trafic_all.road.autocomplete',onRoadAutoComplete);

	Homey.log('Done initialize ANWB Traffic application');
}


var onRoadAutoComplete = function (callback,args){
    var returnValue = [];
    if(args.query != ""){
		var queryUpper = args.query.toUpperCase();
		var searchCollection = aRoads;
		if(queryUpper.startsWith('N')){
			searchCollection = nRoads;
		}

		searchCollection.forEach(function(element) {
			if(element.name.indexOf(queryUpper) == 0){
				returnValue.push(element);
			}
		}, this);
	}
    callback(null,returnValue);
}


var triggerReportSummary = function(callback){
	
	api.getSummary(function(data){
		reportSummary(data);
		callback(null,true);
	},
	function(data){
				callback(null,false);
	});
}

var updateToken = function(callback){
	Homey.log("Updating summary in token");
	api.getSummary(function(data){
	var totals = data.totals.all;

	var label = "summary_plural";
	var options = {};
	options.count = totals.count;
	options.distance = formatDistance(totals.distance,false);

	if(options.count == 1){
		label = "summary_single";
	}
	if(options.count > 1){
		label = "summary_plural";
	}
	if(options.count == 0){
		label = "notrafficjams";
	}

	var answerString = __(label, { "count": options.count, "distance": options.distance});
		tokens['summary'].setValue(answerString, function(err) { if (err) console.error('setValue error:', err); });
		callback(null,true);
	},
	function(data){
		callback(null,false);
	});
}

var triggerCheckTrafficCondition = function(callback, roadName){
	api.getTrafficInfo(function(data){
		Homey.log('Number of traffic jams: '+data.length);
		callback(null,(data.length > 0));
	},function(data){
		onError(data);
		callback(null,false);
	},[],roadName.id,['trafficjam']);	
}

var triggerCheckRoadWorks = function(callback,roadName){
	api.getTrafficInfo(function(data){
		Homey.log('Roadwork love: '+data.length);
		callback(null,(data.length > 0));
	},function(data){
		onError(data);
		callback(null,false);
	},[],roadName.id,['roadwork']);	
}

var triggerCheckRadarControles = function(callback,roadName){
	api.getTrafficInfo(function(data){
		Homey.log('Radar love: '+data.length);
		callback(null,(data.length > 0));
	},function(data){
		onError(data);
		callback(null,false);
	},[],roadName.id,['radar']);	
}

var triggerVariousTrafficInformation = function(callback,roadName,eventtype){
	api.getTrafficInfo(function(data){
		onreportTraficInformation(data,[eventtype])
		callback(null,true);
	},onError,[],roadName.id,[eventtype]);
}

var triggerReportSingleTrafficInformation = function(callback, roadName){
	api.getTrafficInfo(function(data){
		onreportTraficInformation(data,['trafficjam'])
		callback(null,true);
	},onError,[],roadName.id,['trafficjam']);
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
		if(!debug){
			Homey.manager('speech-output').say(__(strLabelNoData));
		}else{
			Homey.log(__(strLabelNoData));
		}
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
	
	if(!debug){
		Homey.manager('speech-output').say(__('onerror'));
	}else{
		Homey.log(__('onerror'));
	}
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
	if(!debug){
		Homey.manager('speech-output').say(__(label,options));
	}else{
		Homey.log(__(label,options));
	}
	
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

	if(entries.length < 0){
		if(!debug){
			Homey.manager('speech-output').say(__('noinformationfound'));
		}else{
			Homey.log(__('noinformationfound'));
		}
		return;
	}

	for(var i = 0;i<entries.length;i++){
		var entryLine = entries[i];
		speakEventEntry(entry.road,entryLine,eventType);
	}
}

var speakEventEntry = function(roadname,eventData,eventType){
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
	if(!debug){
		Homey.manager('speech-output').say(__(label,options));
		Homey.manager('speech-output').say(__(options.description));
	}else{
		Homey.log(__(label,options));
		Homey.log(__(options.description));
	}
}

var formatDescription = function(txt){
	var replacement = "knooppunt";
	var currentLanguage = Homey.manager('i18n').getLanguage();
	if(currentLanguage != "nl"){
		replacement = "junction";
	}
	return txt.replace(/knp./g,replacement);
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

function registerToken(id, type, value, callback) {
	Homey.manager('flow').registerToken(id, {
	    type: type,
	    title: __(id)
	}, function(err, token){
	    if(err) return console.error('registerToken error:', err);

	    token.setValue(value, function(err) {
	        if(err) return console.error('setValue error:', err);
	    });
	    
	    callback(null, token);
	});
}

module.exports.init = init;