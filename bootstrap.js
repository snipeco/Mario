//define the basic object
var mario={};
mario={
	//connection type : b=> bluetooth ,s=> serial
	connType:'b',
	//mario connection status (connected/disconnected)
	connectionStatus:false,
	//mario identity,a code mario receive and respond that I am exist
	identity:2,
	connectionId:null,
	//loginPage
	loginPage:null,
	statusBar:null,
	workSpace:null,
	workSpaceXML:null,
	programSpace:null,
	//make sure everything is loaded before starting
	filesLoaded:0,
	dataBulk:null,
	devicePort:0,
	//father is the application
	father:{},
	//son is the iframe
	son:{},
	//code in the workspace
	workSpaceCode:null,

	//file system lib
	fileSystem:{},


	//mario reload status indicate if mario is in state of reloading ( so no device was disconnected)

	reloadStatus:0,

	blocky:{},
	serial:{},

	popup:{},

	tools:{
		voltmeter:{},
		snakeGame:{},
		temprature:{},
		sliderShow:{},
		marioView:{},
		marioPiano:{},
		cameraView:{},
		robotArrows:{}
	},
	//check t he infinity loop
	dataInf:0,

	completedData:"",
	currentSensor:0,
	currentOutput:0,

	hasOwnProperty : Object.prototype.hasOwnProperty,

	//define helper function
	// fire event that  is used to fireevent with parameter
	fireEvent:function(name, target, param) {
		//Ready: create a generic event
		var evt = document.createEvent("Events")
			//Aim: initialize it to be the event we want
			evt.initEvent(name, true, true); //true for can bubble, true for cancelable
		evt.param = param;
		//FIRE!
		target.dispatchEvent(evt);
	},

	str2ab:function(str){
			var encodedString = unescape(encodeURIComponent(str));
			var bytes = new Uint8Array(encodedString.length);
			for (var i = 0; i < encodedString.length; ++i) {
				bytes[i] = encodedString.charCodeAt(i);
			}
			return bytes.buffer;



	},

	arr2str:function(buffer) {
		return this.bin2str(String.fromCharCode.apply(null, Array.prototype.slice.apply(new Uint8Array(buffer))));
	},
	bin2str:function (binary) {
		var error;
		try {
			return decodeURIComponent(escape(binary));
		} catch (_error) {
			error = _error;
			if (error instanceof URIError) {
				return binary;
			} else {
				throw error;
			}
		}
	},

    /*
     * @info : function to clear the view space
     */
    clearView:function(node){
while (node.firstChild) {
    node.removeChild(node.firstChild);
}


    },



	createDomElement:function(){

		for (var i = 0; i < arguments.length; i++) {
			arguments[i]
				var content;
			if(i==0) //then this is dom it self
			{
				content=document.createElement(arguments[0]);
			}

			else {
				content.setAttribute([arguments[i][0]],arguments[i][1]);

			}
		}

		return content;
	},



	loadFile:function(src, callback) {
		var script = document.createElement('script'),
		loaded;
		script.setAttribute('src', src);
		if (callback) {
			script.onreadystatechange = script.onload = function() {
				if (!loaded) {
					callback();
				}
				loaded = true;
			};
		}
		document.getElementsByTagName('head')[0].appendChild(script);
	},

	sendSonData:function(data){
		mario.son.contentWindow.postMessage(data, '*');
	},

	isEmpty:function(obj)
	{


		// null and undefined are "empty"
		if (obj == null) return true;

		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length && obj.length > 0)    return false;
		if (obj.length === 0)  return true;

		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and toValue enumeration bugs in IE < 9
		for (var key in obj) {
			if (this.hasOwnProperty.call(obj, key)) return false;
		}

		return true;

	},
	//End of helper functions definition

	loadLoginPage:function()
	{

		mario.loadFile('app/login/login.js',function(){
		mario.fireEvent("checkLoaded",document);
			});

	setTimeout(function(){
		var mainContent=document.getElementById('mainContainer');
		this.loginPage=mario_login.buildLoginPage();
		mainContent.appendChild(this.loginPage);


	       var loginSubmit=document.getElementById('mario_form_submitButton');


		loginSubmit.addEventListener('click',function(){

			mario.connType=document.getElementById('connType').value;

			var loginPage=document.getElementById("marioLogin");
			jQuery(loginPage).hide(1000);

			init();




		});







	},300);


	},
	loadStatusBar:function()
	{

		var mainContent=document.getElementById('mainContainer');
		this.statusBar=mario_statusBar.buildStatusBar();
		mainContent.appendChild(this.statusBar);


	},

	loadWorkSpace:function(){
		var mainContent=document.getElementById('mainContainer');
		this.programSpace=mario_program_space.init();
		this.programSpace.workSpace.src="app/marioWorkSpace.html";
		this.son=this.programSpace.workSpace;
		this.viewSpace=mario_viewspace.init();

		this.workSpace= mario_work_space.init(this.programSpace,this.viewSpace);



		mainContent.appendChild(this.workSpace);
	},

    /*
     *@info do some processing here depend on type
     *e.g if for type 9 ( resistor ) we apply voltage divider
     *
     */

    checkTypeProcessing:function(){

        switch(mario.currentOutput)
        {
            case 9://then this is resistor
                {
                var input=parseInt(mario.completedData);
                if(input < 3 )
                    mario.completedData="0000";
                else {
                var output;
                output=(5*10000/((input*5)/1023))-10000;
                mario.completedData=output.toString();
                    }

                break;
            }

        }


    }


}

function init()
{

	//create hte mario popup window
	mario.popup=document.createElement('div');
	mario.popup.draggable="true";

		/** draaag */
		function drag_start(event) {
			var style = window.getComputedStyle(event.target, null);
			event.dataTransfer.setData("text/plain",
					(parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
		}
	function drag_over(event) {
		event.preventDefault();
		return false;
	}
	function drop(event) {
		var offset = event.dataTransfer.getData("text/plain").split(',');
		var dm = mario.popup;
		dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
		dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
		event.preventDefault();
		return false;
	}
	var dm =  mario.popup;
	dm.addEventListener('dragstart',drag_start,false);
	document.body.addEventListener('dragover',drag_over,false);
	document.body.addEventListener('drop',drop,false);


	if(mario.connType=='b')
	{
	mario.loadFile('lib/BluetoothAPIs.js',function(){
		mario.serial=BluetoothAPIs;
		mario.fireEvent("checkLoaded",document);
	});
	}
	else if(mario.connType=='s')
	{
	mario.loadFile('lib/Serial_Libram.js',function(){
		mario.serial=Serial_Libram;
		mario.fireEvent("checkLoaded",document);

	});
	}

	mario.loadFile('lib/async/lib/async.js',function(){
		//mario.async=async;
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('lib/camLib.js',function(){
		mario.camera=camLib;
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('lib/bootbox.min.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('lib/canvasjs.min.js',function(){
		mario.fireEvent("checkLoaded",document);
	});



	if(mario.connType=='b')
	{
	mario.loadFile('marioLib/serialFun_blue.js',function(){
		mario.fireEvent("checkLoaded",document);
	});
	}
	else if(mario.connType=='s')
	{
	mario.loadFile('marioLib/serialFun.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	}

	mario.loadFile('marioLib/file.js',function(){
		mario.fireEvent("checkLoaded",document);
		mario.fileSystem=mario_file;
	});



	mario.loadFile('app/fatherCommAPI.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('marioLib/tools/voltmeter/voltmeter.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('marioLib/tools/game/snake/snake.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('marioLib/tools/game/piano/piano.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('marioLib/tools/robotArrows/robotArrows.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('marioLib/tools/game/snake/snake.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('marioLib/tools/temprature/temprature.js',function(){
		mario.fireEvent("checkLoaded",document);
	});
	mario.loadFile('marioLib/tools/marioView/marioView.js',function(){
		mario.fireEvent("checkLoaded",document);
	});


	mario.loadFile('marioLib/tools/slider/slider.js',function(){
		mario.fireEvent("checkLoaded",document);
	});


	mario.loadFile('app/login/login.js',function(){
		mario.fireEvent("checkLoaded",document);
	});


	mario.loadFile('app/statusBar/statusBar.js',function(){
		mario.fireEvent("checkLoaded",document);
	});


	//for work space loading files
	mario.loadFile('app/workspace/itemBar.js',function(){ mario.fireEvent("checkLoaded",document); });
	mario.loadFile('app/workspace/mario_chat.js',function(){ mario.fireEvent("checkLoaded",document); });

	mario.loadFile('app/workspace/view_space.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	mario.loadFile('app/workspace/workspace.js',function(){
		mario.fireEvent("checkLoaded",document);
	});
	mario.loadFile('app/workspace/program_space.js',function(){ mario.fireEvent("checkLoaded",document); });

	//end loading work space files

mario.loadFile('../../../lib/SegmentDisplay/segment-display.js',function(){
		mario.fireEvent("checkLoaded",document);
	});

	//check if everything is loaded  depends how much of library there
	window.addEventListener('checkLoaded',function()
			{
				mario.filesLoaded++;
				//console.log(mario.filesLoaded);
				if (mario.filesLoaded == 23)
	{

		mario.loadStatusBar();
			/*load the mario workspace*/
			mario.loadWorkSpace();
			//get the serialFun to serial.
			mario.serial.serialFun=serialFun;

			mario.son.onload=function(){
				mario.sendSonData({value:'hiSon'});
				mario.fireEvent("sonLoaded",document);
			}


	}
			}
	);


	//last step till now ! check if the son is loaded
	window.addEventListener('sonLoaded',function()
			{
				// if the iFrame(son) are in loaded status
				if (mario.reloadStatus!=1)
				startProject();
			});
}



function startProject(){
	//console.log('start search');
	//mario.serial.serialFun.valueToSend='2';
	serialFun.searchForMario();

	mario_chat.hide();
    //just for showing

	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" )
            {
		mario.currentOutput=31;
		mario.currentOutputString='rRight';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);
            }
		else if(key == "40")
            {
		mario.currentOutput=30;
		mario.currentOutputString='rBackward';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

            }
		else if(key == "39")
            {
		mario.currentOutput=32;
		mario.currentOutputString='rLeft';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

            }
		else if(key == "38")
            {
		mario.currentOutput=29;
		mario.currentOutputString='rForward';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

            }
		else if(key == "65")
            {
		mario.currentOutput=23;
		mario.currentOutputString='hookDown';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

            }
		else if(key == "81")
            {
		mario.currentOutput=22;
		mario.currentOutputString='hookUp';
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

            }
		//The snake is now keyboard controllable
	});
	$(document).keyup(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" )
            {
		mario.currentOutput=33;
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);
            }
		else if(key == "38")
            {
		mario.currentOutput=33;
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

            }
		else if(key == "39")
            {
		mario.currentOutput=33;
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);

            }
		else if(key == "40")
            {
		mario.currentOutput=33;
		var callBack=mario.serial.serialFun.dataCompleted;
		mario.serial.serialFun.send(mario.currentOutput,callBack);
            }
		//The snake is now keyboard controllable
	});

    document.getElementById('robotUpKey').addEventListener('mousedown',function(){
		mario.currentOutput=29;
		mario.currentOutputString='rForward';
		var callBack=serialFun.dataCompleted;
	serialFun.send(mario.currentOutput,callBack);
    });


    document.getElementById('robotDownKey').addEventListener('mousedown',function(){
		mario.currentOutput=30;
		mario.currentOutputString='rBackward';
		var callBack=serialFun.dataCompleted;
		serialFun.send(mario.currentOutput,callBack);
    });
    document.getElementById('robotLeftKey').addEventListener('mousedown',function(){
		mario.currentOutput=31;
		mario.currentOutputString='rLeft';
		var callBack=serialFun.dataCompleted;
		serialFun.send(mario.currentOutput,callBack);
        });

    document.getElementById('robotRightKey').addEventListener('mousedown',function(){
		mario.currentOutput=32;
		mario.currentOutputString='rRight';
		var callBack=mario.serial.serialFun.dataCompleted;
		serialFun.send(mario.currentOutput,callBack);

        });
    document.getElementById('hookUp').addEventListener('mousedown',function(){

		mario.currentOutput=22;
		mario.currentOutputString='rHookUp';
		var callBack=serialFun.dataCompleted;
		serialFun.send(mario.currentOutput,callBack);

        });
    document.getElementById('hookDown').addEventListener('mousedown',function(){


		mario.currentOutput=23;
		mario.currentOutputString='rHookDown';
		var callBack=serialFun.dataCompleted;
		serialFun.send(mario.currentOutput,callBack);

        });

        //stop
    document.getElementById('robotUpKey').addEventListener('mouseup',function(){
		mario.currentOutput=33;
		mario.currentOutputString='rStop';
		var callBack=serialFun.dataCompleted;
     	serialFun.send(mario.currentOutput,callBack);
    });
    document.getElementById('robotDownKey').addEventListener('mouseup',function(){
		mario.currentOutput=33;
		mario.currentOutputString='rStop';
		var callBack=serialFun.dataCompleted;
		  serialFun.send(mario.currentOutput,callBack);
    });
    document.getElementById('robotLeftKey').addEventListener('mouseup',function(){
		mario.currentOutput=33;
		mario.currentOutputString='rStop';
		var callBack=serialFun.dataCompleted;
		serialFun.send(mario.currentOutput,callBack);
    });
    document.getElementById('robotRightKey').addEventListener('mouseup',function(){
		mario.currentOutput=33;
		mario.currentOutputString='rStop';
		var callBack=serialFun.dataCompleted;
		serialFun.send(mario.currentOutput,callBack);
    });
    //just for showing
    //
    //
    //add event listnere for chaning in connection
$("select#connType").change(function(value) {

if (this.value=="b")
    {


        //disconnect from serial
        chrome.serial.disconnect(Serial_Libram.connId,function(){
            console.log('Serial Disconnected');

	mario.loadFile('lib/BluetoothAPIs.js',function(){

        //remove listneer for serial
		removeEventListener('deviceFound',me.deviceFound);
		removeEventListener('connectTerm',me.connectTermHandle);
		removeEventListener('getDevicesTerm',me.getDevicesTerm);
        serialFun.serial.removeEventListener(serialFun.serial.receiveCallBack);

		mario.serial=BluetoothAPIs;
        serialFun.found=0;
	serialFun.searchForMario();
	});

        });

    }
    else
        {



	mario.loadFile('lib/Serial_Libram.js',function(){


        serialFun.found=0;
		mario.serial=Serial_Libram;

		removeEventListener('deviceFound',me.deviceFound);
		removeEventListener('connectTerm',me.connectTermHandle);
		removeEventListener('getDevicesTerm',me.getDevicesTerm);
        serialFun.serial.removeEventListener(serialFun.serial.receiveCallBack);


	    serialFun.searchForMario();
        setTimeout(function(){
        serialFun.serial=mario.serial;


        },300);
	});

        }


});


}

//load the login page then init

mario.loadLoginPage();
