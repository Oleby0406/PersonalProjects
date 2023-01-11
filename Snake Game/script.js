var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var locations = [];
var prevYcor = 220;
var prevXcor = 80;
var yCor = 240;
var xCor = 100;
var appleY;
var appleX;
var applePresent = false;

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;
var direction = "right";

var length = 1;

document.getElementById("score").innerHTML = "Score: " + length;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (direction !== "left") {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
      direction = "right";
    }
  }
  if (direction !== "right") {
    if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
      direction = "left";
    }
  }
  if (direction !== "up") {
    if (e.key == "Down" || e.key == "ArrowDown") {
      downPressed = true;
      direction = "down";
    }
  }
  if (direction !== "down") {
    if (e.key == "Up" || e.key == "ArrowUp") {
      upPressed = true;
      direction = "up";
    }
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  }
}

function drawSnake() {
  locations.push([xCor, yCor]); 
  //xCor and yCor are coordinates of the snake's head, global variables set before the function activates.
  //locations is a list containing the coordinates of all the pieces
  //that's used to advance the tail forward and redraw the snake

  for (i = 0; i < locations.length - 1; i++){
    if (locations[locations.length - 1][0] == locations[i][0] && locations[locations.length - 1][1] == locations[i][1]){
      document.location.reload(); 
    }
  }
  // the loop goes through the whole list and checks if the coordinates of the head are the same as any of the coordinates of the tail
  // in which case the snake collided with the tail and the game is over

  if (locations.length > length) { 
    locations.splice(0, 1);
  }
  // if coordinates are added to the list but the length didn't increase, that means the coordinate of the last piece needs to be
  // removed from the list since there's nothing following it

  ctx.beginPath();
  ctx.rect(locations[locations.length - 1][0], locations[locations.length - 1][1], 20, 20);
  // the first two arguments are the coordinates of the head of the snake
  // that were just added to the list
  ctx.fillStyle = "#00FF00"; // Color green
  ctx.fill();
  ctx.closePath();
  
}

function drawApple() {
  appleY = Math.floor(Math.random() * 25);
  appleY *= 20;
  appleX = Math.floor(Math.random() * 25);
  appleX *= 20;
  // last 4 lines randomly generate x and y coordinates for the apple and round them in a way that makes them integers
  // of 20, ensuring that they are always on the invisible grid that the snake follows
  for (let i = 0; i < locations.length; i++) {
    if (locations[i][0] === appleX && locations[i][1] === appleY) {
      drawApple(); 
    }
  }
  // loop checks if the apple is in a location that any part of the snake already takes up and 
  // if so executes the function again before drawing the apple. This will keep occuring until
  // the apple lands in an empty spot and only then it will be drawn.
  applePresent = true;
  ctx.beginPath();
  ctx.rect(appleX, appleY, 20, 20);
  ctx.fillStyle = "#FF0000"; // Color Red
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(prevXcor, prevYcor, 20.01, 20.01); 
  drawSnake();
  if (xCor == appleX && yCor == appleY) {
    length += 1;
    document.getElementById("score").innerHTML = "Score: " + length;
    applePresent = false;
  }
  if (!applePresent) {
    drawApple();
  }
  prevXcor = locations[0][0];
  prevYcor = locations[0][1];
  if (direction == "right") {
    xCor += 20;
  } else if (direction == "left") {
    xCor -= 20;
  } else if (direction == "down") {
    yCor += 20;
  } else if (direction == "up") {
    yCor -= 20;
  }
  if (locations[locations.length - 1][1] == canvas.height || locations[locations.length - 1][1] == -20 
  || locations[locations.length - 1][0] == canvas.width || locations[locations.length - 1][0] == -20) {
    document.location.reload();
  }
}

var interval = setInterval(draw, 100);