import { DEFAULT_TEXT, SIGN_AREA, FONT_SIZE } from "./constants.js";
import { drawPreview } from "./preview.js";

export const textState = {
  font: DEFAULT_TEXT.font,
  fontSize: DEFAULT_TEXT.fontSize,
  color: DEFAULT_TEXT.color,
  x: SIGN_AREA.x,
  y: SIGN_AREA.y
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

export function moveText(dx, dy) {
  textState.x += dx;
  textState.y += dy;
  update();
}

function update() {
  const text = document.getElementById("textInput").value;
  drawPreview(text, textState);
}