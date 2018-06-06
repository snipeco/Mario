var tools_temprature= {

	createView:function(){
		var me =this;
		var thermo=document.createElement('div');
		thermo.id="thermoSec";

		var thermoBody=document.createElement("img");
		thermoBody.src="../../../../../media/images/tools/thermometer/thermobody.png"
		thermoBody.id="thermoBody";

		var thermoCDiv=document.createElement("div");
		thermoCDiv.id="thermoC";
		var thermoC=document.createElement("img");
		thermoC.src="../../../../../media/images/tools/thermometer/thermoC.png"

		var thermoPipe=document.createElement("div");
		thermoPipe.setAttribute("class","thermoPipe");
		thermoPipe.id="thermoPipe";

		thermoCDiv.appendChild(thermoC);
		thermoCDiv.appendChild(thermoPipe);

		var thermoF=document.createElement("img");
		thermoF.src="../../../../../media/images/tools/thermometer/thermoC.png"
		thermoF.id="thermoF";

		var thermoButton=document.createElement("img");
		thermoButton.src="../../../../../media/images/tools/thermometer/thermoButton.png"
		thermoButton.id="thermoButton";

		thermoReadButton=document.createElement("img");
		thermoReadButton.src="../../../../../media/images/tools/thermometer/thermoButton.png"
		thermoReadButton.id="thermoReadButton";




		thermoButton.addEventListener('click',function(){ 
		if(thermoCDiv.style.display=="none")
		thermoCDiv.style.display="block";
		else 
		thermoCDiv.style.display="none";
		
		});
		var thermoReadToggle=0;
		/*thermoReadButton.addEventListener('click',function(){ 

			if(thermoReadToggle==1)
			{
			thermoReadToggle=0;
			stopReading();
			}
			else {
			thermoReadToggle=1;
			activeSensor=2;
			readSensor();
			}

		});


*/
		thermo.appendChild(thermoBody);
		thermo.appendChild(thermoF);
		thermo.appendChild(thermoCDiv);

		thermo.appendChild(thermoButton);
		thermo.appendChild(thermoReadButton);


		//content.innerHTML='<iframe id="slideShow" src="../../sandboxed.html" width="400" height="330"></iframe>';

		return thermo;

	},

thermoDisplay:function(value){
	var pipeHeight=0;
	var pipeTop=0;
	var offset=0;
	//result is the height of the pipe after calculation
	//	value=value+10;
	var result=value*(28/10);
	result=result+28;
	thermoPipe=document.getElementById("thermoPipe");
	pipeTop=thermoPipe.offsetTop;
	pipeHeight=thermoPipe.offsetHeight;

	var preResult=pipeTop-385;

	result=result+preResult;

	if (result < 1)
	{
	offset=0;
	}
	else offset=5;

	$(thermoPipe).animate({
		"top": pipeTop-result+"px",
		"height": pipeHeight+result+"px",
	}, 5 );

}



};




