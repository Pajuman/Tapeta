import { drawPreview } from "./preview.js";
import { exportPDF } from "./export.js";
import { createTextLayer, setFont, changeFontSize, textLayers } from "./settings.js";

const layer = createTextLayer();

// container for dynamic text controls
let container = document.getElementById("textControlsContainer");

const template = document.getElementById("textLayerTemplate");
const addBtn = document.getElementById("addText");

let idCounter = 0;



function addRow(){

  const clone = template.content.cloneNode(true);
  const wrapper = clone.querySelector(".text-layer");

  const input = wrapper.querySelector(".textInput");
  const fontSelect = wrapper.querySelector(".fontSelect");
  const increaseBtn = wrapper.querySelector(".increaseFont");
  const decreaseBtn = wrapper.querySelector(".decreaseFont");

  // create new layer
  const layer = {
    id: idCounter++,
    text: "nový řádek",
    font: "Arial",
    fontSize: 22,
    x: -10,
    y: -90 + idCounter * 30
  };

  textLayers.push(layer);

  // --- EVENTS ---

  input.addEventListener("input", (e) => {
    layer.text = e.target.value;
    drawPreview(textLayers);
  });
  
  fontSelect.addEventListener("change", (e) => {
    setFont(layer, e.target.value);
    drawPreview(textLayers);
  });
  
  increaseBtn.onclick = () => {
    changeFontSize(layer, 2);
    drawPreview(textLayers);
  };

  decreaseBtn.addEventListener("click", () => {
    layer.fontSize -= 2;
    drawPreview(textLayers);
  });

  // append UI
  container.appendChild(wrapper);

  // redraw
  drawPreview(textLayers);
};

addBtn.addEventListener("click", () => {
  addRow()
  });


// 📄 EXPORT PDF
document.getElementById("downloadPdf").addEventListener("click", () => {
  exportPDF(textLayers);
});

addRow();