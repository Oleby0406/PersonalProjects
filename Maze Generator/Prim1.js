//start with all cells being walls
//start in corner, set to passage
//add walls 2 apart from current to list
//pick random wall from list
//add passages 2 apart from wall to list
//pick one randomly and "connect" 

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let grid = [];

for (let i = 0; i < 27; i++) {
  grid.push([]);
  for (let j = 0; j < 31; j++) {
    grid[i].push(0);
  }
}

let wallsList = [];
let passageList = [];


//finding "adjacent" walls to target cell
function markWalls(x, y) {
  //left wall
  if (x >= 2 && grid[y][x - 2] === 0) {
    wallsList.push([x - 2, y]);
  }

  //right wall
  if (x <= grid[0].length - 3 && grid[y][x + 2] === 0) {
    wallsList.push([x + 2, y]);
  }

  //top wall
  if (y >= 2 && grid[y - 2][x] === 0) {
    wallsList.push([x, y - 2]);
  }

  //bottom wall
  if (y <= grid.length - 3 && grid[y + 2][x] === 0) {
    wallsList.push([x, y + 2]);
  }
}

function markPassages(x, y) {
  grid[y][x] = 1;
  passageList = [];

  //left passage
  if (x >= 2 && grid[y][x - 2] === 1) {
    passageList.push([x - 2, y, "left"]);
  }

  //right passage
  if (x <= grid[0].length - 3 && grid[y][x + 2] === 1) {
    passageList.push([x + 2, y, "right"]);
  }

  //top passage
  if (y >= 2 && grid[y - 2][x] === 1) {
    passageList.push([x, y - 2, "top"]);
  }

  //bottom passage
  if (y <= grid.length - 3 && grid[y + 2][x] === 1) {
    passageList.push([x, y + 2, "bottom"]);
  }
}

let randomWall;
let randomPassage;

grid[1][1] = 1;
markWalls(1, 1);

while (wallsList.length > 0) {
  for (let i = 0; i < wallsList.length; i++) {
    if (grid[wallsList[i][1]][wallsList[i][0]] === 1) {
      wallsList.splice(wallsList.indexOf(wallsList[i]), 1);
    }
  }
  if (wallsList.length === 0) {
    break;
  }
  randomWall = wallsList[rand(0, wallsList.length - 1)];

  wallsList.splice(wallsList.indexOf(randomWall), 1);

  markPassages(randomWall[0], randomWall[1]);
  markWalls(randomWall[0], randomWall[1]);

  randomPassage = passageList[rand(0, passageList.length - 1)];

  if (randomPassage[2] === "top") {
    grid[randomWall[1] - 1][randomWall[0]] = 1;
  }

  if (randomPassage[2] === "bottom") {
    grid[randomWall[1] + 1][randomWall[0]] = 1;
  }

  if (randomPassage[2] === "left") {
    grid[randomWall[1]][randomWall[0] - 1] = 1;
  }

  if (randomPassage[2] === "right") {
    grid[randomWall[1]][randomWall[0] + 1] = 1;
  }

}
let newDiv;
let newRow;
let newLook;
for (let k = 0; k < grid.length; k++) {
  newLook = "";
  for (let z = 0; z < grid[k].length; z++) {
    if (grid[k][z] === 1) {
      newLook += "\u2B1C";
    } else {
      newLook += "\u2B1B";
    }
  }
  newDiv = document.createElement("div");
  newRow = document.createTextNode(newLook);
  newDiv.appendChild(newRow);
  document.getElementById("grid").appendChild(newDiv);
}