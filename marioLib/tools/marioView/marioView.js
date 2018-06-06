//create the container for hte electMeasBody

//the display for the voltmeter;
//decide what sensor is currently use

// 1 is voltage
// 2 is temprature

var activeSensor=0;

var marioView= {

 display:null,
	createView:function(){
		var marioView=document.createElement('div');
		marioView.id="marioView";

		marioViewCanvas=document.createElement('canvas');
		marioViewCanvas.id="marioViewCanvas";
		marioViewCanvas['width']="260";
		marioViewCanvas['height']="140";
		marioView.appendChild(marioViewCanvas);

		//loading the 7 segment display

		var display= new SegmentDisplay("marioViewCanvas");
		display.pattern         = "#.#.#.#";
		display.cornerType      = 2;
		display.displayType     = 7;
		display.displayAngle    = 9;
		display.digitHeight     = 20;
		display.digitWidth      = 12;
		display.digitDistance   = 2;
		display.segmentWidth    = 3;
		display.segmentDistance = 0.5;
		display.colorOn         = "rgba(0, 0, 0, 0.9)";
		display.colorOff        = "rgba(0, 0, 0, 0.1)";



		function animate() {
			display.setValue("0.0.0.0");
		}
		animate();





		this.display=display;

		return marioView;
	},


	showView:function()
	{


	}



}
