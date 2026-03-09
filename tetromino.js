export const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: "#00ffff" }, 
  O: { shape: [[1, 1],[1, 1]], color: "#ffff00" }, 
  T: { shape: [[0, 1, 0],[1, 1, 1]], color: "#800080" }, 
  L: { shape: [[1, 0, 0],[1, 1, 1]], color: "#ffa500" }, 
  J: { shape: [[0, 0, 1],[1, 1, 1]], color: "#0000ff" }, 
  S: { shape: [[0, 1, 1],[1, 1, 0]], color: "#00ff00" }, 
  Z: { shape: [[1, 1, 0],[0, 1, 1]], color: "#ff0000" }  
};


export function randomPiece(COLS) {
  const keys = Object.keys(TETROMINOS);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return {
    shape: TETROMINOS[randKey].shape,
    color: TETROMINOS[randKey].color,
    row: 0,
    col: Math.floor(COLS / 2) - Math.ceil(TETROMINOS[randKey].shape[0].length / 2)
  };
}


export function rotate(piece) {
  return piece.shape[0].map((_, i) =>
    piece.shape.map(row => row[i]).reverse()
  );
}