/*@author Ram Zaher mere 
 *@email rm.mere@gmail.com
 */

/*info: this library will provide you with easy camera API 
 * requires:audio/video permsition
 */

camLib={


	photo:{},
	videoSource:{},
	videoView:{},

	userMedia:{},
	init:function(){

		navigator.getUserMedia ||
			(navigator.getUserMedia = navigator.mozGetUserMedia ||
			 navigator.webkitGetUserMedia || navigator.msGetUserMedia);

		this.userMedia=navigator.getUserMedia;


		if (navigator.getUserMedia) {
			// do something
		} else {
			console.log('getUserMedia is not supported in this browser.');
		}


		var me =this;
		navigator.getUserMedia({
			video: true,
			audio: true
		}, this.onSuccess, this.onError);




	},

	takePhoto:function(){
	var video=this.videoView;
        var photo = mario.createDomElement('canvas',['id','camPhoto']);
        context = photo.getContext('2d');
        photo.width = video.clientWidth;
        photo.height = video.clientHeight;
        context.drawImage(video, 0, 0, photo.width-100, photo.height-100);
	return photo.toDataURL();

	},

	savePhoto:function(){

	},

	createVideoView:function(){
	var videoView=mario.createDomElement('video',['id','webCam']);
	this.videoView=videoView;
	return videoView;
	},

	onSuccess:function(stream){


   	 var videoSource;
        if (window.webkitURL) {
           videoSource = window.webkitURL.createObjectURL(stream);
        } else {
            videoSource = stream;
        }
	mario.camera.videoSource=videoSource;

	},
	onError:function(){

		console.log('fail');

	}






}
