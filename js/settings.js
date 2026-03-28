import { SIGN_AREA, FONT_SIZE } from "./constants.js";
import { drawPreview } from "./preview.js";

export const textState = {
  text: "",
  x: SIGN_AREA.x,
  y: SIGN_AREA.y,
  font: "Arial",
  fontSize: 30,
  color: "#000000"
};

export function setFont(font) {
  textState.font = font;
  update();
}

export function changeFontSize(delta) {
  textState.fontSize += delta;

  if (textState.fontSize < FONT_SIZE.min) textState.fontSize = FONT_SIZE.min;
  if (textState.fontSize > FONT_SIZE.max) textState.fontSize = FONT_SIZE.max;

  update();
}

function update() {
  const text = document.getElementById("textInput").value;
  drawPreview();
}