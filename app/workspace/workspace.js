var mario_work_space={
init:function(programSpace,viewSpace){
var workSpaceContainer=mario.createDomElement('div',['id','marioWorkSpace'],['class','row-fluid']);
workSpaceContainer.appendChild(programSpace);
workSpaceContainer.appendChild(viewSpace);

return workSpaceContainer;
}

}


