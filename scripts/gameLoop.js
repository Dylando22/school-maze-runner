//Step 1 initialize and start gameLoop:
var prevTime = performance.now()
var Events = [];
var grid = []
var size = 0;
var background = []
var Timer;
var highScores = {
  5: 0,
  10: 0,
  15: 0,
  20: 0
};

var count = 0
const increaseCount = () => {
  count += 1;
  let time = document.getElementById('timer');
    time.innerHTML = "Time: " + count;
}

var gameStart  = false;
var gameOver = false;
var newHighScore = false;
var historyOn = false;
var hintOn = false;
var shortestPathOn = false;


let myInput = Input.Keyboard();

let texture = {
  imageSrc: 'images/background.jpg',
  center: { x: 100, y: 100 },
  width: 100,
  height: 100,
};

texture.image = new Image();
texture.image.ready = false;
texture.image.onload = function() {
  this.ready = true;
};
texture.image.src = texture.imageSrc;

let Finish = {
  imageSrc: 'images/flag1.png',
  width: 100,
  height: 100,
}

Finish.image = new Image();
Finish.image.ready = false;
Finish.image.onload = function() {
  this.ready = true;
};
Finish.image.src = Finish.imageSrc;


let historyItem = {
  imageSrc: 'images/red.png',
  width: 100,
  height: 100,
}

historyItem.image = new Image();
historyItem.image.ready = false;
historyItem.image.onload = function() {
  this.ready = true;
};
historyItem.image.src = historyItem.imageSrc;

let Player = {
  imageSrc: 'images/player.png',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  history: [[0,0]],
  moveLeft:
  function moveLeft() {
    if(gameStart && grid[Player.y][Player.x].left == 0){
      Player.x -= 1;
      Player.history.push([Player.x,Player.y]);
    }
},
  moveRight: function moveRight() {
    if(gameStart && grid[Player.y][Player.x].right == 0){
      Player.x += 1;
      Player.history.push([Player.x,Player.y]);
    }
},
  moveUp: function moveUp() {
    if(gameStart && grid[Player.y][Player.x].top == 0){
      Player.y -= 1;
      Player.history.push([Player.x,Player.y]);
    }
},
  moveDown: function moveDown() {
    if(gameStart && grid[Player.y][Player.x].bottom == 0){
      Player.y += 1;
      Player.history.push([Player.x,Player.y]);
    }

},
getHistory: function(){
  historyOn = !historyOn;
},
getHint: function(){
  hintOn = !hintOn;
},
getShortestPath: function(){
  shortestPathOn = !shortestPathOn;
}
}


Player.image = new Image();
Player.image.ready = false;
Player.image.onload = function() {
  this.ready = true;
};
Player.image.src = Player.imageSrc;

gameLoop(prevTime);

function getInput(num) {
  if(gameOver || !gameStart){
    gameOver = false;
    Timer = setInterval(increaseCount,1000)
    Player.history = [[0,0]];
  } 
    gameStart = true;
    Player.x = 0;
    Player.y = 0;
    count = 0;
    canvas.height = num * 100;
    canvas.width = num * 100;
    grid = getGrid(num);
    size = num;
}

function update(elapsedTime) {
  if(gameStart){
    let PlayerScore = (100 - count) * size; 
    let ele = document.getElementById('playerScore');
    ele.innerHTML = 'Score: ' + PlayerScore;
    if(Player.x === size - 1 && Player.y === size-1){
      gameOver = true;
      gameStart = false;
      clearInterval(Timer);
      if(PlayerScore > highScores[size]){
        highScores[size] = PlayerScore;
        newHighScore = true;
      }
      else{
        newHighScore = false;
      }
    }
  }
  if(gameOver){

  }
  
}

function processInput(elapsedTime) {
  myInput.update(elapsedTime);
}

function render(){
  if(gameStart){
    drawTextures(texture, size);
    drawMaze(grid,size);
    drawFinish(Finish, size);
    if(historyOn){
      drawHistory(historyItem ,Player.history);
    }
    drawPlayer(Player);
  }
  else if (gameOver){
    if(newHighScore){
      drawHighScore(highScores, size);
      let id = String(size) + "score";
      let ele = document.getElementById(id);
      ele.innerHTML = highScores[size];
    }
    else{
      drawGameOver();
    }
  }
  else{
    drawIntro();
  }
}

function gameLoop(timeStamp) {
  // get new elapsed time
  elapsedTime = timeStamp - prevTime;
  prevTime = timeStamp;
  processInput(elapsedTime);
  // update the data
  update(elapsedTime);
  // render based on the data
  render();
  // go through game loop again
  requestAnimationFrame(gameLoop);
}

myInput.registerCommand('a', Player.moveLeft);
myInput.registerCommand('d', Player.moveRight);
myInput.registerCommand('w', Player.moveUp);
myInput.registerCommand('s', Player.moveDown);
myInput.registerCommand('j', Player.moveLeft);
myInput.registerCommand('l', Player.moveRight);
myInput.registerCommand('i', Player.moveUp);
myInput.registerCommand('k', Player.moveDown);
// myInput.registerCommand('left', Player.moveLeft);
// myInput.registerCommand('tight', Player.moveRight);
// myInput.registerCommand('up', Player.moveUp);
// myInput.registerCommand('down', Player.moveDown);
myInput.registerCommand('b', Player.getHistory);
myInput.registerCommand('h', Player.getHint);
myInput.registerCommand('h', Player.getShortestPath);

