code_generator={

	//this id will diffirentiate each block from others
	id:1,

	genProgram:function(content){
		var code=""+
			"async.series(["+
		"function(callback){"+
		"window.addEventListener('endProgram', function (obj){"+
		""+
		"});callback()},"+
			""+content+""+
			"],"+
			"function(err, results) {"+
			"console.log('end of program :D');"+
			"});";

		return code;
	},
	genSeries:function(content){
		var code=""+
			"async.series(["+
			""+content+""+
			"],"+
			"function(err, results) {"+
			"});";

		return code;
	},


	genLoop:function(content,counter){

		var code="function(callback){"+
			"var count"+this.id+" = 0;"+
			"async.whilst("+
			"function () { return count"+this.id+" < "+counter+"; },"+
			"function (callback) {"+
			"async.series(["+
			""+content+""+
			"],"+
			"function(err, results) {"+
			"count"+this.id+"++;callback()"+
			"});"+
			"},"+
			"function (err) {"+
			"callback();}"+
			")},";

		this.id++;
		return code;
	},

	genWhileLoop:function(content,logic){

		var code="function(callback){"+
			"var count"+this.id+" = 0;"+
			"async.whilst("+
			"function () { return "+logic+" },"+
			"function (callback) {"+
			"async.series(["+
			""+content+""+
			"],"+
			"function(err, results) {"+
			"count"+this.id+"++;callback()"+
			"});"+
			"},"+
			"function (err) {"+
			"callback();}"+
			")},";

		this.id++;
		return code;
	},

	genIO:function(type){
		var code=""+
		"function(callback){"+
		"setTimeout(function(){"+
		"window.addEventListener('"+type+"', function (obj){"+
		"var sensorValue=obj.param;this.globalvalue=obj.param;"+
		"console.log('value in the blockly'+sensorValue);"+
		"this.removeEventListener('"+type+"',arguments.callee,false);"+
		"callback(null,sensorValue);});"+
		"sendFatherData({'type': 'get"+type+"','value':'000','inf':'0'})},140)"+
		"},"+
		"";
		this.id++;
		return code;

	},
	genO:function(type){
		var code=""+
		"function(callback){"+
		"setTimeout(function(){"+
		"sendFatherData({'type': '"+type+"','value':'000','inf':'0'})},40)"+
		"},"+
		"";
		this.id++;
		return code;

	},
    //for robot
	genR:function(type){
		var code=""+
		"function(callback){"+
		"setTimeout(function(){"+
		"window.addEventListener('"+type+"', function (obj){"+
		"var sensorValue=obj.param;this.removeEventListener('"+type+"',arguments.callee,false);"+
		"callback(null,sensorValue);});"+
		"sendFatherData({'type': '"+type+"','value':'000','inf':'0'})},140)"+
		"},"+
		"";
		this.id++;
		return code;

	},
	genWaterFall:function(content1,content2){
		var code=""+
		"function(callback){"+
		"async.waterfall(["+
		""+content1+""+
		""+content2+""+
		"], function (err, result) {callback()"+
				"});"+
		"},"+
			"";



		this.id++;
		return code;



	},
	genSeriesGlob:function(content1,content2)
	{
		var code ="branch"+this.id+":function(callback){"+
			"var globalValue=0;"+
			"async.series({"+
			""+content1+""+
			"},"+
			"function(err, results) {"+
			""+content2+"console.log('end of program :D');"+
			"});},";
		this.id++;
		return code;


	}


};

/*
 *
 setTimeout(function(){
 window.addEventListener('temp', function (obj){
 var sensorValue=obj.param;console.log('value in the blockly'+sensorValue); this.removeEventListener('temp',arguments.callee,false);
 });

 var Loopcode = " var count = 0; async.whilst( function () { console.log('count is '+count);  return count < 50; }, function (callback) { setTimeout(function(){console.log('main'); window.addEventListener('temp', function (obj){ var sensorValue=obj.param;console.log('value in the blockly'+sensorValue); this.removeEventListener('temp',arguments.callee,false); "+statements_loopcode+" count++;callback(); }); sendFatherData({'type': 'getTmp','value':'000','inf':'0'})},40);}, function (err) {console.log(count);console.log('err callback func');  }); "; return code; };



 var async_series=async.series({
 one: function(callback){
 window.addEventListener('temp', function (obj){ var sensorValue=obj.param;console.log('value in the blockly'+sensorValue); this.removeEventListener('temp',arguments.callee,false);count++;callback(null,1); });
 },
 two: function(callback){
 window.addEventListener('temp', function (obj){ var sensorValue=obj.param;console.log('value in the blockly'+sensorValue); this.removeEventListener('temp',arguments.callee,false); count++;callback(null,2); });
 }
 },
 function(err, results) {m

 window.addEventListener('temp', function (obj){ var sensorValue=obj.param;console.log('value in the blockly'+sensorValue); this.removeEventListener('temp',arguments.callee,false); "+statements_loopcode+" loopCount++;loopCallback(); });
 */
