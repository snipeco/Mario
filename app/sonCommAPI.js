var fatherMessageHanlder = function(e) {
	parseFatherData(e);

	//var code = Blockly.JavaScript.workspaceToCode();
	//	console.log(code)
	//	eval(code);

	//sendFatherData("tmp");

};


function fireEvent(name, target, param) {
	//Ready: create a generic event
	var evt = document.createEvent("Events")
		//Aim: initialize it to be the event we want
		evt.initEvent(name, true, true); //true for can bubble, true for cancelable
	evt.param = param;
	//FIRE!
	target.dispatchEvent(evt);
};
//parsing fater data 
function parseFatherData(e,code){
    var xml;
	var data=e.data;
    var xml_text;
	if (data.value=="hiSon")
	{
		//console.log("son:hi dad");
		father=e;
	}
	if(data.value=="eval")
	{
		code = Blockly.JavaScript.workspaceToCode();
		eval(code);

	}
	if ( data.value=='save')
	{
    	 xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		 xml_text = Blockly.Xml.domToText(xml);

		if(xml_text!="<xml></xml>")
		{
			console.log(xml_text);
			sendFatherData({'type': 'save','value':xml_text}) ;

		}
		else {
			console.log('empty work space');
		}




	}
	if ( data.value=='getXML')
	{
		 xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		 xml_text = Blockly.Xml.domToText(xml);

		if(xml_text!="<xml></xml>")
		{
			console.log(xml_text);
			sendFatherData({'type': 'getXML','value':xml_text}) ;

		}
		else {
			console.log('empty work space');
		}




	}
	if ( data.value=='open')
	{
            //clear all work space
            Blockly.mainWorkspace.clear();

     xml = Blockly.Xml.textToDom(data.code);
		Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,xml);

	}
	if ( data.value=='loadXML')
	{
			 xml = Blockly.Xml.textToDom(data.code);
			Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,xml);

	}
	else {
		var value=data.value;
		fireEvent(data.type,document,value);
	}


	function sendFatherData(data){
		father.source.postMessage(data,father.origin);
	}
}
window.addEventListener('message', fatherMessageHanlder);



