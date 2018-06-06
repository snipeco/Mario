var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
	parseSonData(e.data);
},false);



function parseSonData(data)
{
	if(data.type == "init" )
	{

	}
	else if(data.type == "program" )
	{

	}
	else if(data.type=="sliderShow")
	{
		if(data.func=="init")
		{
			//load the slider files
			
			//create the sliders
			console.log(data.value);

		}
		else if(data.func=="showSlider")
		{
		}

	}
	else if(data.type == "save" )
	{
		mario.workSpaceCode=data.value;
		mario.fireEvent('saveFile',document);

	}
	else if(data.type == "getXML" )
	{
		mario.workSpaceXML=data.value;
		mario.fireEvent('getXML',document);

	}

	else if(data.type == "chartSL" )
	{
		if (mario.isEmpty(mario.tools.chartSL))
		{
            //if there is something in the view clear it 
            if(mario.popup.firstChild !== null && mario.popup.firstChild !== undefined) 
            mario.clearView(mario.popup);


			mario.popup.id="marioViewPopup";
			mario.viewSpace.appendChild(mario.popup);

	    	var dps = []; // dataPoints

            
                var chartSL = new CanvasJS.Chart("marioViewPopup", {

      zoomEnabled: true,
      exportEnabled: true,
                     animationEnabled: true,
                    
title :{
				text: "Test Chart"

    	},			
			data: [{
				type: "line",
				dataPoints: dps 
			}]
		});
        chartSL.times=0;


		var dataLength = 500; // number of dataPoints visible at any point

                    
			mario.tools.chartSL=chartSL; // it is not empty

             dps=chartSL.options.data[0].dataPoints;
				 dps.push({
					x: chartSL.times,
					y: parseInt(data.value),
				});

            chartSL.render();
  
		// generates first set of dataPoints
		//updateChart(dataLength); 

		// update chart after specified time. 
		//setInterval(function(){updateChart();}, updateInterval); 
            
        chartSL.times++;

		}
		else {
            console.log(data.value + " C/F");
            var chart= mario.tools.chartSL;
            var dataPoints=chart.options.data[0].dataPoints;
				 dataPoints.push({
					x: chart.times,
					y: parseInt(data.value),
				});

                chart.options.data[0].dataPoints=dataPoints;
            chart.render();
            chart.times++;
			mario.completedData="";
		}

	}

	else if(data.type == "chartXY" )
	{
		if (mario.isEmpty(mario.tools.chartXY))
		{
            //if there is something in the view clear it 
            if(mario.popup.firstChild !== null && mario.popup.firstChild !== undefined) 
            mario.clearView(mario.popup);


			mario.popup.id="marioViewPopup";
			mario.viewSpace.appendChild(mario.popup);

	    	var dps = []; // dataPoints

            
                var chartXY = new CanvasJS.Chart("marioViewPopup", {

      zoomEnabled: true,
      exportEnabled: true,
                     animationEnabled: true,
title :{
				text: "Test Chart"

    	},			
			data: [{
				type: "line",
				dataPoints: dps 
			}]
		});
        chartXY.times=0;


		var dataLength = 500; // number of dataPoints visible at any point

                    
			mario.tools.chartXY=chartXY; // it is not empty

             dps=chartXY.options.data[0].dataPoints;
				 dps.push({
					x: parseInt(data.valueX),
					y: parseInt(data.valueY),
				});

            chartXY.render();
  
		// generates first set of dataPoints
		//updateChart(dataLength); 

		// update chart after specified time. 
		//setInterval(function(){updateChart();}, updateInterval); 
            
        chartXY.times++;

		}
		else {
            console.log(data.value + " C/F");
            var chart= mario.tools.chartXY;
            var dataPoints=chart.options.data[0].dataPoints;
				 dataPoints.push({
					x: parseInt(data.valueX),
					y: parseInt(data.valueY),
				});

                chart.options.data[0].dataPoints=dataPoints;
            chart.render();
            chart.times++;
			mario.completedData="";
		}

	}

	else if(data.type == "temp" )
	{
		if (mario.isEmpty(mario.tools.temprature))
		{
            //if there is something in the view clear it 
            if(mario.popup.firstChild !== null && mario.popup.firstChild !== undefined) 
            mario.clearView(mario.popup);

			var tempratureView= tools_temprature.createView();
			mario.tools.temprature=tools_temprature;
			mario.popup.id="marioViewPopup";
			mario.popup.appendChild(tempratureView);
			mario.viewSpace.appendChild(mario.popup);
			mario.tools.temprature.thermoDisplay(data.value);

		}
		else {
			mario.tools.temprature.thermoDisplay(data.value);
			mario.completedData="";
		}

	}

	else if (data.type =="volt")
	{
		mario.currentOutput=6;
		console.log('creating voltmeter view ');

		if (mario.isEmpty(mario.tools.voltmeter))
		{
            //if there is something in the view clear it 
            if(mario.popup.firstChild !== null && mario.popup.firstChild !== undefined) 
            mario.clearView(mario.popup);

			var voltMetereView=electMeasSec.createView();
				mario.popup.id="voltmeterPopup";
			mario.popup.appendChild(voltMetereView);
			mario.viewSpace.appendChild(mario.popup);



			var display= new SegmentDisplay("sevenSegDisplay");
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

			mario.tools.voltmeter.display=display;

			animate();

			function animate() {

				mario.tools.voltmeter.display.setValue("0.0.0.0");
			}





		}

		else {
			//debug
			//debugger;
			//debug;
			console.log(data.value);
			mario.tools.voltmeter.display.setValue(data.value);
			//TODO some enhancment this line is added in everyfunction
			mario.completedData="";
		}



	}


	//creating the mario view 
	else if (data.type =="marioView")
	{
		//debug
		//console.log('creating marioView');
		//debug;

		if (mario.isEmpty(mario.tools.marioView))
		{
            //if there is something in the view clear it 
            if(mario.popup.firstChild !== null && mario.popup.firstChild !== undefined) 


            mario.clearView(mario.popup);
			var marioViews=marioView.createView();
			mario.popup.id="marioViewPopup";
			mario.popup.appendChild(marioViews);
			mario.viewSpace.appendChild(mario.popup);

			marioView.display.setValue(data.value);
			mario.tools.marioView=marioView;

		}

		else {
			//TODO increase the performance 
			//it have to check what current output to change the pattern according to that output ( e.g voltmeter require dot in the pattern ! ) 
			if(mario.currentOutput==6)
				marioView.display.pattern="#.#.#.#";
			else
				marioView.display.pattern="####";

					marioView.display.setValue(data.value);
			//remove the mario completed data so no stacking
			mario.completedData="";
		}



	}

	//creating the snake game 
	else if (data.type =="snakeGame")
	{
		//debug
		//console.log('creating snakeView');
		//debug;

		if (mario.isEmpty(mario.tools.snakeGame))
		{
            //if there is something in the view clear it 
            if(mario.popup.firstChild !== null && mario.popup.firstChild !== undefined) 


            mario.clearView(mario.popup);
			var marioViews=snakeGame.createView();
			mario.popup.id="marioViewPopup";
			mario.popup.appendChild(marioViews);
			mario.viewSpace.appendChild(mario.popup);

			//snakeGame.display.setValue(data.value);
			mario.tools.snakeGame=snakeGame;
            snakeGame.init();

		}

		else {
			//TODO increase the performance 
			//it have to check what current output to change the pattern according to that output ( e.g voltmeter require dot in the pattern ! ) 
			mario.completedData="";
		}



	}
	else if (data.type =="marioPiano")
	{
		//debug
		console.log('creating marioPiano');
		//debug;

		if (mario.isEmpty(mario.tools.marioPiano))
            {
            //if there is something in the view clear it 
            if(mario.popup.firstChild !== null && mario.popup.firstChild !== undefined) 


            mario.clearView(mario.popup);
			var marioViews=marioPiano.createView();
			mario.popup.id="marioViewPopup";
			mario.popup.appendChild(marioViews);
			mario.viewSpace.appendChild(mario.popup);

			//snakeGame.display.setValue(data.value);
			mario.tools.marioPiano=marioPiano;

            //add the event lisnster





            document.getElementById("fing1").addEventListener('mousedown',function(){
                
                setTimeout(function(){
		mario.currentOutput=10;
		mario.serial.serialFun.send(mario.currentOutput,null);
                
                },50);

                setTimeout(function(){
		mario.currentOutput=0;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },100);

                setTimeout(function(){
		mario.currentOutput=188;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },150);

                setTimeout(function(){
		mario.currentOutput=02;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },200);

                setTimeout(function(){
		mario.currentOutput=34;
		mario.serial.serialFun.send(mario.currentOutput,null);
            },250);
            });

            document.getElementById("fing1").addEventListener('mouseup',function(){
		mario.currentOutput=35;
		mario.serial.serialFun.send(mario.currentOutput,null);
		
		});

        //fing1 end 



        //fing2 
            document.getElementById("fing2").addEventListener('mousedown',function(){
                
                setTimeout(function(){
		mario.currentOutput=10;
		mario.serial.serialFun.send(mario.currentOutput,null);
                
                },50);

                setTimeout(function(){
		mario.currentOutput=0;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },100);

                setTimeout(function(){
		mario.currentOutput=24;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },150);

                setTimeout(function(){
		mario.currentOutput=04;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },200);

                setTimeout(function(){
		mario.currentOutput=34;
		mario.serial.serialFun.send(mario.currentOutput,null);
            },250);
            });

            document.getElementById("fing2").addEventListener('mouseup',function(){
		mario.currentOutput=35;
		mario.serial.serialFun.send(mario.currentOutput,null);
		
		});

        //end fing2
        //start fing3
   document.getElementById("fing3").addEventListener('mousedown',function(){
                
                setTimeout(function(){
		mario.currentOutput=10;
		mario.serial.serialFun.send(mario.currentOutput,null);
                
                },50);

                setTimeout(function(){
		mario.currentOutput=0;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },100);

                setTimeout(function(){
		mario.currentOutput=150;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },150);

                setTimeout(function(){
		mario.currentOutput=04;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },200);

                setTimeout(function(){
		mario.currentOutput=34;
		mario.serial.serialFun.send(mario.currentOutput,null);
            },250);
            });

            document.getElementById("fing3").addEventListener('mouseup',function(){
		mario.currentOutput=35;
		mario.serial.serialFun.send(mario.currentOutput,null);
		
		});

        //end fing3
        //start fing4

   document.getElementById("fing4").addEventListener('mousedown',function(){
                
                setTimeout(function(){
		mario.currentOutput=10;
		mario.serial.serialFun.send(mario.currentOutput,null);
                
                },50);

                setTimeout(function(){
		mario.currentOutput=0;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },100);

                setTimeout(function(){
		mario.currentOutput=38;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },150);

                setTimeout(function(){
		mario.currentOutput=05;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },200);

                setTimeout(function(){
		mario.currentOutput=34;
		mario.serial.serialFun.send(mario.currentOutput,null);
            },250);
            });

            document.getElementById("fing4").addEventListener('mouseup',function(){
		mario.currentOutput=35;
		mario.serial.serialFun.send(mario.currentOutput,null);
		
		});
        //end fing4


        //start fing5

   document.getElementById("fing5").addEventListener('mousedown',function(){
                
       console.log('finggggggg 5');
                setTimeout(function(){
		mario.currentOutput=10;
		mario.serial.serialFun.send(mario.currentOutput,null);
                
                },50);

                setTimeout(function(){
		mario.currentOutput=0;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },100);

                setTimeout(function(){
		mario.currentOutput=16;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },150);

                setTimeout(function(){
		mario.currentOutput=05;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },200);

                setTimeout(function(){
		mario.currentOutput=34;
		mario.serial.serialFun.send(mario.currentOutput,null);
            },250);
            });

            document.getElementById("fing5").addEventListener('mouseup',function(){
		mario.currentOutput=35;
		mario.serial.serialFun.send(mario.currentOutput,null);
		
		});
        //end fing5



        //start fing6

   document.getElementById("fing6").addEventListener('mousedown',function(){
                
                setTimeout(function(){
		mario.currentOutput=10;
		mario.serial.serialFun.send(mario.currentOutput,null);
                
                },50);

                setTimeout(function(){
		mario.currentOutput=0;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },100);

                setTimeout(function(){
		mario.currentOutput=32;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },150);

                setTimeout(function(){
		mario.currentOutput=06;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },200);

                setTimeout(function(){
		mario.currentOutput=34;
		mario.serial.serialFun.send(mario.currentOutput,null);
            },250);
            });

            document.getElementById("fing6").addEventListener('mouseup',function(){
		mario.currentOutput=35;
		mario.serial.serialFun.send(mario.currentOutput,null);
		
		});
        //end fing6



        //start fing7

   document.getElementById("fing7").addEventListener('mousedown',function(){
                
                setTimeout(function(){
		mario.currentOutput=10;
		mario.serial.serialFun.send(mario.currentOutput,null);
                
                },50);

                setTimeout(function(){
		mario.currentOutput=0;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },100);

                setTimeout(function(){
		mario.currentOutput=224;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },150);

                setTimeout(function(){
		mario.currentOutput=6;
		mario.serial.serialFun.send(mario.currentOutput,null);
                },200);

                setTimeout(function(){
		mario.currentOutput=34;
		mario.serial.serialFun.send(mario.currentOutput,null);
            },250);
            });

            document.getElementById("fing7").addEventListener('mouseup',function(){
		mario.currentOutput=35;
		mario.serial.serialFun.send(mario.currentOutput,null);
		
		});
        //end fing7
            }
		else {
			//TODO increase the performance 
			//it have to check what current output to change the pattern according to that output ( e.g voltmeter require dot in the pattern ! ) 
			mario.completedData="";
		}



	}

	else if (data.type =="robotArrows")
	{
		//debug
		//console.log('creating snakeView');
		//debug;

		if (mario.isEmpty(mario.tools.robotArrows))
		{
            //if there is something in the view clear it 
            if(mario.popup.firstChild !== null && mario.popup.firstChild !== undefined) 


            mario.clearView(mario.popup);
			var marioViews=robotArrows.createView();
			mario.popup.id="marioViewPopup";
			mario.popup.appendChild(marioViews);
			mario.viewSpace.appendChild(mario.popup);

			//snakeGame.display.setValue(data.value);
			mario.tools.robotArrows=robotArrows;
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" )
            {
		mario.currentOutput=20;
		mario.currentOutputString='rRight';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);
            }
		else if(key == "38")
            {
		mario.currentOutput=19;
		mario.currentOutputString='rBackward';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

            }
		else if(key == "39") 
            {
		mario.currentOutput=21;
		mario.currentOutputString='rLeft';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);
                
            }
		else if(key == "40") 
            {
		mario.currentOutput=18;
		mario.currentOutputString='rForward';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);
                
            }
		//The snake is now keyboard controllable
	});

		}
		else 
        {
			//TODO increase the performance 
			//it have to check what current output to change the pattern according to that output ( e.g voltmeter require dot in the pattern ! ) 
			mario.completedData="";
		}



	}

	//creating the video view 
	else if (data.type =="cameraView")
	{

		if (mario.isEmpty(mario.tools.cameraView))
		{
            //if there is something in the view clear it 
            if(mario.popup.firstChild !== null && mario.popup.firstChild !== undefined) 

			mario.camera.init();

			setTimeout(function()
					{

						var cameraView=mario.camera.createVideoView();
						cameraView.autoplay=true;
						mario.popup.id="marioViewPopup";
						mario.popup.appendChild(cameraView);
						mario.viewSpace.appendChild(mario.popup);
						mario.tools.cameraView=cameraView;
						cameraView.src=mario.camera.videoSource;
					},3000);

		}

		else {
		}

	}
	else if (data.type =="takePhoto")
	{

		if (mario.isEmpty(mario.tools.cameraView))
		{
			console.log("error camera view should be aded");
		}

		else {

			var shot=mario.camera.takePhoto();
			var shotFrame=mario.createDomElement('img',['id','shotFrame'],['src',shot]);
			var link = document.createElement('a');
			link.href = shot;
			link.download = 'mario_image.png';
			link.click();


		}

	}


	else if (data.type =="getTmp")
	{
		mario.currentOutput=5;
		mario.currentOutputString='Tmp';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);


	}
	else if (data.type =="rForward")
	{
		mario.currentOutput=18;
		mario.currentOutputString='rForward';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);


	}
	else if (data.type =="rBackward")
	{
		mario.currentOutput=19;
		mario.currentOutputString='rBackward';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);


	}
	else if (data.type =="rLeft")
	{
		mario.currentOutput=21;
		mario.currentOutputString='rLeft';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);


	}
	else if (data.type =="rRight")
	{
		mario.currentOutput=20;
		mario.currentOutputString='rRight';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);


	}
	else if (data.type =="rHookUp")
	{
		mario.currentOutput=22;
		mario.currentOutputString='rHookUp';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);


	}
	else if (data.type =="rHookDown")
	{
		mario.currentOutput=23;
		mario.currentOutputString='rHookDown';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);


	}

	else if (data.type =="getIr")
	{
		mario.currentOutput=5;
		mario.currentOutputString='Ir';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);


	}
	else if (data.type =="getRes")
	{
		mario.currentOutput=9;
		mario.currentOutputString='Res';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

	}
	else if (data.type =="getMot")
	{
		mario.currentOutput=9;
		mario.currentOutputString='Res';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

	}
	else if (data.type =="getLig")
	{
		mario.currentOutput=13;
		mario.currentOutputString='Lig';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

	}
	else if (data.type =="getSou")
	{
		mario.currentOutput=12;
		mario.currentOutputString='Sou';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

    }
	else if (data.type =="getMag")
	{
		mario.currentOutput=24;
		mario.currentOutputString='Mag';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

    }
	else if (data.type =="getHum")
	{
		mario.currentOutput=25;
		mario.currentOutputString='Hum';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

    }
	else if (data.type =="getDis")
	{
		mario.currentOutput=26;
		mario.currentOutputString='Dis';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

    }
	else if (data.type =="getVol")
	{
		mario.currentOutput=6;
		mario.currentOutputString='Vol';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);
	}

	else if (data.type =="Buz")
	{
		mario.currentOutput=8;
		mario.serial.serialFun.send(mario.currentOutput,null);
	}

	else if (data.type =="PWM")
	{
		mario.currentOutput=10;
		mario.serial.serialFun.send(mario.currentOutput,null);
		mario.currentOutput=data.value;
		mario.serial.serialFun.send(mario.currentOutput,null);
		mario.currentOutput=03;
		mario.serial.serialFun.send(mario.currentOutput,null);
		mario.currentOutput=224;
		mario.serial.serialFun.send(mario.currentOutput,null);
	}
	else if (data.type =="vib")
	{
		mario.currentOutput=27;
		mario.serial.serialFun.send(mario.currentOutput,null);
	}
	else if (data.type =="sendDataSerial")
	{
		mario.currentOutput=8;
	//	mario.serial.serialFun.numberOfRead= parseInt(data.value,10);
		 mario.serial.serialFun.send(parseInt(data.value),function(){});
	}
	


	else if (data.type =="led")
	{
		if (data.value)
		{
			mario.currentOutput=14;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

		}
		else {
			mario.currentOutput=15;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

		}
	}

	else if (data.type =="push")
	{
		mario.currentOutput=0;
		mario.serial.serialFun.startReading();
		mario.dataInf=data.inf;
		addEventListener('dataCompleted',function(){
			mario.currentOutput=0;
			mario.serial.serialFun.startReading();


			if(data.inf==0)
		{
			mario.serial.serialFun.clearEvents();
			mario.dataInf=data.inf;
		}

		setTimeout(function(){mario.sendSonData({'type': 'push','value':mario.dataValueComplete});},100);

		});


	}

	else if(data.type == "speak" )
	{
		//debugger;
	var audio = new Audio();
	audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=en&q='+data.value+'';
	audio.play();
	}
	else if(data.type == "slider" )
	{
		mainContainer=document.getElementById('mainContainer');
		var slider= mario.tools.sliderShow.getView();
		mario.popup.id="sliderPopup";
		mario.popup.appendChild(slider);
		mainContainer.appendChild(mario.popup);

		mario.tools.sliderShow.slideShowNext();
		setTimeout(function(){ mario.tools.sliderShow.slideShowNext(); },100);
		setTimeout(function(){ mario.tools.sliderShow.slideShowNext(); },1100);
		setTimeout(function(){ mario.tools.sliderShow.slideShowNext(); },2000);
		setTimeout(function(){ mario.tools.sliderShow.slideShowNext(); },4000);
		setTimeout(function(){ mario.tools.sliderShow.slideShowNext(); },6100);


		/*	console.log("function temprature is running ") ;
			mario.serial.serialFun.startReading();
			setTimeout(function(){
			mario.serial.serialFun.stopReading();
			},300);
			*/
	}


}


