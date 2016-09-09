/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();

var gameOver = false;
var apple = {x:Math.floor(Math.random() * backBuffer.height), y:Math.floor(Math.random() * backBuffer.height)};
var score = 0;
var snake = [];
snake[0] = {x: backBuffer.width/2, y:backBuffer.height/2};
var input;

function init(){
input = {
  up: false,
  down: false,
  left: false,
  right: false
	}
}
init();

//keys
window.onkeydown = function(event) {
  event.preventDefault();
  console.log(event);
  switch(event.keyCode) {
    // up
    case 38:
    case 87:
      if(!input.down) {
        init();
		input.up = true;
      }
      break;
	// down
	case 40:
    case 83:
      if(input.up == false) {
        init();
		input.down = true;
      }
      break;
    // left
    case 37:
    case 65:
      if(input.right == false) {
        init();
		input.left = true;
      }
      break;
    // right
    case 39:
    case 68:
      if(input.left == false) {
        init();
		input.right = true;
      }
      break;
	}
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  if(gameOver == false) {
    var elapsedTime = newTime - oldTime;
    oldTime = newTime;

    update(elapsedTime);
    render(elapsedTime);

    // Flip the back buffer
    frontCtx.drawImage(backBuffer, 0, 0);

    // Run the next loop
    window.requestAnimationFrame(loop);
  }
}

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  // TODO: Spawn an apple periodically
  // TODO: Grow the snake periodically
  // TODO: Move the snake
  if(input.up || input.down || input.right || input.left) {
    if(input.up) {
      snake[0].y -= 2;
    } else if(input.down) {
      snake[0].y += 2;
    } else if(input.right) {
      snake[0].x += 2;
    } else if(input.left) {
      snake[0].x -= 2;
    }
  }
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  if(snake[0].x == 0 || snake[0].x > backBuffer.width || snake[0].y == 0 || snake[0].y == backBuffer.height) {
    gameOver = true;
  }
  // TODO: Determine if the snake has eaten an apple
  // TODO: Determine if the snake has eaten its tail
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle

}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  backCtx.fillStyle = "White";
  backCtx.fillRect(0, 0, backBuffer.width, backBuffer.height);

  backCtx.fillStyle = "Black";
  backCtx.font = "bold 16px Arial";
  backCtx.fillText("Score: " + score, 20, 20);

  // TODO: Draw the game objects into the backBuffer
  backCtx.fillStyle = "Red";
  backCtx.fillRect(apple.x, apple.y, 10, 10)
  
  backCtx.fillStyle = "Green";
  for(i = 0; i < snake.length; i++) {
    backCtx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }


  if(gameOver) {
    backCtx.fillText("Game Over", backBuffer.width/2, backBuffer.height/2);
  }
}

/* Launch the game */
window.requestAnimationFrame(loop);
