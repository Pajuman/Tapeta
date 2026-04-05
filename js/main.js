import { exportPDF } from "./exportPdf.js";
import {textLayers, addRow } from "./textLayers.js";

// ADD TEXT
document.getElementById("addText").addEventListener("click", () => {
  addRow()
  });

// EXPORT PDF
document.getElementById("downloadPdf").addEventListener("click", () => {
  exportPDF(textLayers);
});

// TOGGLE HELP OVERLAY
const overlay = document.getElementById("helpOverlay");
document.getElementById("toggleHelp").addEventListener("click", () => {
  overlay.style.display = "flex"; // zobrazí overlay
});
document.getElementById("closeHelp").addEventListener("click", () => {
  overlay.style.display = "none"; // skryje overlay
});
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.style.display = "none";
});

// FIRST TEXT ADDED ON START-UP
addRow();