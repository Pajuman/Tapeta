import { drawPreview } from "./preview.js";
import { textState, setFont, changeFontSize } from "./settings.js";
import { exportPDF } from "./export.js";

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

// export
document.getElementById("downloadPdf").onclick = () => {
  exportPDF(input.value, textState);
};