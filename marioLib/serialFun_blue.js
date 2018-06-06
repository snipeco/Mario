//toDo save more info in the deviceInfo like the path
//check if data is not defined in some places

var serialFun={

	selectedPort:null,
	deviceInfo:{},

	serial:BluetoothAPIs,

	numberOfRead:0,
	intervalId:null,

	searchForMario:function(){

        var me=this;
chrome.bluetooth.getDevices(function(devices) {
  for (var i = 0; i < devices.length; i++) {
    if (devices[i].name == 'Mario') {
        console.log('device has been found');
        me.deviceInfo=devices[i];
        //connect
        BluetoothAPIs.connect(me.deviceInfo,me.connectCallBack);

  	chrome.bluetoothSocket.onReceive.addListener(me.dataCompleted);

    setTimeout(function(){
        me.send(2);
		mario_statusBar.changeConnectionStatus('on');

    },6000);



    }
  }
});
	},

	deviceFound:function()
	{

	},

	connectCallBack:function(receiveInfo){
        var me=this;

	if (receiveInfo !== undefined )
            if (chrome.runtime.lastError) {
                console.log("Connection failed: " + chrome.runtime.lastError.message);
            } else {
                //cnnected
                console.log('Connected!');


                //add the receive listnere since it is connected
           chrome.bluetoothSocket.onReceive.addListener(me.dataCompleted);
                //send 2 to buzzer
			mario.serial.sendData(mario.identity);
                   
            /*  function(receiveInfo) {
  if (receiveInfo.socketId != socketId
    return;

  // receiveInfo.data is an ArrayBuffer.
}
                    );
                    */
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
			mario_statusBar.changeConnectionStatus('on');
				
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
			mario.sendSonData({'type': mario.currentOutputString,'value':mario.completedData});
			//reset the data 
			mario.completedData="";
			info.data="";
		}


	}

}




