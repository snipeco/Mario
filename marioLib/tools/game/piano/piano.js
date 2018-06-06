

var marioPiano={

 str:'<div id="p-wrapper"> <ul id="piano"> <li><div class="anchor" id="fing1"></div></li> <li><div class="anchor" id="fing2"></div><span></span></li><li><div class="anchor" id="fing3"><span></span></div></li> <li><div class="anchor" id="fing4"></div></li><li><div class="anchor" id="fing5"></div><span></span></li><li><div class="anchor" id="fing6" ></div><span></span></li><span></span><li><span></span><div class="anchor" id="fing7"></div></li>',


    createView:function(){
        var keys=document.createElement('div');
        keys.id="marioPiano";
        //make the left right up and down arrow div

        keys.innerHTML=this.str;

        return keys;
    },
}
