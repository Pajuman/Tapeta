import { FONT_SIZE, SIGN_AREA } from "./constants.js";
import {renderPreview} from "./renderPreview.js"

// ALL TEXTS
export const textLayers = [];

let idCounter = 0;


// ----------------
// --- ADD TEXT ---
// ----------------

export function addRow(){
  const container = document.getElementById("textControlsContainer");
  const template = document.getElementById("textLayerTemplate");
  const clone = template.content.cloneNode(true);
  const wrapper = clone.querySelector(".text-layer");

  const input = wrapper.querySelector(".textInput");
  const fontSelect = wrapper.querySelector(".fontSelect");
  const increaseBtn = wrapper.querySelector(".increaseFont");
  const decreaseBtn = wrapper.querySelector(".decreaseFont");

  // CREATE NEW LAYER
  const layer = {
    id: idCounter++,
    text: "nový řádek",
    font: "Arial",
    fontSize: 22,
    x: -10,
    y: -90 + idCounter * 30
  };

  textLayers.push(layer);

  // ELEMENT EVENTS
  input.addEventListener("input", (e) => {
    layer.text = e.target.value;
    renderPreview(textLayers);
  });
  
  fontSelect.addEventListener("change", (e) => {
    setFont(layer, e.target.value);
    renderPreview(textLayers);
  });
  
  increaseBtn.onclick = () => {
    changeFontSize(layer, 2);
    renderPreview(textLayers);
  };

  decreaseBtn.addEventListener("click", () => {
    layer.fontSize -= 2;
    renderPreview(textLayers);
  });

  // ADD WRAPPER TO HTML
  container.appendChild(wrapper);

  // REDRAW
  renderPreview(textLayers);
};

// ----------------------
// --- FONT FUNCTIONS ---
// ----------------------

function setFont(layer, font) {
  layer.font = font;
}

function changeFontSize(layer, delta) {
  layer.fontSize += delta;

  if (layer.fontSize < FONT_SIZE.min) layer.fontSize = FONT_SIZE.min;
  if (layer.fontSize > FONT_SIZE.max) layer.fontSize = FONT_SIZE.max;
}

// -------------------
// --- DRAG & DROP ---
// -------------------

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDragging = false;
let activeLayer = null;
let offsetX = 0;
let offsetY = 0;

// GRAB
canvas.addEventListener("pointerdown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // SELECT LAYER
  for (let i = textLayers.length - 1; i >= 0; i--) {
    const layer = textLayers[i];

    ctx.font = `${layer.fontSize}px ${layer.font}`;
    const textWidth = ctx.measureText(layer.text).width;
    const textHeight = layer.fontSize;

    const textX = layer.x + SIGN_AREA.width / 2;
    const textY = layer.y + SIGN_AREA.height / 2;

    if (
      x >= textX - textWidth / 2 &&
      x <= textX + textWidth / 2 &&
      y >= textY - textHeight / 2 &&
      y <= textY + textHeight / 2
    ) {
      activeLayer = layer;
      isDragging = true;

      offsetX = x - layer.x;
      offsetY = y - layer.y;

      break;
    }
  }
});

// DRAG
canvas.addEventListener("pointermove", (e) => {
  if (!isDragging || !activeLayer) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  activeLayer.x = x - offsetX;
  activeLayer.y = y - offsetY;

  renderPreview(textLayers);
});


// DROP
canvas.addEventListener("pointerup", () => {
  isDragging = false;
  activeLayer = null;
});

canvas.addEventListener("pointerleave", () => {
  isDragging = false;
  activeLayer = null;
});

// MOBILE FIX
canvas.style.touchAction = "none";
