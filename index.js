const main = document.querySelector(".divmain");
const rematch = document.querySelector(".rematch");
const p1ScoreDiv = document.querySelector(".p1Score");
const p2ScoreDiv = document.querySelector(".p2Score");
const draw = document.querySelector(".draw");

let turn = true;

let grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let playsMade = 0;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let gameOver = false;
let p1Score = 0;
let p2Score = 0;
let drawCount = 0;

function play(index, div) {
  if (grid[index] != 0 || gameOver) return;

  playsMade++;
  if (turn) {
    grid[index] = 1;
    div.innerHTML = "X";
  } else {
    grid[index] = 2;
    div.innerHTML = "O";
  }

  const res = check();
  if (playsMade >= 5 && res != 0) {
    if (res === 1) p1ScoreDiv.innerHTML = ++p1Score;
    else p2ScoreDiv.innerHTML = ++p2Score;

    gameOver = true;
  }
  if (playsMade === 9) {
    draw.innerHTML = ++drawCount;
  }

  turn = !turn;
}

function check() {
  for (let i = 0; i < winningCombination.length; i++) {
    const comb = winningCombination[i];
    if (grid[comb[0]] === grid[comb[1]] && grid[comb[1]] === grid[comb[2]]) {
      return grid[comb[0]];
    }
  }
  return 0;
}

for (let i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");

  div.addEventListener("mousedown", () => {
    play(i, div);
  });

  main.appendChild(div);
}

rematch.addEventListener("mousedown", () => {
  gameOver = false;
  grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  playsMade = 0;
  const cells = Array.from(document.getElementsByClassName("cell"));

  cells.forEach((cell) => (cell.innerHTML = ""));
});
