
var inMaze = [];
var grid = [];
var frontier = [];

let canvas = document.getElementById('id-canvas');
let context = canvas.getContext('2d');
CanvasRenderingContext2D.prototype.clear = function() {
    this.clearRect(0, 0, canvas.width, canvas.height);
    }
    function drawIntro(){
        context.clear();
        context.lineWidth = 10;
        context.strokeRect(0,0, canvas.width,canvas.height);
        context.font = '80px Arial';
        context.fillText('Choose Grid Size to Start', 50, canvas.width / 4)
    }

    function drawGameOver(){
        context.clear();
        context.lineWidth = 10;
        context.strokeRect(0,0, canvas.width,canvas.height);
        context.font = '80px Arial';
        context.fillText('Game Over', 50, canvas.width / 4);
        context.font = '25px Arial';
        context.fillText('Choose maze size to try again', 75, canvas.width / 3);
    }

    function drawHighScore(list, key){
        context.clear();
        context.lineWidth = 10;
        context.strokeRect(0,0, canvas.width,canvas.height);
        context.font = (key * 12) + 'px Arial';
        context.fillText('New HighScore', key * 8, canvas.width / 4);
        context.font = (key * 5) + 'px Arial';
        context.fillText('Choose maze size to play again', key * 11, canvas.width / 3);
        context.font = (key * 12) + 'px Arial';
        text = key + 'x' + key + ": " + list[key];
        context.fillText(text, key * 8, canvas.width /2);
    }
    
    function getInput(num) {
        canvas.height = num * 100;
        canvas.width = num * 100;
        let newGrid = getGrid(num);
        drawMaze(newGrid, num);
    }

const getGrid = (num) => {
    inMaze = [[0,0]];
    frontier = [[0,1], [1,0]];
    
    var grid = [];
    for(let y = 0; y < num; y++){
        tempRow = []
        for(let x = 0; x < num; x++){
            let item = {
                x: x,
                y: y,
                top: 1,
                bottom: 1,
                left: 1,
                right: 1,
            }
            tempRow.push(item);
        }
        grid.push(tempRow);
    }
    
    while(frontier.length !== 0){
        let rand = Math.floor(Math.random() * frontier.length);
        let neighbors = getNeighbors(frontier[rand]);
        let done = false;
        while(!done){
            let neighbor = getRandomNeighbor(neighbors)
            for(let j = 0 ; j < inMaze.length; j++){
                if(inMaze[j][0] === neighbor[0] && inMaze[j][1] === neighbor[1]){
                    done = true;
                    let MazeX = neighbor[0];
                    let MazeY = neighbor[1];
                    let nX = frontier[rand][0];
                    let nY = frontier[rand][1];

                    inMaze.push(frontier[rand]);
                    frontier.splice(rand,1);
                    if(neighbor[2] === 'top'){
                        grid[MazeY][MazeX].bottom = 0;
                        grid[nY][nX].top = 0;
                    }
                    if(neighbor[2] === 'bottom'){
                        grid[MazeY][MazeX].top = 0;
                        grid[nY][nX].bottom = 0;
                    }
                    if(neighbor[2] === 'left'){
                        grid[MazeY][MazeX].right = 0;
                        grid[nY][nX].left = 0;
                    }
                    if(neighbor[2] === 'right'){
                        grid[MazeY][MazeX].left = 0;
                        grid[nY][nX].right = 0;
                    }
                    for(let j = 0 ; j < neighbors.length; j++){
                        neighbors[j].splice(2,1)
                        addToFrontier(neighbors[j], num );
                    }
                }
                
            }
            
        }
    }
    return grid;
}

function addToFrontier (set, size) {
    if(set[0] >= 0 && set[1] >= 0 && set[0] < size && set[1] < size){
        let add = true;
        inMaze.map((item) => {
            if(item[0] == set[0] && item[1] == set[1]){
                add = false;
            }
        })
        frontier.map((item) => {
            if(item[0] == set[0] && item[1] == set[1]){
                add = false;
            }
        })
        if(add){
            frontier.push(set);
        }
    } 
}

function getNeighbors(set) {
    let x = set[0];
    let y = set[1];
    return [
        [x-1,y, 'left'],
        [x+1,y, 'right'],
        [x,y-1, 'top'],
        [x,y+1, 'bottom']
    ];
}

function getRandomNeighbor(neighbors){
    let idx = Math.floor(Math.random() * neighbors.length);
    return neighbors[idx];
}

function getShortestPath(grid) {
    let stack = [];
    stack.push(grid[0][0]);
}


function drawMaze(grid , size) {
    context.strokeStyle = 'white';
    context.lineWidth = 5
    context.beginPath();

for(let y = 0; y < size; y++){
    for(let x = 0; x < size; x++){
            context.moveTo(x*100,y*100)
            // draw top
            if(grid[y][x].top === 1){
                context.lineTo((x+1)*100, y*100);
            }
            else {
                context.moveTo((x+1)*100, y*100);
            }
            // draw right
            if(grid[y][x].right === 1){
                context.lineTo((x+1)*100, (y+1)*100);
            }
            else {
                context.moveTo((x+1)*100, (y+1)*100);

            }
            //draw bottom
            if(grid[y][x] .bottom === 1){
                context.lineTo(x*100,(y+1)*100);
            }
            else {
                context.moveTo(x*100,(y+1)*100);
            }
            // draw left
            if(grid[y][x] .left === 1){
                context.lineTo(x*100,y*100);
            }
            else {
                context.moveTo(x*100,y*100);
            }
        }
    }
    context.stroke();
}

function drawTextures(texture , num) {
    context.clear();
    if (texture.image.ready) {
        for(let i = 0; i < num; i++){
            for( let j = 0; j < num; j++){
                context.save();
                context.drawImage(
                    texture.image,
                    texture.center.x * i,
                    texture.center.y * j,
                    texture.width, texture.height);
                context.restore();
            }
        }

    }
};

function drawFinish(texture , num) {
    if (texture.image.ready) {
                context.save();
                context.drawImage(
                    texture.image,
                    (num * 100) - 100,
                    (num * 100) - 100,
                    texture.width, texture.height);
                context.restore();
            
        

    }
};

function drawPlayer(texture) {
    if (texture.image.ready) {
                context.save();
                context.drawImage(
                    texture.image,
                    (texture.x * 100),
                    (texture.y * 100),
                    texture.width, texture.height);
                context.restore();
            
        

    }
};

function drawHistory(texture, list) {
    if (texture.image.ready) {
        for(let i = 0; i < list.length; i++){
            context.save();
            context.drawImage(
                texture.image,
                (list[i][0] * 100),
                (list[i][1] * 100),
                texture.width, texture.height);
                context.restore();
            }
            
        

    }
};





