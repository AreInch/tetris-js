import { collision, getPiece, setPiece, hardDrop } from "./game.js";
import { rotate } from "./tetromino.js";
import {gameOver} from "./game.js"
export function setupControls(ctx) {
  document.addEventListener("keydown", (e) => {
    if (["Space"].includes(e.code)) {
      e.preventDefault(); 
    }

    if (e.code === "Space" && !gameOver) {
      hardDrop(ctx); 
    }
  });


  document.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
    }

    let currentPiece = getPiece();

    if (e.key === "ArrowLeft" && !collision(currentPiece, 0, -1)) {
      currentPiece.col--;
    } else if (e.key === "ArrowRight" && !collision(currentPiece, 0, 1)) {
      currentPiece.col++;
    } else if (e.key === "ArrowDown" && !collision(currentPiece, 1, 0)) {
      currentPiece.row++;
    } else if (e.key === "ArrowUp") {
      const rotatedShape = rotate(currentPiece);
      const testPiece = { ...currentPiece, shape: rotatedShape };
      if (!collision(testPiece, 0, 0)) {
        currentPiece.shape = rotatedShape;
      }
    }

    setPiece(currentPiece); 
  });
}