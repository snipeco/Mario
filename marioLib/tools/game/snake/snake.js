	//Canvas stuff

var snakeGame= {


	canvas :null,
	ctx:null,
    h:null,
    w:null,
	
	//Lets save the cell width in a variable for easy control
	 cw :10,
	 d:null,
	 food:null,
	score:null,
    game_loop:null,
	
	//Lets create the snake now
	 snake_array:[], //an array of cells to make up the snake
	
     createView:function(){

        var me=this;
		var canvas=document.createElement("canvas");
		canvas.id="snakeGameCanvas";
		canvas.height=350;
		canvas.width=350;
        me.w=350;
        me.h=350;
	    me.ctx = canvas.getContext("2d");
        return canvas;

     },

	init:function()
	{
        var me=this;
		me.d = "right"; //default direction
        var d=me.d;
		me.createSnake();
		me.createFood(); //Now we can see the food particle
		//finally lets display the score
		me.score = 0;
        var game_loop=me.game_loop;
		
		//Lets move the snake now using a timer which will trigger the paint function
		//every 60ms
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		me.game_loop = setInterval(me.paint, 60);

	//Lets add the keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
		//The snake is now keyboard controllable
        snakeGame.d=d;
	});
	},
	
	createSnake:function()
	{
        var me=this;
		var length = 5; //Length of the snake
		me.snake_array = []; //Empty array to start with
		for(var i = length-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			me.snake_array.push({x: i, y:0});
		}
	},
	
	//Lets create the food now
	 createFood:function()
	{
        var me=this;
        var w=me.w;
        var h=me.h;
        var cw=me.cw;
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
		//This will create a cell with x/y between 0-44
		//Because there are 45(450/10) positions accross the rows and columns
	},
    
	//Lets paint the snake now
	paint:function ()
	{

        var me=snakeGame;
        var d=me.d;
        var ctx=me.ctx;
        var snake_array=me.snake_array;
        var w=me.w;
        var h=me.h;
		//To avoid the snake trail we need to paint the BG on every frame
		//Lets paint the canvas now
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		//The movement code for the snake to come here.
		//The logic is simple
		//Pop out the tail cell and place it infront of the head cell
		var nx = me.snake_array[0].x;
		var ny = me.snake_array[0].y;
		//These were the position of the head cell.
		//We will increment it to get the new head position
		//Lets add proper direction based movement now
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;
		
		//Lets add the game over clauses now
		//This will restart the game if the snake hits the wall
		//Lets add the code for body collision
		//Now if the head of the snake bumps into its body, the game will restart
		if(nx == -1 || nx == w/me.cw || ny == -1 || ny == h/me.cw || me.checkCollision(nx, ny, snake_array))
		{
            //here we need to send vibration command
		    mario.serial.serialFun.send(27,null);

			//restart game
			me.init();
			//Lets organize the code a bit now.
			return;
		}
		
		//Lets write the code to make the snake eat the food
		//The logic is simple
		//If the new head position matches with that of the food,
		//Create a new head instead of moving the tail
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			me.score++;
			//Create new food
			me.createFood();
		}
		else
		{
			var tail = snake_array.pop(); //pops out the last cell
			tail.x = nx; tail.y = ny;
		}
		//The snake can now eat the food.
		
		snake_array.unshift(tail); //puts back the tail as the first cell
		
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			//Lets paint 10px wide cells
			me.paintCell(c.x, c.y);
		}
		
		//Lets paint the food
		me.paintCell(food.x, food.y);
		//Lets paint the score
		var score_text = "Score: " + me.score;
		ctx.fillText(score_text, 5, h-5);
	},
	
	//Lets first create a generic function to paint cells
	 paintCell:function(x, y)
	{
        var me=this;
        var ctx=me.ctx;
        var cw=me.cw;
		ctx.fillStyle = "blue";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	},
	
	 checkCollision:function(x, y, array)
	{
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	
	
	
}
