//here where you define custome blocks
father={};

Blockly.blocksCounter=0;


//control

Blockly.Blocks['loop'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendTitle("Loop For");
    this.appendStatementInput("loopCode");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['loop'] = function(block) {


var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
var statements_loopcode = Blockly.JavaScript.statementToCode(block, 'loopCode');

// TODO: Assemble JavaScript into code variable.

var counterValue = value_name.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');
var loopCode=code_generator.genLoop(statements_loopcode,counterValue);

return loopCode;

};

Blockly.Blocks['while_loop'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(240);
    this.appendValueInput("logic_value")
        .appendTitle("While");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendStatementInput("whileCode");
    this.setTooltip('');
  }
};

Blockly.JavaScript['while_loop'] = function(block) {

var logicValue = Blockly.JavaScript.valueToCode(block, 'logic_value', Blockly.JavaScript.ORDER_ATOMIC);
var whileContent = Blockly.JavaScript.statementToCode(block, 'whileCode');

// TODO: Assemble JavaScript into code variable.

var content=code_generator.genSeries(whileContent);
var logicValue = logicValue.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');
var new_whileContent="function(callback){{"+whileContent+"};callback()},";
var whileCode=code_generator.genWhileLoop(new_whileContent,logicValue);

return whileCode;

};

Blockly.Blocks['if_mario'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(240);
    this.appendValueInput("if_value")
        .appendTitle("IF");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendStatementInput("NAME");
    this.setTooltip('');
  }
};

Blockly.JavaScript['if_mario'] = function(block) {

  //what the if has ( logic == > < ... etc)
  var value_if_value = Blockly.JavaScript.valueToCode(block, 'if_value', Blockly.JavaScript.ORDER_ATOMIC);



  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');

  /*
 var counterValue = value_if_value.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');
var matchedText=ifExpression(counterValue,0);
     matchedText = matchedText.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');
     matchedText=matchedText.substring(0,matchedText.length-2)
var newExp=counterValue.replace(matchedText,"arg1");

// TODO else to be completed here

*/
// the new if statment

var content=code_generator.genSeries(statements_name);

new_if_statment="function(callback){if "+value_if_value+"{"+content+"};callback()},";

var code =new_if_statment;

  return code;
};


Blockly.Blocks['if_else'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(270);
    this.appendValueInput("if_operator")
        .appendTitle("IF");
    this.appendStatementInput("if_statments");
    this.appendStatementInput("else_statments")
        .appendTitle("else ");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('If else Statment ... ');
  }
};

Blockly.JavaScript['if_else'] = function(block) {
  var value_if_operator = Blockly.JavaScript.valueToCode(block, 'if_operator', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_if_statments = Blockly.JavaScript.statementToCode(block, 'if_statments');
  var statements_else_statments = Blockly.JavaScript.statementToCode(block, 'else_statments');
  var if_content=code_generator.genSeries(statements_if_statments);
  var else_content=code_generator.genSeries(statements_else_statments);
  // TODO: Assemble JavaScript into code variable.
  var code = "function(callback){ if "+value_if_operator+"{"+if_content+"} else {"+else_content+"};callback()},";
  return code;
};



Blockly.Blocks['speak'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(270);
    this.appendDummyInput()
        .appendTitle("Speak : ")
        .appendTitle(new Blockly.FieldTextInput("Hello I am Mario"), "text_to_speak");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['speak'] = function(block) {
  var text_text_to_speak = block.getTitleValue('text_to_speak');
  // TODO: Assemble JavaScript into code variable.
	var code = "function(callback){sendFatherData({'type': 'speak','value':\""+text_text_to_speak+"\"});callback()},";
  return code;
};

Blockly.Blocks['console_log'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(103);
    this.appendDummyInput()
        .appendTitle("Print on Console");
    this.appendValueInput("data");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('print on console for debugging purpose');
  }
};

Blockly.JavaScript['console_log'] = function(block) {
  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
Blockly.blocksCounter++;
blockNumber=""+Blockly.blocksCounter;
var io=code_generator.genIO();
var loopCode=code_generator.genLoop(io);
var code=code_generator.genProgram(loopCode);
  return code;
};

Blockly.Blocks['prepare'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendTitle("Init");
    this.appendStatementInput("NAME");
    this.setNextStatement(true);
    this.setTooltip('Any Prepration of your code shoud be put her');
  }
};

Blockly.JavaScript['prepare'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
var str = [""
    ,"console.log('test');"+statements_name+";"
    ,"sendFatherData({'type': 'init','value':'3000'});"
    ,"setTimeout(function(){fireEvent('initTerm',document)},5000);"
].join("");
var code=str;

  return code;
};



Blockly.Blocks['program'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(100);
    this.appendDummyInput()
        .appendTitle("Program");
    this.appendStatementInput("NAME");
    this.setPreviousStatement(true);
    this.setTooltip('Any Prepration of your code shoud be put her');
  }
};

Blockly.JavaScript['program'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');

var code=code_generator.genProgram(statements_name);

  return code;
};






Blockly.Blocks['O_buzzer'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(359);
    this.appendDummyInput()
        .appendTitle("Buzzer!!!");
    this.appendValueInput("NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
  };


Blockly.JavaScript['O_buzzer'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = code_generator.genO('Buz');
  return code;
};

Blockly.Blocks['send_data_serial'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(359);
    this.appendDummyInput()
        .appendTitle("Send Data Serial");
    this.appendValueInput("NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('send data through the serial');
  }
  };

Blockly.JavaScript['send_data_serial'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
	var code = "function(callback){sendFatherData({'type': 'sendDataSerial','value':"+value_name+"});callback()},";
  return code;
};




Blockly.Blocks['voltmeter'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(122);
    this.appendDummyInput()
        .appendTitle("Voltmeter")
        .appendTitle(new Blockly.FieldImage("https://cdn2.iconfinder.com/data/icons/cosmo-appliance/40/metal_detector_multimeter_voltmeter-128.png", 30, 30));
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.appendValueInput("NAME");
  }
  };

Blockly.JavaScript['voltmeter'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

var code1 = value_name.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');

var code = "function(callback){sendFatherData({'type': 'volt','value':"+code1+"});callback()},";
  return code;
};

/******************Views *******************/

Blockly.Blocks['line_chart'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(352);
    this.appendDummyInput()
        .appendTitle("Line Chart 1")
        .appendTitle(new Blockly.FieldImage("../media/images/tools/charts/line-chart.png", 30, 30));
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('view line chart ');
    this.appendValueInput("NAME");
  }
  };

Blockly.JavaScript['line_chart'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

var code1 = value_name.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');

var code = "function(callback){sendFatherData({'type': 'chartSL','value':"+code1+"});callback()},";
  return code;
};

Blockly.Blocks['line_chart_xy'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(352);
    this.appendDummyInput()
        .appendTitle("Line Chart 2")
        .appendTitle(new Blockly.FieldImage("../media/images/tools/charts/line-chart.png", 30, 30));
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('view line chart ');
    this.appendValueInput("NAMEX")
        .appendTitle("X-Axis");
    this.appendValueInput("NAMEY")
        .appendTitle("Y-Axis");
  }
  };

Blockly.JavaScript['line_chart_xy'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var value_nameX = Blockly.JavaScript.valueToCode(block, 'NAMEX', Blockly.JavaScript.ORDER_ATOMIC);

  var value_nameY = Blockly.JavaScript.valueToCode(block, 'NAMEY', Blockly.JavaScript.ORDER_ATOMIC);

var code1 = value_nameX.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');
var code2 = value_nameY.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');

var code = "function(callback){sendFatherData({'type': 'chartXY','valueX':"+code1+",valueY:"+code2+"});callback()},";
  return code;
};



Blockly.Blocks['temprature'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(352);
    this.appendDummyInput()
        .appendTitle("Temprature")
        .appendTitle(new Blockly.FieldImage("https://cdn3.iconfinder.com/data/icons/weather-icons-1/64/Temperature-128.png", 30, 30));
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('view temprature in nice cool way :D ');
    this.appendValueInput("NAME");
  }
  };

Blockly.JavaScript['temprature'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

var code1 = value_name.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');

var code = "function(callback){sendFatherData({'type': 'temp','value':"+code1+"});callback()},";
  return code;
};


Blockly.Blocks['mario_view'] = {
 init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
		this.appendDummyInput()
        .appendTitle("Mario View")
        .appendTitle(new Blockly.FieldImage("http://png-1.findicons.com/files/icons/2297/super_mario/256/paper_lakitu.png", 50, 50));
    /*this.appendDummyInput()
        .appendTitle("Mario View")
        .appendTitle(new Blockly.FieldImage("http://static2.wikia.nocookie.net/__cb20100110151530/s__/supermario/fi/images/f/f3/Mario-mushroom.svg.png", 30, 30));
        */
    this.appendValueInput("NAME");

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('View Different Input');
  }
  };

Blockly.JavaScript['mario_view'] = function(block) {

  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

var code1 = value_name.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');

var code2 = "function(callback){sendFatherData({'type': 'marioView','value':"+code1+"});callback()},";

  // TODO: Change ORDER_NONE to the correct strength.
   return code2;
};

Blockly.Blocks['snakeGame'] = {
 init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
		this.appendDummyInput()
        .appendTitle("Snake Game")
        .appendTitle(new Blockly.FieldImage("http://png-1.findicons.com/files/icons/2297/super_mario/256/paper_lakitu.png", 50, 50));
    /*this.appendDummyInput()
        .appendTitle("Mario View")
        .appendTitle(new Blockly.FieldImage("http://static2.wikia.nocookie.net/__cb20100110151530/s__/supermario/fi/images/f/f3/Mario-mushroom.svg.png", 30, 30));
        */
//    this.appendValueInput("NAME");

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Play snake Game');
  }
  };

Blockly.JavaScript['snakeGame'] = function(block) {

  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

var code1 = value_name.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');

var code2 = "function(callback){sendFatherData({'type': 'snakeGame','value':console.log('test')});callback()},";

  // TODO: Change ORDER_NONE to the correct strength.
   return code2;
};

Blockly.Blocks['marioPiano'] = {
 init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
		this.appendDummyInput()
        .appendTitle("Mario Piano")
        .appendTitle(new Blockly.FieldImage("http://png-1.findicons.com/files/icons/2297/super_mario/256/paper_lakitu.png", 50, 50));
    /*this.appendDummyInput()
        .appendTitle("Mario View")
        .appendTitle(new Blockly.FieldImage("http://static2.wikia.nocookie.net/__cb20100110151530/s__/supermario/fi/images/f/f3/Mario-mushroom.svg.png", 30, 30));
        */
//    this.appendValueInput("NAME");

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Play!');
  }
  };

Blockly.JavaScript['marioPiano'] = function(block) {

  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

var code1 = value_name.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');

var code2 = "function(callback){sendFatherData({'type': 'marioPiano','value':console.log('piano')});callback()},";

  // TODO: Change ORDER_NONE to the correct strength.
   return code2;
};

Blockly.Blocks['robotArrows'] = {
 init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
		this.appendDummyInput()
        .appendTitle("Robot Arrows")
        .appendTitle(new Blockly.FieldImage("http://png-1.findicons.com/files/icons/2297/super_mario/256/paper_lakitu.png", 50, 50));
    /*this.appendDummyInput()
        .appendTitle("Mario View")
        .appendTitle(new Blockly.FieldImage("http://static2.wikia.nocookie.net/__cb20100110151530/s__/supermario/fi/images/f/f3/Mario-mushroom.svg.png", 30, 30));
        */
//    this.appendValueInput("NAME");

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Play snake Game');
  }
  };

Blockly.JavaScript['robotArrows'] = function(block) {

  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

var code1 = value_name.replace(/[\(\)']/,'').replace(/[\(\)']$/,'');

var code2 = "function(callback){sendFatherData({'type': 'robotArrows','value':console.log('test')});callback()},";

  // TODO: Change ORDER_NONE to the correct strength.
   return code2;
};

Blockly.Blocks['date_event'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle("Execute  on The Below Date ");
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown([["2014", "2014"], ["2015", "2015"], ["2016", "2016"]]), "year")
        .appendTitle(new Blockly.FieldDropdown([["January", "0"], ["Febraury", "1"], ["March", "2"],["April","3"],["May", "4"], ["Jun", "5"], ["July", "6"],["Auguest", "7"], ["September", "8"], ["October", "9"],["November", "10"], ["December", "11"]]), "month")
        .appendTitle(new Blockly.FieldDropdown([ ["0", "0"], ["1", "1"], ["2", "2"],["3","3"],["4", "4"], ["5", "5"], ["6", "6"],["7", "7"], ["8", "8"], ["9", "9"],["10", "10"], ["11", "11"], ["12", "12"],["13","13"],["14", "14"], ["15", "15"], ["16", "16"],["17", "17"], ["18", "18"], ["19", "19"],["20", "20"],["21", "21"], ["22", "22"],["23","23"],["24", "24"], ["25", "25"], ["26", "26"],["27", "27"], ["28", "28"], ["29", "29"],["30", "30"],["31", "31"]]), "day")
        .appendTitle(new Blockly.FieldDropdown([["1 Am", "1"], ["2 AM", "2"], ["3 AM", "3"],["4 Am", "4"], ["5 AM", "5"], ["6 AM", "6"],["7 Am", "7"], ["8 AM", "8"], ["9 AM", "9"],["10 Am", "10"], ["11 AM", "11"], ["12 PM", "12"],["1 PM", "13"], ["2 PM", "14"], ["3 PM", "15"],["4 PM", "16"], ["5 PM", "17"], ["6 PM", "18"],["7 PM", "19"], ["8 PM", "20"], ["9 PM", "21"],["10 PM", "22"], ["23 PM", "11"], ["12 AM", "00"]]), "hour")

        .appendTitle(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"],["3","3"],["4", "4"], ["5", "5"], ["6", "6"],["7", "7"], ["8", "8"], ["9", "9"],["10", "10"], ["11", "11"], ["12", "12"],["13","13"],["14", "14"], ["15", "15"], ["16", "16"],["17", "17"], ["18", "18"], ["19", "19"],["20", "20"],["21", "21"], ["22", "22"],["23","23"],["24", "24"], ["25", "25"], ["26", "26"],["27", "27"], ["28", "28"], ["29", "29"],["30", "30"],["31", "31"], ["32", "32"],["33","33"],["34", "34"], ["35", "35"], ["36", "36"],["37", "37"], ["38", "38"], ["39", "39"],["40", "40"],["41", "41"], ["42", "42"],["43","43"],["44", "44"], ["45", "45"], ["46", "46"],["47", "47"], ["48", "48"], ["49", "49"],["50", "50"],["51", "51"], ["52", "52"],["53","53"],["54", "54"], ["55", "55"], ["56", "56"],["57", "57"], ["58", "58"], ["59", "59"],["60", "60"]]), "minuts")


        .appendTitle(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"],["3","3"],["4", "4"], ["5", "5"], ["6", "6"],["7", "7"], ["8", "8"], ["9", "9"],["10", "10"], ["11", "11"], ["12", "12"],["13","13"],["14", "14"], ["15", "15"], ["16", "16"],["17", "17"], ["18", "18"], ["19", "19"],["20", "20"],["21", "21"], ["22", "22"],["23","23"],["24", "24"], ["25", "25"], ["26", "26"],["27", "27"], ["28", "28"], ["29", "29"],["30", "30"],["31", "31"], ["32", "32"],["33","33"],["34", "34"], ["35", "35"], ["36", "36"],["37", "37"], ["38", "38"], ["39", "39"],["40", "40"],["41", "41"], ["42", "42"],["43","43"],["44", "44"], ["45", "45"], ["46", "46"],["47", "47"], ["48", "48"], ["49", "49"],["50", "50"],["51", "51"], ["52", "52"],["53","53"],["54", "54"], ["55", "55"], ["56", "56"],["57", "57"], ["58", "58"], ["59", "59"],["60", "60"]]), "seconds");

    this.appendStatementInput("NAME");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['date_event'] = function(block) {

  var dropdown_year = block.getTitleValue('year');
  var dropdown_month = block.getTitleValue('month');
  var dropdown_day = block.getTitleValue('day');
  var dropdown_hour = block.getTitleValue('hour');
  var dropdown_minuts = block.getTitleValue('minuts');
  var dropdown_seconds = block.getTitleValue('seconds');
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.


  var content=code_generator.genSeries(statements_name);
var code= "function(callback){var now = new Date();"+
	  "var millisTillX = new Date("+dropdown_year+","+dropdown_month+","+dropdown_day+","+dropdown_hour+","+dropdown_minuts+","+dropdown_seconds+",0)-now;"+
	  "if (millisTillX < 0) {"+
	  "millisTillX += 86400000; }"+
	  "setTimeout(function(){"+content+"}, millisTillX);callback()},"

  return code;
};

Blockly.Blocks['camera_view'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(352);
		this.appendDummyInput()
			.appendTitle("Camera View")
			.appendTitle(new Blockly.FieldImage("../media/images/projectIcons/video.png", 30, 30));
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Camer view from your web cam ( if you have one )');
	}
};

Blockly.JavaScript['camera_view'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = "function(callback){sendFatherData({'type': 'cameraView','value':'camera'});callback()},";
	return code;
};




/*Blockly.Blocks['resistor'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendDummyInput()
			.appendTitle("Resistor")
			.appendTitle(new Blockly.FieldImage("http://2.bp.blogspot.com/-QYmxW54tUXA/USRb69IpqrI/AAAAAAAAALo/MsAvaac2fis/s200/simbol+resistor.png", 30, 30));
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.JavaScript['resistor'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = '...';
	return code;
};
*/


Blockly.Blocks['IO_temprature'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("Temprature");
		this.setOutput(true,"String");
		this.setTooltip('Temprature Value');
	}
};

Blockly.JavaScript['IO_temprature'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Tmp');
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['IO_magnetic'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("Magnetic");
		this.setOutput(true,"String");
		this.setTooltip('Magnetic Value');
	}
};

Blockly.JavaScript['IO_magnetic'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Mag');
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['IO_humidity'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("Humidity");
		this.setOutput(true,"String");
		this.setTooltip('Humidity Value');
	}
};

Blockly.JavaScript['IO_humidity'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Hum');
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['IO_distance'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("Distance");
		this.setOutput(true,"String");
		this.setTooltip('Distance Value');
	}
};

Blockly.JavaScript['IO_distance'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Dis');
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['IO_motion'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("Motion");
		this.setOutput(true,"String");
		this.setTooltip('Motion Value');
	}
};

Blockly.JavaScript['IO_motion'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Mot');
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['IO_ir'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("IR");
		this.setOutput(true,"String");
		this.setTooltip('IR Value');
	}
};

Blockly.JavaScript['IO_ir'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Ir');
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['IO_resistor'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("Resistor");
		this.setOutput(true,"String");
		this.setTooltip('Resistor Value');
	}
};

Blockly.JavaScript['IO_resistor'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Res');
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['IO_voltmeter'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("Voltage");
		this.setOutput(true,"String");
		this.setTooltip('Voltmeter Value');
	}
};

Blockly.JavaScript['IO_voltmeter'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Vol');
	return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.Blocks['IO_sound'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("Sound");
		this.setOutput(true,"String");
		this.setTooltip('Sound Value');
	}
};

Blockly.JavaScript['IO_sound'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Sou');
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['IO_light'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendTitle("Light");
		this.setOutput(true,"String");
		this.setTooltip('Light Value');
	}
};

Blockly.JavaScript['IO_light'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genIO('Lig');
	return [code, Blockly.JavaScript.ORDER_NONE];
};


/*Blockly.Blocks['sensor_read'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
			.appendTitle("Sensor Read");
		this.appendDummyInput()
			.appendTitle(new Blockly.FieldDropdown([["Temprature", "getTmp"], ["Voltmeter", "getVolt"], ["Resistor", "getResi"],["Sound", "getSound"], ["Light", "getLight"], ["Push Button", "push"]]), "NAME");
		this.appendDummyInput()
			.appendTitle("infinite")
			.appendTitle(new Blockly.FieldCheckbox("FALSE"), "cbvalue")
			.appendTitle(new Blockly.FieldImage("http://png-1.findicons.com/files/icons/2297/super_mario/256/paper_lakitu.png", 50, 50));

		this.setPreviousStatement(true);
		this.setNextStatement(true);

		this.appendStatementInput("NAME");
		this.setTooltip('This block will get any sensor value');
	}
};




Blockly.JavaScript['sensor_read'] = function(block) {

	var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
	var dropdown_name = block.getTitleValue('NAME');
	// TODO: Assemble JavaScript into code variable.
	var checkbox_cbvalue = block.getTitleValue('cbvalue') == 'TRUE';

	var eventDone=1;

	if(checkbox_cbvalue == true)
	{
		//debugger;
		var str = [""
			,"window.addEventListener('message',function(obj){var sensorValue=obj.data.value;console.log(sensorValue);"+statements_name+"});"
			,"sendFatherData({'type': '"+dropdown_name+"','value':'000','inf':'1'});"
			].join("");

	}
	else
    {

		var str = [""
			,"window.addEventListener('message',function(obj){var sensorValue=obj.data.value;console.log(sensorValue);"+statements_name+";});"
			,"sendFatherData({'type': '"+dropdown_name+"','value':'000','inf':'0'});"
			].join("");
	}


	var code=str;
	//var code = 'window.addEventListener("message",function(obj){console.log(obj.data.value)});sendFatherData({"type": "getTmp","value":"000"})';
	return code;
};


*/

Blockly.Blocks['IO_one'] = {
    ok:'test',
	init: function(in_out) {
   in_out = typeof int_out !== 'undefined' ? int_out : 1;
		this.setHelpUrl('http://www.example.com/');
		this.setColour(180);
		this.appendDummyInput()
			.appendTitle("I/O Pin1");
		this.appendDummyInput()
			.appendTitle(new Blockly.FieldDropdown([["input", "in"], ["Output", "out"]]), "NAME");

      if(in_out == 1)
          {
		this.setOutput(true,"String");
		this.setPreviousStatement(false);
		this.setNextStatement(false);
        this.setInputsInline(false);
          }
          else
              {
		this.setOutput(false,"String");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
        this.setInputsInline(true);
              }


	}
};




Blockly.JavaScript['IO_one'] = function(block) {

	var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
	var dropdown_name = block.getTitleValue('NAME');

    var code;
    if(dropdown_name=='in') //then user choose it as input
        {
            code="console.log('input')";

        }
        else
            if(dropdown_name == 'out')
               {
            code="console.log('output')";
               }

	//var code = 'window.addEventListener("message",function(obj){console.log(obj.data.value)});sendFatherData({"type": "getTmp","value":"000"})';
	return code;
};

Blockly.Blocks['led'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(93);
		this.appendDummyInput()
			.appendTitle("LED");
		this.appendDummyInput()
			.appendTitle(new Blockly.FieldImage("https://cdn1.iconfinder.com/data/icons/windows-8-metro-style/512/led_diode-.png", 30, 30));
		this.appendDummyInput();
		this.appendDummyInput()
			.appendTitle("On/Off")
			.appendTitle(new Blockly.FieldCheckbox("TRUE"), "NAME");
		this.setPreviousStatement(true);
		this.setNextStatement(true);

		this.setInputsInline(true);
		this.setTooltip('');
	}
};
Blockly.JavaScript['led'] = function(block) {
	var checkbox_name = block.getTitleValue('NAME') == 'TRUE';
	// TODO: Assemble JavaScript into code variable.
	var code = "function(callback){sendFatherData({'type': 'led','value':"+checkbox_name+"});callback();}, "; return code;
	return code;
};


Blockly.Blocks['O_pwm'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
        .appendTitle("PWM")
        .appendTitle(new Blockly.FieldTextInput("50"), "NAME")
        .appendTitle("%");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Output a PWM from 0-100%');
  }
};


Blockly.JavaScript['O_pwm'] = function(block) {
  var text_name = block.getTitleValue('NAME');

  // TODO: Assemble JavaScript into code variable.
  //convert value from 100% to 255

  var val=text_name*2.55;
  console.log('value of pwm is '+val);
  var code = "function(callback){sendFatherData({'type': 'PWM','value':"+val+"});callback();}, "; return code;
  return code;
};

Blockly.Blocks['O_vib'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(220);
    this.appendDummyInput()
        .appendTitle("Vibrate")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Output Vibration');
  }
};


Blockly.JavaScript['O_vib'] = function(block) {
  var text_name = block.getTitleValue('NAME');

  // TODO: Assemble JavaScript into code variable.
  //convert value from 100% to 255

  var val=text_name*2.55;
  console.log('value of pwm is '+val);
  var code = "function(callback){sendFatherData({'type': 'vib','value':"+val+"});callback();}, "; return code;
  return code;
};


Blockly.Blocks['delay'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
        .appendTitle("Delay For")
        .appendTitle(new Blockly.FieldTextInput(""), "NAME")
        .appendTitle("");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Output a PWM from 0-100%');
  }
};


Blockly.JavaScript['delay'] = function(block) {
  var text_name = block.getTitleValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  //convert value from 100% to 255
  var code = "function(callback){setTimeout(function(){callback()},"+text_name+");},"; return code;
  return code;
};


Blockly.Blocks['take_photo'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(93);
		this.appendDummyInput()
			.appendTitle("Take Photo");
		this.appendDummyInput()
			.appendTitle(new Blockly.FieldImage("../media/images/projectIcons/takeShot.png", 30, 30));
		this.setPreviousStatement(true);
		this.setNextStatement(true);

		this.setInputsInline(true);
		this.setTooltip('');
	}
};


Blockly.JavaScript['take_photo'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = "function(callback){sendFatherData({'type': 'takePhoto','value':'0'});callback();}, "; return code;
};


//plugins section


//slider
Blockly.Blocks['slider_init'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(150);
		this.appendDummyInput()
			.appendTitle("Slider Initialization");
		this.appendStatementInput("NAME");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Any Prepration of your code shoud be put her');
	}
};

Blockly.JavaScript['slider_init'] = function(block) {
	var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
	var value_start="<div class='reveal'><div class='slides'>";
	var value_end="</div></div>";
	var str=''+value_start+statements_name+value_end+'';
	var code = "sendFatherData({'type': 'sliderShow','func':'init','value':"+str+"});";

	return code;
};


Blockly.Blocks['slider_content'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(210);
		this.appendDummyInput()
			.appendTitle("Slide Content");
		this.appendDummyInput()
			.appendTitle(new Blockly.FieldTextInput("type text here..."), "NAME");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('');
	}
};

Blockly.JavaScript['slider_content'] = function(block) {
	var text_name = block.getTitleValue('NAME');
	var code = '<section><p>'+text_name+'</p><section>';
	return code;
};


/*
 *@block for robot
 *
 *
 */


Blockly.Blocks['rForward'] = {
	init: function()
    {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(93);
		this.appendDummyInput()
			.appendTitle("Forward");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setInputsInline(true);
		this.setTooltip('Robot Forward');
	}
};


Blockly.JavaScript['rForward'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genR('rForward');
	return code;
};


Blockly.Blocks['rBackward'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(93);
		this.appendDummyInput()
			.appendTitle("Backward");
		this.setPreviousStatement(true);
		this.setNextStatement(true);

		this.setInputsInline(true);
		this.setTooltip('Backward');
	}
};


Blockly.JavaScript['rBackward'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genR('rBackward');
    return code ;
};

Blockly.Blocks['rLeft'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(93);
		this.appendDummyInput()
			.appendTitle("Left");
		this.setPreviousStatement(true);
		this.setNextStatement(true);

		this.setInputsInline(true);
		this.setTooltip('Robot Left');
	}
};


Blockly.JavaScript['rLeft'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genR('rLeft');
    return code ;
};


Blockly.Blocks['rRight'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(93);
		this.appendDummyInput()
			.appendTitle("Right");
		this.setPreviousStatement(true);
		this.setNextStatement(true);

		this.setInputsInline(true);
		this.setTooltip('Robot Right');
	}
};


Blockly.JavaScript['rRight'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genR('rRight');
    return code ;
};

Blockly.Blocks['rHookDown'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(93);
		this.appendDummyInput()
			.appendTitle("HookDown");
		this.setPreviousStatement(true);
		this.setNextStatement(true);

		this.setInputsInline(true);
		this.setTooltip('Robot HookDown');
	}
};


Blockly.JavaScript['rHookDown'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genR('rHookDown');
    return code ;
};


Blockly.Blocks['rHookUp'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(93);
		this.appendDummyInput()
			.appendTitle("HookUp");
		this.setPreviousStatement(true);
		this.setNextStatement(true);

		this.setInputsInline(true);
		this.setTooltip('Robot HookUp');
	}
};


Blockly.JavaScript['rHookUp'] = function(block) {
	// TODO: Assemble JavaScript into code variable.
	var code = code_generator.genR('rHookUp');
    return code ;
};


/**************** END BLOCK FOR ROBOT ************************/
//for the control if
//tobeDeleted
function ifExpression(expression,order) {
	var operator=null;
	if (expression.match("==") !=null)
	{
		operator="==";
	}
	else  if (expression.match(">") !=null)
	{
		operator=">";
	}
	else  if (expression.match("<") !=null)
	{
		operator="<";
	}
	else  if (expression.match("!=") !=null)
	{
		operator="!=";
	}
	if(order==0)
		var regex = new RegExp("(.+)" +operator );
	else if(order==1)
		var regex = new RegExp(operator+"(.+)"  );


	var matchedText=expression.match(regex)[1];

	return matchedText;


}
