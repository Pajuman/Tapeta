import { FONT_SIZE } from "./constants.js";
import {drawPreview} from "./preview.js"

// pole všech textů
export const textLayers = [];
let container = document.getElementById("textControlsContainer");

const template = document.getElementById("textLayerTemplate");

let idCounter = 0;

// vytvoření nového textu
export function createTextLayer() {
  const layer = {
    id: idCounter++,
    text: "Nový řádek",
    x: -10,
    y: -90 + idCounter * 30,
    font: "Arial",
    fontSize: 30,
    color: "#000000"
  };

  textLayers.push(layer);
  return layer;
}

export function addRow(){
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

// změna fontu
export function setFont(layer, font) {
  layer.font = font;
}

// změna velikosti
export function changeFontSize(layer, delta) {
  layer.fontSize += delta;

  if (layer.fontSize < FONT_SIZE.min) layer.fontSize = FONT_SIZE.min;
  if (layer.fontSize > FONT_SIZE.max) layer.fontSize = FONT_SIZE.max;
}