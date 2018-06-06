//create the container for hte electMeasBody

//the display for the voltmeter;
//decide what sensor is currently use

// 1 is voltage
// 2 is temprature

var activeSensor=0;
display=null;

var electMeasSec= {
	electMeasView:null,

	createView:function(){
	/*
		this.electMeasView=document.createElement('div');
		var leftTab=document.createElement('div');
		leftTab.className+="tabbable tabs-left";
		var ulTab=document.createElement('ul');
		ulTab.className+=" nav nav-tabs ";

		var voltList=document.createElement('li');
		voltList.className+=" active ";

		var voltLink=document.createElement('a');
		voltLink.innerHTML=" Voltmeter ";
		voltLink.href="#vl";
		voltLink.setAttribute("data-toggle","tab");
		voltList.appendChild(voltLink);

		var tempList=document.createElement('li');

		var tempLink=document.createElement('a');

		tempLink.innerHTML=" Temprature ";
		tempLink.href="#tm";
		tempLink.setAttribute("data-toggle","tab");
		tempList.appendChild(tempLink);




		var tabContent=document.createElement('div');
		tabContent.className+=" tab-content ";

*/


		//*for the voltmeter device */
		var deviceSec=document.createElement('div');
		deviceSec.id="voltMeterDevSec";
		var deviceImg=document.createElement('img');
		deviceImg.setAttribute('usemap','#voltmeterMap');
		deviceImg.src='../../../media/images/tools/voltmeter/device.png';



		//image map

		var imgMap=document.createElement('map');
		imgMap.id="voltmeterMap";
		imgMap.name="voltmeterMap";

		imgMap.innerHTML=' <area shape="circle" id="voltButton" alt="" title="" coords="66,180,20" /><area shape="circle" alt="" title=""  id="offButton" coords="137,147,14" />'; 

		var deviceHandImg=document.createElement("img");
		deviceHandImg.src='../../../media/images/tools/voltmeter/hand.png';
		deviceHandImg.id='voltMeterDevHand';

		var deviceCanvas=document.createElement("canvas");
		deviceCanvas.id="sevenSegDisplay";
		deviceCanvas.width=120;
		deviceCanvas.height=34;

		deviceSec.appendChild(deviceImg);
		deviceSec.appendChild(imgMap);
		deviceSec.appendChild(deviceCanvas);
		deviceSec.appendChild(deviceHandImg);


		/*var voltContent=document.createElement('div');
		voltContent.className+=" tab-pane active ";
		voltContent.appendChild(deviceSec);
		*/

		//var voltSlider=app.slider.createSlider("myCarousel");
		//voltContent.appendChild(voltSlider);




		//voltContent.innerHTML="<img src='../../../media/images/tools/voltmeter/device.png'/> <canvas id='display' width='120' height='34'></canvas> ";
	//	voltContent.id="vl";


/*
		var tempContent=this.createThermo();
	

		tabContent.appendChild(voltContent);
		tabContent.appendChild(tempContent);


		ulTab.appendChild(voltList);
		ulTab.appendChild(tempList);

		leftTab.appendChild(ulTab);
		leftTab.appendChild(tabContent);



*/
		//this.electMeasView.appendChild(leftTab);


return deviceSec;
	},

	createThermo:function(){
	var me =this;
		var content=document.createElement('div');

		content.className+="tab-pane";
		var thermo=document.createElement('div');
		thermo.id="thermoSec";

		var thermoBody=document.createElement("img");
		thermoBody.src="../../../../../media/images/thermometer/thermobody.png"
		thermoBody.id="thermoBody";

		var thermoCDiv=document.createElement("div");
		thermoCDiv.id="thermoC";
		var thermoC=document.createElement("img");
		thermoC.src="../../../../../media/images/thermometer/thermoC.png"

		var thermoPipe=document.createElement("div");
		thermoPipe.setAttribute("class","thermoPipe");
		thermoPipe.id="thermoPipe";

		thermoCDiv.appendChild(thermoC);
		thermoCDiv.appendChild(thermoPipe);

		var thermoF=document.createElement("img");
		thermoF.src="../../../../../media/images/thermometer/thermoF.png"
		thermoF.id="thermoF";

		var thermoButton=document.createElement("img");
		thermoButton.src="../../../../../media/images/thermometer/thermoButton.png"
		thermoButton.id="thermoButton";

		thermoReadButton=document.createElement("img");
		thermoReadButton.src="../../../../../media/images/thermometer/thermoButton.png"
		thermoReadButton.id="thermoReadButton";




		thermoButton.addEventListener('click',function(){ 
		if(thermoCDiv.style.display=="none")
		thermoCDiv.style.display="block";
		else 
		thermoCDiv.style.display="none";
		
		});
		var thermoReadToggle=0;
		thermoReadButton.addEventListener('click',function(){ 

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



		thermo.appendChild(thermoBody);
		thermo.appendChild(thermoF);
		thermo.appendChild(thermoCDiv);

		thermo.appendChild(thermoButton);
		thermo.appendChild(thermoReadButton);


		content.appendChild(thermo);
		//content.innerHTML='<iframe id="slideShow" src="../../sandboxed.html" width="400" height="330"></iframe>';

		content.id="tm";
		return content;

	},

	showView:function()
	{

		mainView.appendChild(app.electMeasView.electMeasView);
		$('.carousel').carousel();
		console.log('view is loaded');

	}



};
