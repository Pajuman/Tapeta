import { exportPDF } from "./exportPdf.js";
import {textLayers, addRow } from "./textLayers.js";
import { updateImages } from "./selectImage.js";
import { selectLeftImage, selectRightImage } from "./appState.js";
import { setPreviewImage } from "./renderPreview.js";


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

// SELECT IMAGE
const leftPreview = document.getElementById("leftPreview");
const rightPreview = document.getElementById("rightPreview");

leftPreview.addEventListener("click", () => {
    selectLeftImage();
    updateImages(leftPreview, rightPreview);
    setPreviewImage();  
});

rightPreview.addEventListener("click", () => {
    selectRightImage();
    updateImages(leftPreview, rightPreview);  
    setPreviewImage();
});

// FIRST TEXT ADDED ON START-UP
addRow();
updateImages(leftPreview, rightPreview);
setPreviewImage();