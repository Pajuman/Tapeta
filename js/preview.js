import { SCALE, PRINT_WIDTH, PRINT_HEIGHT, IMAGE_SRC, SIGN_AREA } from "./constants.js";
import { textState } from "./settings.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = PRINT_WIDTH * SCALE;
canvas.height = PRINT_HEIGHT * SCALE;



const image = new Image();
image.src = IMAGE_SRC;

// ---- draw preview function ----
export function drawPreview() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = textState.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${textState.fontSize}px ${textState.font}`;

  const x = textState.x + SIGN_AREA.width / 2;
  const y = textState.y + SIGN_AREA.height / 2;

  ctx.fillText(textState.text, x, y);
}

// ---- input event ----
const input = document.getElementById("textInput");
input.addEventListener("input", (e) => {
  textState.text = e.target.value;
  drawPreview();
});

// ---- drag & drop ----
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// pointer events = work on desktop & mobile
canvas.addEventListener("pointerdown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.font = `${textState.fontSize}px ${textState.font}`;
  const textWidth = ctx.measureText(textState.text).width;
  const textHeight = textState.fontSize;

  const textX = textState.x + SIGN_AREA.width / 2;
  const textY = textState.y + SIGN_AREA.height / 2;

  if (
    x >= textX - textWidth / 2 &&
    x <= textX + textWidth / 2 &&
    y >= textY - textHeight / 2 &&
    y <= textY + textHeight / 2
  ) {
    isDragging = true;
    offsetX = x - textState.x;
    offsetY = y - textState.y;
  }
});

canvas.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  textState.x = x - offsetX;
  textState.y = y - offsetY;

  drawPreview();
});

canvas.addEventListener("pointerup", () => { isDragging = false; });
canvas.addEventListener("pointerleave", () => { isDragging = false; });

// disable scrolling on mobile when dragging
canvas.style.touchAction = "none";

// ---- draw after image loads ----
image.onload = () => drawPreview();