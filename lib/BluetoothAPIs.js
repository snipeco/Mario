BluetoothAPIs={

    connId:'',

    connect:function(deviceInfo,callback){


        var me=this;


        chrome.bluetoothSocket.create(function(createInfo) {
            //save the socketId
            me.connId=createInfo.socketId;

	    //add list
	    //
            //connect

          chrome.bluetoothSocket.connect(createInfo.socketId,deviceInfo.address, deviceInfo.uuids[0], callback);

        });
    },

	 sendData:function(val){
        var me=this;
		var buff = new ArrayBuffer(1);
		var arr = new Uint8Array(buff);
		arr[0] = val;
		//debug
		console.log("valuesent is : "+val);
		//debug;
		//for bluetooth connection
	//	if(mario.connType=='b')
	//	buff=mario.str2ab(val);

chrome.bluetoothSocket.send(me.connId, buff, function(bytes_sent) {
  if (chrome.runtime.lastError) {
    console.log("Send failed: " + chrome.runtime.lastError.message);
  } else {
    console.log("Sent " + bytes_sent + " bytes")
  }
});
        
	},

}
