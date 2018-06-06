window.onload=function(){


var sliderShow={

currentSlide:0,
counter:0,
allLoaded:0,
image0:null,
image1:null,
image2:null,
image3:null,
images:[],
myCanvas:null,
ctx:{},
maxNum:0,

init:function(){
var loaded = 0, numOfImages = 4;
this.myCanvas = document.createElement('canvas');
this.myCanvas.id     = "myCanvas";
this.myCanvas.width  = 400;
this.myCanvas.height = 200;
this.myCanvas.style.position = "absolute";
this.myCanvas.style.border   = "1px solid";
this.myCanvas.style.zIndex   = 8;
      this.ctx = this.myCanvas.getContext('2d');

//first part of chain, invoke async load
this.image0 = document.createElement('img'); //this will work in new Chrome
this.image1 = document.createElement('img'); //instead of new Image
this.image2 = document.createElement('img');
this.image3 = document.createElement('img');


//show if any error occurs
this.image0.onerror = this.image1.onerror = 
this.image2.onerror = this.image3.onerror = function(e) {
   console.log(e.toString());
}

//invoke async loading... you can put these four into your
//window.onload if you want to
this.image0.src = "../../../media/images/tools/slider/img0.jpg";
this.image1.src = "../../../media/images/tools/slider/img1.jpg";
this.image2.src = "../../../media/images/tools/slider/img2.jpg";
this.image3.src = "../../../media/images/tools/slider/img3.jpg";

//common event handler when images has loaded with counter
//to know that all images has loaded
var me =this;
this.image0.onload = this.image1.onload = this.image2.onload = this.image3.onload = function(e) {
    me.allLoaded++;
    if (me.allLoaded === numOfImages)
        {
		//all images are loaded 
	    //draw();   // <-- second part of chain, invoke loop

		me.images = new Array(me.image0, me.image1, me.image2, me.image3),
        //counter = 0,
        me.maxNum = me.images.length - 1;


		}
	
}
},
slideShowNext:function()
{

 if (this.currentSlide == this.allLoaded-1)
{
this.currentSlide=0;
}
else {this.currentSlide++;}

    this.drawImage(); //START the loop

},

slideShowPrev:function()
{
if (this.currentSlide==0)
{
this.currentSlide=this.allLoaded-1;
}
else {this.currentSlide--;}
    this.drawImage(); //START the loop

},
drawImage:function(){
        this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
        this.ctx.drawImage(this.images[this.currentSlide], 0, 0);
},
getView:function(){
return this.myCanvas;
}


}
sliderShow.init();
mario.tools.sliderShow=sliderShow;
};
