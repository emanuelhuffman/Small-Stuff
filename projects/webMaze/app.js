const block = document.querySelector(".block");
const circle = document.querySelector(".circle");
const endScreen = document.querySelector(".endScreen");
block.style.top = "25px";
block.style.left = "25px";

let x = 'x';
let o = 'o';

let playerTracker = [
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'p', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']];

function createEmptyMaze(x, y) {
    let maze = [];
    let line = [];
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            line.push('x');
        }
        maze.push(line);
        line = []
    }
    maze[1][1] = 'p';
    return maze;
};

//directions: N, S, E, W
//cannot carve outside walls or visited squares
//Can carve x's
function validMove(maze, direction) {
    let ycoordinate = parseInt(indexOf2d(maze, 'p')[0]);
    let xcoordinate = parseInt(indexOf2d(maze, 'p')[1]);
    switch (direction) {
        case 'N':
            ycoordinate -= 2;
            break;
        case 'S':
            ycoordinate += 2;
            break;
        case 'W':
            xcoordinate -= 2;
            break;
        case 'E':
            xcoordinate += 2;
            break;
    }

    if (ycoordinate < 1 || ycoordinate > maze.length - 2 ||
        xcoordinate < 1 || xcoordinate > maze[0].length - 2 ||
        maze[ycoordinate][xcoordinate] === 'v') {
        return false;
    }
    return true;
};

//carve out a block of the maze, return new maze
function carveBlock(maze, direction) {
    let ycoordinate = parseInt(indexOf2d(maze, 'p')[0]);
    let xcoordinate = parseInt(indexOf2d(maze, 'p')[1]);
    switch (direction) {
        case 'N':
            maze[ycoordinate - 1][xcoordinate] = 'v';
            maze[ycoordinate - 2][xcoordinate] = 'v';
            maze[ycoordinate - 2][xcoordinate] = 'p';
            break;
        case 'S':
            maze[ycoordinate + 1][xcoordinate] = 'v';
            maze[ycoordinate + 2][xcoordinate] = 'v';
            maze[ycoordinate + 2][xcoordinate] = 'p';
            break;
        case 'W':
            maze[ycoordinate][xcoordinate - 1] = 'v';
            maze[ycoordinate][xcoordinate - 2] = 'v';
            maze[ycoordinate][xcoordinate - 2] = 'p';
            break;
        case 'E':
            maze[ycoordinate][xcoordinate + 1] = 'v';
            maze[ycoordinate][xcoordinate + 2] = 'v';
            maze[ycoordinate][xcoordinate + 2] = 'p';
            break;
    }
    maze[ycoordinate][xcoordinate] = 'v';
    return maze;
};

function backtrack(maze) {
    let ycoordinate = parseInt(indexOf2d(maze, 'p')[0]);
    let xcoordinate = parseInt(indexOf2d(maze, 'p')[1]);
    let yorgCoord = ycoordinate;
    let xorgCoord = xcoordinate;
    let directions = ['N', 'S', 'W', 'E'];
    for (const direction of directions) {
        switch (direction) {
            case 'N':
                ycoordinate -= 2;
                if (!(ycoordinate < 1)) {
                    maze[yorgCoord][xorgCoord] = 'v';
                    maze[ycoordinate][xcoordinate] = 'p';
                }
                ycoordinate += 2;
                break;
            case 'S':
                ycoordinate += 2;
                if (!(ycoordinate > maze.length - 2)) {
                    maze[yorgCoord][xorgCoord] = 'v';
                    maze[ycoordinate][xcoordinate] = 'p';
                }
                ycoordinate -= 2;
                break;
            case 'W':
                xcoordinate -= 2;
                if (!(xcoordinate < 1)) {
                    maze[yorgCoord][xorgCoord] = 'v';
                    maze[ycoordinate][xcoordinate] = 'p';
                }
                xcoordinate += 2;
                break;
            case 'E':
                xcoordinate += 2;
                if (!(xcoordinate > maze[0].length - 2)) {
                    maze[yorgCoord][xorgCoord] = 'v';
                    maze[ycoordinate][xcoordinate] = 'p';
                }
                xcoordinate -= 2;
                break;
        }
    }

    if (ycoordinate < 1 || ycoordinate > maze.length - 2 ||
        xcoordinate < 1 || xcoordinate > maze[0].length - 2) {
        return false;
    }
    return true;
}

//carve out entire maze using recursive backtracking
function carveMaze(maze) {
    let directions = ['N', 'S', 'E', 'W'].sort((a, b) => 0.5 - Math.random());
    if (validMove(maze, "N") || validMove(maze, "S") || validMove(maze, "W") || validMove(maze, "E")) {
        for (const direction of directions) {
            console.log(direction);
            if (validMove(maze, direction)) {
                carveBlock(maze, direction);
                console.log(maze);
                carveMaze(maze);
            }
        }
    } else {
        backtrack(maze);
    }
}

maze = createEmptyMaze(11, 11);
let tempmaze = carveMaze(maze);


// take an array and display on page
function buildMaze(maze) {
    let line = [];
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            line.push(document.createElement('div'));
            if (maze[i][j] === 'x') {
                line[j].className += 'wall';
                line[j].style.top = `${i * 25}px`;
                line[j].style.left = `${j * 25}px`;
                document.body.appendChild(line[j]);
            }
        }
        line = [];
    }
};

buildMaze(maze);

function indexOf2d(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === target) {
                return `${i}${j}`;
            }
        }
    }
}

//Event listeners
let gameOver = false;
let ycoordinate = null;
let xcoordinate = null;
document.addEventListener('keydown', (e) => {
    if (!gameOver) {
        switch (e.key) {
            case 'ArrowUp':
                ycoordinate = parseInt(indexOf2d(playerTracker, 'p')[0]);
                xcoordinate = parseInt(indexOf2d(playerTracker, 'p')[1]);
                if (maze[ycoordinate - 1][xcoordinate] != 'x') {
                    block.style.top = `${parseInt(block.style.top.substring(0, block.style.top.length - 2)) - 25}px`;
                    playerTracker[ycoordinate][xcoordinate] = 'o';
                    playerTracker[ycoordinate - 1][xcoordinate] = 'p';
                }
                break;
            case 'ArrowDown':
                ycoordinate = parseInt(indexOf2d(playerTracker, 'p')[0]);
                xcoordinate = parseInt(indexOf2d(playerTracker, 'p')[1]);
                if (maze[ycoordinate + 1][xcoordinate] != 'x') {
                    block.style.top = `${parseInt(block.style.top.substring(0, block.style.top.length - 2)) + 25}px`;
                    playerTracker[ycoordinate][xcoordinate] = 'o';
                    playerTracker[ycoordinate + 1][xcoordinate] = 'p';
                }
                break;
            case 'ArrowLeft':
                ycoordinate = parseInt(indexOf2d(playerTracker, 'p')[0]);
                xcoordinate = parseInt(indexOf2d(playerTracker, 'p')[1]);
                if (maze[ycoordinate][xcoordinate - 1] != 'x') {
                    block.style.left = `${parseInt(block.style.left.substring(0, block.style.left.length - 2)) - 25}px`;
                    playerTracker[ycoordinate][xcoordinate] = 'o';
                    playerTracker[ycoordinate][xcoordinate - 1] = 'p';
                }
                break;
            case 'ArrowRight':
                ycoordinate = parseInt(indexOf2d(playerTracker, 'p')[0]);
                xcoordinate = parseInt(indexOf2d(playerTracker, 'p')[1]);
                if (maze[ycoordinate][xcoordinate + 1] != 'x') {
                    block.style.left = `${parseInt(block.style.left.substring(0, block.style.left.length - 2)) + 25}px`;
                    playerTracker[ycoordinate][xcoordinate] = 'o';
                    playerTracker[ycoordinate][xcoordinate + 1] = 'p';
                }
                break;
        }
    }
});
