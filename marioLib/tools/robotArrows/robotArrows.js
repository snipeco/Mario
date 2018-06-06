
var robotArrows= {

    display:null,
    createView:function(){
        var keys=document.createElement('div');
        keys.id="robotArrows";
        //make the left right up and down arrow div

        keys.width=150;
        keys.height=150;

        var	upKey=mario.createDomElement('button',['id','robotUpKey']);
        upKey.height=50;
        upKey.width=50;
        var	downKey=mario.createDomElement('button',['id','robotDownKey']);
        downKey.height=50;
        downKey.width=50;
        var	rightKey=mario.createDomElement('button',['id','robotRightKey']);
        rightKey.height=50;
        rightKey.width=50;
        var	leftKey=mario.createDomElement('button',['id','robotLeftKey']);
        leftKey.height=50;
        leftKey.width=50;

        keys.appendChild(upKey);
        keys.appendChild(downKey);
        keys.appendChild(rightKey);
        keys.appendChild(leftKey);

        return keys;
    },
};
