export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

export function resetBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

export function drawBoard(ctx) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      ctx.fillStyle = board[row][col] ? board[row][col] : "#333";
      ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      ctx.strokeStyle = "#555";
      ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
}