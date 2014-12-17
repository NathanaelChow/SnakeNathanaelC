/* @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Variables
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */
//snake variables
var snake;
var snakeLength;
var snakeSize;
var snakeDirection;
//food variables
var food;
var foodMusic;
//screen variables
var context;
var screenWidth;
var screenHeight;

//game menus and button variables
var gameState;
var gameOverMenu;
var restartButton;
//game scoreboard variables
var playHUD;
var scoreboard;


var gameStartMenu;
var startButton;
var mediumButton;
var hardButton;


/*
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Executing Game Code
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 2500 / 50);
setMediumInterval(gameLoopMedium, 2000 / 50);

/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Game Functions
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */
/**/
function gameInitialize() {
    var canvas = document.getElementById("game-screen");//canvas that lets you actually draw things on your game
    context = canvas.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    document.addEventListener("keydown", keyboardHandler);
    
    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);
    
    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);
    
    playHUD = document.getElementById("gameHUD");
    scoreboard = document.getElementById("scoreboard");
    
    gameStartMenu = document.getElementById("gameStart");
    centerMenuPosition(gameStartMenu);
    
    gameMediumMenu = document.getElementById("gameStartMedium");
    centerMenuPosition(gameMediumMenu);
    
    startButton = document.getElementById("startButton");
    startButton.addEventListener("click", gameStart);
    
    mediumButton = document.getElementById("mediumButton");
    mediumButton.addEventListener("click", gameStart);
    
    foodMusic = document.getElementById("food");
    
    //setState("PLAY");
    setState("START");
    setstate("MEDIUM");
}
function gameLoop() {
    gameDraw();
    drawScoreBoard();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}
function gameLoopMedium() {
    gameDraw();
    drawScoreBoard();
    if (gameState == "MEDIUM") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameDraw() {
    context.fillStyle = "rgb(145, 128, 128)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

function gameRestart(){
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    setState("PLAY");
}
function gameStart(){
    snakeInitialize();
    foodInitialize();
    hideMenu(gameStartMenu);
    setState("PLAY");
}
function gameStartMedium(){
    snakeInitialize();
    foodInitialize();
    hideMenu(gameMediumMenu);
    setState("MEDIUM");
}

/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 *Snake Functions
 *@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */


function snakeInitialize() {
    snake = [];
    snakeLength = 5;
    snakeSize = 30;
    snakeDirection = "down";

    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });
    }
}

function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
        //Draws the snake
        context.fillStyle = "red";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
        //Draws the border around each incrament of the snake
        context.strokeStyle="black";
        context.strokeRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if (snakeDirection == "down") {
        snakeHeadY++;
    }
    else if (snakeDirection == "right") {
        snakeHeadX++;
    }
    if (snakeDirection == "up") {
        snakeHeadY--;
    }
    else if (snakeDirection == "left") {
        snakeHeadX--;
    }

    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    checkSnakeCollisions(snakeHeadX, snakeHeadY);

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}
/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Food Functions
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0

    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "brown";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}
/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Input Functions
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */
function keyboardHandler(event) {
    console.log(event);

    if (event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if (event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    if (event.keyCode == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }
    else if (event.keyCode == "37" && snakeDirection != "right") {
        snakeDirection = "left";
    }

}
/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Collision Handling
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */
function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
        foodMusic.play();
        setFoodPosition();
    }
    
}
function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0 ||
        snakeHeadY * snakeSize >= screenHeight || snakeHeadY * snakeSize < 0
       ) 
    {
        setState("GAME OVER");
    }
}
function checkSnakeCollision(snakeHeadX, snakeHeadY){
    for(var index =1; index < snake.length; index++){
        if(snakeHeadX == snake[index].x && snakeHeadY == snake[index].y){
            
        }
    }
}
;
function checkSnakeCollisions(snakeHeadX, snakeHeadY) {
    for (var index = 1; index < snake.length; index++) {
        if (snakeHeadX == snake[index].x && snakeHeadY == snake[index].y) {
            setState("GAME OVER");
            return;
        }
    }
}
/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Game State Handling
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */
function setState(state) {
    gameState = state;
    showMenu(state);
}

/*@#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 * Menu Functions
 * @#$%@$%#$%@$%#@$&#@&&#@&&$$$@#$$&$#@$$@#$%$####$%%$#@#$%$#@@#$%$##$%$#@#$%#&#
 */

function displayMenu(menu){
    menu.style.visibility = "visible";
}
function hideMenu(menu){
    menu.style.visibility = "hidden";
}

/*Displays The GAME OVER menu and START menu*/
function showMenu(state){
    if(state == "GAME OVER"){
        displayMenu(gameOverMenu);
    }
    else if(state == "PLAY"){
        displayMenu(playHUD);
    }
    else if(state == "START"){          
        displayMenu(gameStartMenu);
    }
      else if(state == "MEDIUM"){          
        displayMenu(gameStartMenu);
    }
}
/*Centers The Menu's text*/
function centerMenuPosition(menu){
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth /2) + "px";
}
/*Draws the Scoreboard*/
function drawScoreBoard(){
    scoreboard.innerHTML = "Length: " + snakeLength;
}


