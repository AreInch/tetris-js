import { update, restartGame, restartButtonArea, drawGameOver,getGameOverImage, startButtonArea, setGameStarted,drawStartScreen,gameStarted,drawPiece,currentPiece,drawScore,drawNextPiece } from "./game.js";
import { setupControls } from "./controls.js";
import { drawBoard} from "./board.js";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

setupControls(ctx);
update(ctx);

canvas.addEventListener("click", (e) => {
  if (!startButtonArea) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (
    mouseX >= startButtonArea.x &&
    mouseX <= startButtonArea.x + startButtonArea.width &&
    mouseY >= startButtonArea.y &&
    mouseY <= startButtonArea.y + startButtonArea.height
  ) {
    setGameStarted(true);
    restartGame(ctx); 
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!gameStarted && startButtonArea) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const hover =
      mouseX >= startButtonArea.x &&
      mouseX <= startButtonArea.x + startButtonArea.width &&
      mouseY >= startButtonArea.y &&
      mouseY <= startButtonArea.y + startButtonArea.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hover) {
      canvas.style.cursor = "pointer";
      drawStartScreen(ctx, true);
    } else {
      canvas.style.cursor = "default";
      drawStartScreen(ctx, false);
    }
  }

});

canvas.addEventListener("mousemove", (e) => {
  if (!restartButtonArea) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const hover =
    mouseX >= restartButtonArea.x &&
    mouseX <= restartButtonArea.x + restartButtonArea.width &&
    mouseY >= restartButtonArea.y &&
    mouseY <= restartButtonArea.y + restartButtonArea.height;

  const snapshot = getGameOverImage();
  if (snapshot) {
    ctx.putImageData(snapshot, 0, 0); 
  }

  drawGameOver(ctx, hover);
  canvas.style.cursor = hover ? "pointer" : "default";
});


canvas.addEventListener("click", (e) => {
  if (!restartButtonArea) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (
    mouseX >= restartButtonArea.x &&
    mouseX <= restartButtonArea.x + restartButtonArea.width &&
    mouseY >= restartButtonArea.y &&
    mouseY <= restartButtonArea.y + restartButtonArea.height
  ) {
    restartGame(ctx);
  }
});