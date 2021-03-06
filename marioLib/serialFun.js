//toDo save more info in the deviceInfo like the path
//check if data is not defined in some places

var serialFun={

    found:0,
	selectedPort:null,
	deviceInfo:{},

	serial:mario.serial,

	numberOfRead:0,
	intervalId:null,

	searchForMario:function(){

		var me=this;

		me.serial.receiveCallBack=me.checkDeviceExist;

		//turn on receive event

		//device was disconeccted
		chrome.serial.onReceiveError.addListener(function(){

		console.log('deviceWasDisconnectd');

		mario_workspace_itemBar.play.disabled=true;
		mario.connectoinStatus=false;
		mario_statusBar.changeConnectionStatus('off');

		me.intervalId=setInterval(function(){
		me.serial.getDevices();
		},5000);

		});

		me.serial.addReceiveListener(me.serial.receiveCallBack);

		addEventListener('deviceFound',me.deviceFound);
		addEventListener('connectTerm',me.connectTermHandle);
		addEventListener('getDevicesTerm',me.getDevicesTerm);
		me.serial.getDevices();

	},

	deviceFound:function()
	{

	},

	connectCallBack:function(info){

		if (info !== undefined)
		{
			mario.serial.connId=info.connectionId;
			mario.serial.sendData(mario.identity);
		}

	},
	connectTermHandle:function(me){

	},


	send:function(val,callBackfn){
		//send with multiple configuration

		var me=this;
		me.serial.receiveCallBack=callBackfn;
		console.log("valuesent is : "+val);
		me.serial.sendData(val);
	},

	receiveProcessing:function(data){
		if(data === undefined || data.data === undefined)
		{
			console.log("ERROR:data is not defined please check if the sensonr is connected");
		}
		else{
			console.log(mario.arr2str(data.data));
		}
	},

	checkDeviceExist:function(info)
	{
		if (mario.arr2str(info.data).indexOf('#')!==-1 || mario.arr2str(info.data).indexOf('!')!==-1 || mario.arr2str(info.data).indexOf(')')!==-1 || mario.arr2str(info.data).indexOf('@')!==-1 || mario.arr2str(info.data).indexOf('$')!==-1 )
		{
			console.log('external input ' +mario.arr2str(info.data) );
		}
		else
		{




		//to do check if device exist here
		//console.log('device data back her');
		console.log(info);
		console.log(mario.arr2str(info.data));
		if ( mario.arr2str(info.data) == mario.identity )
		{
			mario.connectionId=info.connectionId;
			clearInterval(this.serialFun.intervalId);
			mario_workspace_itemBar.play.disabled=false;
			mario_statusBar.changeConnectionStatus('on')

		/*	var audio = new Audio();
			audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=en&q=Welcome Maysara, I am My ram Hope you like me .';
			audio.play();
			mario_chat.showFor(4000," Welcome Maysara, I am Mayram Hope you like me " , mario_chat.type.success);
            */

		}

		}

	},

	dataCompleted:function(info)
	{
		if (mario.arr2str(info.data).indexOf('#')!==-1 || mario.arr2str(info.data).indexOf('!')!==-1 || mario.arr2str(info.data).indexOf(')')!==-1 || mario.arr2str(info.data).indexOf('@')!==-1 || mario.arr2str(info.data).indexOf('$')!==-1 )
		{
			console.log('external input ' +mario.arr2str(info.data) );
		}

	 //for robot operation
        else if (mario.arr2str(info.data) == '&' )
            {

			console.log(mario.completedData);
			mario.sendSonData({'type': mario.currentOutputString,'value':mario.completedData});

			//reset the data
			mario.completedData="";
			info.data="";

            }
	else if(mario.arr2str(info.data).indexOf(';')==-1)
		{
			//if its exist
			mario.completedData=mario.completedData+mario.arr2str(info.data);
		}

		else {
			//console.log('this is the completed data');
			console.log(mario.completedData);

            //do some process processing on completed Data here

            mario.checkTypeProcessing();

			mario.sendSonData({'type': mario.currentOutputString,'value':mario.completedData});
			//reset the data
			mario.completedData="";
			info.data="";
		}


	},

    getDevicesTerm:function()
           {
        var me=serialFun;
			//console.log(me.serial.devices);

			for(var i in me.serial.devices)
		{
			//send 2 to all founded devices
			//and set device as the target device ( mario )
            //

			//send 2 to all founded devices
			//and set device as the target device ( mario )
			if ( me.serial.devices[i] !== undefined  && me.found !==1 )
		{
			me.found=1;
			console.log('found');
			me.serial.devicePath=me.serial.devices[i].path;
			me.serial.connect(me.connectCallBack) ;
		}


		}
		}

};
