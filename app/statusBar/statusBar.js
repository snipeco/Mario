var mario_statusBar={
application_name:"Mario Lab",

connectionStatus:{},
changeConnectionStatus:function(status)
{

	if (status=="off")
	{
		//load disconnected photo
	this.connectionStatus['src']='media/images/disconnected.png';


	}
	else if ( status=="on")
	{
		//load connected photo
	this.connectionStatus['src']='media/images/connected.png';


	}


},

buildStatusBar:function(){

var select=' <select id="connType"><optgroup label="Connection Type"><option value="s">Serial</option><option value="b">Bluetooth</option></optgroup></select>';

var selectDiv=mario.createDomElement('div',['class',' navbar navbar-inverse navbar-fixed-top '],['id','selectConnInt']);
selectDiv.innerHTML=select;


content=mario.createDomElement('div',['class',' navbar navbar-inverse navbar-fixed-top '],['id','marioStatusBar']);

content1=mario.createDomElement('div',['class','navbar-inner']);
content2=mario.createDomElement('div',['class',' container ']);

linkBar=mario.createDomElement('a',['class',' btn btn-navbar '],['data-toggle','collapse'],['data-target','.nav-collapse'] );

span1=mario.createDomElement('span',['class','icon-bar']);
span2=mario.createDomElement('span',['class','icon-bar']);
span3=mario.createDomElement('span',['class','icon-bar']);
linkBar.appendChild(span1);
linkBar.appendChild(span2);
linkBar.appendChild(span3);


//build connection status icon
var connectionStatus=mario.createDomElement('img',['src','media/images/disconnected.png']);


linkAppName=mario.createDomElement('a',['class','brand']);
linkAppName.innerHTML=this.application_name;

content22=mario.createDomElement('div',['class',' nav-collapse  collapse pull-right']);
content23=mario.createDomElement('div',['class',' nav-collapse  collapse pull-right']);

unorderList=mario.createDomElement('ul',['class','nav']);

list1=mario.createDomElement('li');
list1Link=mario.createDomElement('a',['href','#forgot'],['data-toggle','modal']);
list1Icon='<i class="icon-user icon-white"></i>';
list1Link.innerHTML=list1Icon + 'Forgot Password';

list1.appendChild(list1Link);


list2=mario.createDomElement('li',['class','divider-vertical']);

list3=mario.createDomElement('li');
list3Link=mario.createDomElement('a',['href','#contact'],['data-toggle','modal']);
list3Icon='<i class="icon-envelope icon-white"></i>';
list3Link.innerHTML=list3Icon + 'contact us';

list3.appendChild(list3Link);

list4=mario.createDomElement('li',['class','divider-vertical']);


unorderList.appendChild(list1);
unorderList.appendChild(list2);
unorderList.appendChild(list3);
unorderList.appendChild(list4);


content23.appendChild(selectDiv);
content2.appendChild(linkBar);
content22.appendChild(unorderList);

content2.appendChild(content22);
content2.appendChild(connectionStatus);
content2.appendChild(content23);
content1.appendChild(linkAppName);
content1.appendChild(content2);
content.appendChild(content1);

this.connectionStatus=connectionStatus;

return content;

}

};

/*
<!-- Navigation Bar -->
<div class="navbar navbar-inverse navbar-fixed-top">
  <div class="navbar-inner">
    <div class="container">
        <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
 
            </a>
    <a href="#" class="brand">Application Name</a>
 
    <div class="nav-collapse collapse pull-right">
        <ul class="nav">
            <li><a href="#forgot" data-toggle="modal"><i class="icon-user icon-white"></i> Forgot Password</a></li>
            <li class="divider-vertical"></li>
            <li><a href="#contact" data-toggle="modal"><i class="icon-envelope icon-white"></i> Contact Us</a></li>
            <li class="divider-vertical"></li>
 
        </ul>
    </div>
 
    </div>
  </div>
</div>
<!-- Navigation Ends -->
*/
