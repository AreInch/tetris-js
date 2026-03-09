import { COLS, ROWS, BLOCK_SIZE, board, drawBoard } from "./board.js";
import { randomPiece } from "./tetromino.js";
import { resetBoard } from "./board.js";

export let currentPiece = randomPiece(COLS);
let score = 0;
let dropInterval = 1000;
let lastTime = 0;
let gameOverImage = null;
export let gameOver = false;
let nextPiece = randomPiece(COLS);
export let gameStarted = false;
export let restartButtonArea = null;
export let startButtonArea = null;
export function collision(piece, rowOffset, colOffset) {
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c]) {
        let newRow = piece.row + r + rowOffset;
        let newCol = piece.col + c + colOffset;

        if (
          newRow >= ROWS ||
          newCol < 0 || newCol >= COLS ||
          board[newRow][newCol]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export function setGameStarted(value) {
  gameStarted = value;
}

function merge(piece) {
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c]) {
        board[piece.row + r][piece.col + c] = piece.color;
      }
    }
  }
  clearLines();
}

function clearLines() {
  let linesCleared = 0;

  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every(cell => typeof cell === "string")) {
      board.splice(r, 1);                       
      board.unshift(Array(COLS).fill(null));    
      linesCleared++;
      r++; 
    }
  }

  if (linesCleared > 0) {
    score += linesCleared * 100;
    if (score % 500 === 0 && dropInterval > 200) {
      dropInterval -= 100;
    }
  }
}

export function drawPiece(ctx, piece) {
  ctx.fillStyle = piece.color;
  ctx.strokeStyle = "#555";
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c]) {
        ctx.fillRect(
          (piece.col + c) * BLOCK_SIZE,
          (piece.row + r) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        ctx.strokeRect(
          (piece.col + c) * BLOCK_SIZE,
          (piece.row + r) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    }
  }
}

export function drawScore(ctx) {
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";      
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + score, 10, 20);
}

export function drawNextPiece(ctx) {
  const previewX = COLS * BLOCK_SIZE + 20; 
  const previewY = 50;

  ctx.fillStyle = "#222";
  ctx.fillRect(previewX - 10, previewY - 10, 120, 120);

  ctx.fillStyle = "#fff";
  ctx.font = "16px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Next:", previewX, 20);

  ctx.fillStyle = nextPiece.color;
  ctx.strokeStyle = "#555";
  for (let r = 0; r < nextPiece.shape.length; r++) {
    for (let c = 0; c < nextPiece.shape[r].length; c++) {
      if (nextPiece.shape[r][c]) {
        ctx.fillRect(
          previewX + c * BLOCK_SIZE,
          previewY + r * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        ctx.strokeRect(
          previewX + c * BLOCK_SIZE,
          previewY + r * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    }
  }
}

export function drawGameOver(ctx, hover = false) {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "#ff0000";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GAME OVER", ctx.canvas.width / 2, ctx.canvas.height / 2);

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, ctx.canvas.width / 2, ctx.canvas.height / 2 + 40);

  ctx.fillStyle = hover ? "#008000" : "#00ff00"; 
  ctx.fillRect(ctx.canvas.width / 2 - 60, ctx.canvas.height / 2 + 70, 120, 40);

  ctx.fillStyle = "#000";
  ctx.font = "18px Arial";
  ctx.fillText("Restart", ctx.canvas.width / 2, ctx.canvas.height / 2 + 95);

  restartButtonArea = {
    x: ctx.canvas.width / 2 - 60,
    y: ctx.canvas.height / 2 + 70,
    width: 120,
    height: 40
  };
}

export function drawStartScreen(ctx, hover = false) {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.font = "40px Arial";
  ctx.textAlign = "left"; 
  ctx.textBaseline = "middle";

  const text = "TETRIS";
  const colors = ["#00FFFF", "#FFFF00", "#800080", "#00FF00", "#FF0000", "#FFA500"];

  let totalWidth = 0;
  for (let i = 0; i < text.length; i++) {
    totalWidth += ctx.measureText(text[i]).width;
  }

  const startX = ctx.canvas.width / 2 - totalWidth / 2;
  const y = ctx.canvas.height / 2 - 40;

  let x = startX;
  for (let i = 0; i < text.length; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillText(text[i], x, y);
    x += ctx.measureText(text[i]).width; 
  }

  ctx.fillStyle = hover ? "#008000" : "#00ff00";
  ctx.fillRect(ctx.canvas.width / 2 - 60, ctx.canvas.height / 2 + 40, 120, 40);

  ctx.fillStyle = "#000";
  ctx.font = "18px Arial";
  ctx.textAlign = "center"; 
  ctx.fillText("Start Game", ctx.canvas.width / 2, ctx.canvas.height / 2 + 65);

  startButtonArea = {
    x: ctx.canvas.width / 2 - 60,
    y: ctx.canvas.height / 2 + 40,
    width: 120,
    height: 40
  };
}

export function update(ctx, time = 0) {
    if (!gameStarted) {
    drawStartScreen(ctx);
    return;
  }
  if (gameOver) {
    drawGameOver(ctx);
    return;
  }


  const delta = time - lastTime;
  if (delta > dropInterval) {
    if (!collision(currentPiece, 1, 0)) {
      currentPiece.row++;
    } else {
      merge(currentPiece);
      currentPiece = nextPiece;       
      nextPiece = randomPiece(COLS);
      if (collision(currentPiece, 0, 0)) {
        gameOver = true;
        drawGameOver(ctx);
        return;
      }
    }
    lastTime = time;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawBoard(ctx);
  drawGhostPiece(ctx, currentPiece);
  drawPiece(ctx, currentPiece);
  drawScore(ctx);
  drawNextPiece(ctx);
  requestAnimationFrame((t) => update(ctx, t));
}

export function restartGame(ctx) {
  resetBoard();
  score = 0;
  dropInterval = 1000;
  lastTime = 0;
  gameOver = false;
  currentPiece = randomPiece(COLS);
  nextPiece = randomPiece(COLS);
  
  restartButtonArea = null;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  update(ctx);
}

export function hardDrop(ctx) {
  if (gameOver) return;

  let dropDistance = 0;
  while (!collision(currentPiece, 1, 0)) {
    currentPiece.row++;
    dropDistance++;
  }
  merge(currentPiece);
  score += dropDistance * 2;

  currentPiece = nextPiece;
  nextPiece = randomPiece(COLS);

  if (collision(currentPiece, 0, 0)) {
    gameOver = true;
    gameOverImage = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawGameOver(ctx);
    return;
  }
  
}

function getGhostPiece(piece) {
  const ghost = { ...piece, row: piece.row };
  while (!collision(ghost, 1, 0)) {
    ghost.row++;
  }
  return ghost;
}

function drawGhostPiece(ctx, piece) {
  const ghost = getGhostPiece(piece);
  ctx.strokeStyle = ghost.color;
  ctx.lineWidth = 2;
  ctx.fillStyle = ghost.color;
  ctx.globalAlpha = 0.7;
  for (let r = 0; r < ghost.shape.length; r++) {
    for (let c = 0; c < ghost.shape[r].length; c++) {
      if (ghost.shape[r][c]) {
        ctx.strokeRect(
          (ghost.col + c) * BLOCK_SIZE,
          (ghost.row + r) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    }
  }
  ctx.globalAlpha = 1.0;
}

export function getPiece() {
  return currentPiece;
}

export function setPiece(piece) {
  currentPiece = piece;
}

export function getGameOverImage() {
  return gameOverImage;
}
