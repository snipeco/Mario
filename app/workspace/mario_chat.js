var mario_chat={
chat:null,
type:{
	success:"alert-success",
	info:"alert-info",
	warning:"alert-warning",
	danger:"alert-danger",
},

init:function(){
	var wrapper=mario.createDomElement('div',['id','marioChat'],['class','']);
	 wrapper.innerHTML= '<a href="#" class="alert-link"></a>';
	 this.chat=wrapper;
	return  wrapper;
},

showFor:function(time,text,type)
{
mario_chat.chat.textContent ="";
mario_chat.chat.textContent =text;
mario_chat.chat.className="";
mario_chat.chat.className="alert "+type+"";
$('#marioChat').show('slow');
setTimeout(function(){
$('#marioChat').hide('slow');
},time);

},


show:function(time,text,type)
{
mario_chat.chat.textContent ="";
mario_chat.chat.textContent =text;
mario_chat.chat.className="";
mario_chat.chat.className="alert "+type+"";
},

hide:function(time)
{
$('#marioChat').hide('slow');
mario_chat.chat.textContent ="";
mario_chat.chat.className="";
}
}


