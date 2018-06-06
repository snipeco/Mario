var mario_program_space={
init:function(){
var workSpaceContainer=mario.createDomElement('div',['id','marioProgramSpace'],['class','container well span6']);
workSpaceContainer.appendChild(mario_chat.init());
workSpaceContainer.appendChild(mario_workspace_itemBar.init());
var workSpace=mario.createDomElement('iframe');
workSpace.height="90%";
workSpace.width="100%";
workSpaceContainer.appendChild(workSpace);

workSpaceContainer.workSpace=workSpace;
return workSpaceContainer;
}

}


