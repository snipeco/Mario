mario_file={

	fileData:null,
	fileOpenOptions:
	{
		'type': 'openFile',
        	accepts:[{ mimeTypes: ['mario/*'], extensions: ['mario'], description:'mario' }],
        	acceptsAllTypes:false
	},
	fileSaveOptions:{

		'type': 'saveFile',
        	accepts:[{ mimeTypes: ['mario/*'], extensions: ['mario'], description:'mario' }],
		acceptsAllTypes:false,
		suggestedName: '.mario'

	},

	fileSystem:chrome.fileSystem,

	saveFile:function(){
	var me=this;
	chrome.fileSystem.chooseEntry(this.fileSaveOptions, function(state,info){


	var blob = new Blob([mario.workSpaceCode], {
	type: "text/plain;charset=utf-8;",
	});
	state.createWriter(function(writer) {

			//writer.onerror = errorHandler;
			writer.onwriteend = function(state){console.log("written")};
			writer.onwrite = function(state){console.log("write")};
			writer.onerror = function(e){debugger};


			// If we have data, write it to the file. Otherwise, just use the file we
			// loaded.

			if (blob) {
			writer.truncate(blob.size);
			me.waitIO(writer, function() {
			writer.seek(0);
			writer.write(blob);
			});

			} 




			})}); 

			}, 

			openFile:function(){
			var me=this;
			this.fileSystem.chooseEntry(this.fileOpenOptions, function(state,info){
			state.file(function(file){
			//debug
			//console.log(file)
			//debug;

			var reader = new FileReader();
			reader.onload = function(e) {
			me.fileData=e.target.result;
			if(me.fileData!=="")
			{
			mario.fireEvent('fileDataExtracted',document);
			}
			else {
			console.log('Notice:file is empty'); 
			}
			};

			reader.readAsText(file);


			})}) 




			}, 

	waitIO:function(writer, callback){
		// set a watchdog to avoid eventual locking:
		var start = Date.now();
		// wait for a few seconds
		var reentrant = function() {
			if (writer.readyState===writer.WRITING && Date.now()-start<4000) {
				setTimeout(reentrant, 100);
				return;
			}
			if (writer.readyState===writer.WRITING) {
				console.error("Write operation taking too long, aborting!"+
						" (current writer readyState is "+writer.readyState+")");
				writer.abort();
			} 
			else {
				callback();
			}
		};
		setTimeout(reentrant, 100);


	},

	onError:function(){
	}



	}
