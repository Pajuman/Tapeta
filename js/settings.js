import { SIGN_AREA, FONT_SIZE } from "./constants.js";

// pole všech textů
export const textLayers = [];

let idCounter = 0;

// vytvoření nového textu
export function createTextLayer() {
  const layer = {
    id: idCounter++,
    text: "",
    x: SIGN_AREA.x,
    y: SIGN_AREA.y,
    font: "Arial",
    fontSize: 30,
    color: "#000000"
  };

  textLayers.push(layer);
  return layer;
}

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