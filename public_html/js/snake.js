/* @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Variables
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */

var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;

/*
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Executing Game Code
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */
gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000/30);

/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Game Functions
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */

function gameInitialize () {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}
function gameLoop () {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "rgb(145, 128, 128)";
    context.fillRect(0,0,screenWidth,screenHeight);
}

/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 *Snake Functions
 *@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */
 

function snakeInitialize(){
    snake = [];
    snakeLength = 3;
    snakeSize = 20;
    snakeDirection = "down";

    for(var index = snakeLength - 1; index >= 0; index--){
        snake.push({
            x: index,
            y:0
        });
    }
}

function snakeDraw(){
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "red";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate(){
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if(snakeDirection == "down"){
        snakeHeadY++;
    }
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}
/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Food Functions
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */

function foodInitialize(){
    food = {
        x: 0,
        y: 0
        
    };
    setFoodPosition();
}

function foodDraw(){
    context.fillStyle ="brown";
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function setFoodPosition(){
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    food.x = randomX;
    food.y = randomY;
  }