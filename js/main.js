import { drawPreview } from "./preview.js";
import { textState, setFont, changeFontSize, moveText } from "./settings.js";
import { exportPDF } from "./export.js";
import { MOVE_STEP } from "./constants.js"

const input = document.getElementById("textInput");

// typing
input.addEventListener("input", (e) => {
  drawPreview(e.target.value, textState);
});

// font select
document.getElementById("fontSelect").addEventListener("change", (e) => {
  setFont(e.target.value);
});

// font size
document.getElementById("increaseFont").onclick = () => changeFontSize(5);
document.getElementById("decreaseFont").onclick = () => changeFontSize(-5);

// movement
document.getElementById("up").onclick = () => moveText(0, -MOVE_STEP);
document.getElementById("down").onclick = () => moveText(0, MOVE_STEP);
document.getElementById("left").onclick = () => moveText(-MOVE_STEP, 0);
document.getElementById("right").onclick = () => moveText(MOVE_STEP, 0);

// export
document.getElementById("downloadPdf").onclick = () => {
  exportPDF(input.value, textState);
};