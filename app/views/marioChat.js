
var views_mario_chat={

type:{
	success:"alert-success",
	info:"alert-info",
	warning:"alert-warning",
	danger:"alert-danger",

},

init:function(){
var workSpaceContainer=mario.createDomElement('div',['id','marioWorkSpace'],['class','container well span8']);
workSpaceContainer.appendChild(mario_workspace_itemBar.init());
var workSpace=mario.createDomElement('iframe');
workSpace.height="90%";
workSpace.width="100%";
workSpaceContainer.appendChild(workSpace);

workSpaceContainer.workSpace=workSpace;
return workSpaceContainer;
}

}


