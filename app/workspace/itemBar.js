mario_workspace_itemBar={

	bar:null,

	play:{},


	init:function(){


// on for testing and showing
var s = '<table><div id="robotArrows"><tr><td><button id="hookUp"></button></td><td><button id="robotUpKey"></button></td><td><button id="hookDown"></button></td><tr></div></tr><td><button id="robotLeftKey"></button></td><td><button id="robotDownKey"></button></td><td><button id="robotRightKey"></button></td><tr></table> '; 

var robotArrows = document.createElement('div');
robotArrows.innerHTML = s;
        


		var play=this.play;

		bar=mario.createDomElement('div',['id','marioWorkSpaceBar']);
		play=mario.createDomElement('button',['id','itemBarPlay'],['class','btn btn-primary  button itemBarButtons']);
		play.innerHTML="<i class='icon-play'></i>";
		play.innerHTML+="Play";

		play.addEventListener('click',function(){

			mario.sendSonData({value:'eval'});
		});


		var reload=mario.createDomElement('button',['id','itemBarSave'],['class','btn btn-info button itemBarButtons']);
		reload.innerHTML='<i class="icon-refresh"></i>';
		reload.innerHTML+="Reload";

		reload.addEventListener('click',function(){
			mario.reloadStatus=1;
			mario.son.src += ''	;

         		mario.clearView(mario.popup);
			mario.viewSpace.removeChild(mario.popup);
		        //clear all the object  in the tools
			for (var member in mario.tools) delete mario.tools[member];
		

			//this reload the whole app  no need body -_-
			//chrome.runtime.reload();
			
		});

		var stop=mario.createDomElement('button',['id','itemBarSave'],['class','btn btn-info button itemBarButtons']);
		stop.innerHTML='<i class="icon-stop"></i>';
		stop.innerHTML+="Stop";

		stop.addEventListener('click',function(){

		//get the wrokspace xml
			var value='getXML';
			var objData={value:value};
			mario.sendSonData(objData);

		addEventListener('getXML',function(){
			mario.reloadStatus=1;
			mario.son.src += ''	
		
		//send the work space back
			var value='loadXML';
			var code=mario.workSpaceXML;

			var objData={value:value,code:code};
			setTimeout(function(){mario.sendSonData(objData)},100);
			

		});
			
		});

		var save=mario.createDomElement('button',['id','itemBarSave'],['class','btn btn-info button itemBarButtons']);
		save.innerHTML='<i class="icon-share"></i>';
		save.innerHTML+="Share";

		var download=mario.createDomElement('button',['id','itemBarDownload'],['class','btn btn-warning button itemBarButtons']);
		download.innerHTML='<i class="icon-download"></i>';
		download.innerHTML+="Save";

		download.addEventListener('click',function(){
			var value='save';
			var objData={value:value};
			mario.sendSonData(objData);
		});
		addEventListener('saveFile',function(){
			mario.fileSystem.saveFile();

		});

		var upload=mario.createDomElement('button',['id','itemBarDownload'],['class','btn btn-danger button itemBarButtons']);
		upload.innerHTML='<i class="icon-upload"></i>';
		upload.innerHTML+="Open";

		addEventListener('fileDataExtracted',function(){
			var value='open';
			var code=mario.fileSystem.fileData;
			var objData={code:code,value:value};
			mario.sendSonData(objData);
		});
		upload.addEventListener('click',function(){

			mario.fileSystem.openFile();	

		});


		this.play=play;
		play.disabled=false;
		this.save=save;
		this.download=download;

		bar.appendChild(reload);
		bar.appendChild(upload);
		bar.appendChild(download);
		bar.appendChild(save);
		bar.appendChild(stop);
		bar.appendChild(play);
		bar.appendChild(robotArrows);
		return  bar;
	}


}
