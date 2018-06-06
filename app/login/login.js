var mario_login={
	mailField:null,
	passwordField:null,
buildLoginPage:function(){

var content=mario.createDomElement("div",["class"," container login"],["id","marioLogin"]);

var content2=mario.createDomElement('div',['class','row']);
var content3=mario.createDomElement('div',['class','center span4 well']);
var legend=document.createElement('legend');
legend.innerHTML="Please Sign In";

var loginForm=mario.createDomElement('form',['method','POST'],['action',''],['accept-charset','UTF-8']);

this.mailField=mario.createDomElement('input',['type','text'],['id','username'],['class','span4'],['name','username'],['placeholder','username']);

this.passwordField=mario.createDomElement('input',['type','password'],['id','password'],['class','span4'],['name','password'],['placeholder','password']);

var submitButton=mario.createDomElement('button',['type','submit'],['id','mario_form_submitButton'],['class',' btn btn-primary btn-block ']);
submitButton.innerHTML="Sign in";

var connectionType=mario.createDomElement('select',['id','connType']);
var optGroup=mario.createDomElement('optgroup',['label','Connection Type']);
var option2=mario.createDomElement('option',['value','s']);
option2.innerHTML="Serial";
var option1=mario.createDomElement('option',['value','b']);
option1.innerHTML="Bluetooth";

optGroup.appendChild(option2);
optGroup.appendChild(option1);
connectionType.appendChild(optGroup);


/*	<select>
  <optgroup label="Connection Type">
    <option value="volvo">Serial</option>
    <option value="saab">Bluetooth</option>
  </optgroup>
 
</select>
*/

loginForm.appendChild(this.mailField);
loginForm.appendChild(this.passwordField);
loginForm.appendChild(connectionType);
loginForm.appendChild(submitButton);
content3.appendChild(legend);
content3.appendChild(loginForm);
content2.appendChild(content3);
content.appendChild(content2);

return content;


}
};

