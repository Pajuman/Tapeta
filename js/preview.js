import { SCALE, PRINT_WIDTH, PRINT_HEIGHT, IMAGE_SRC, SIGN_AREA } from "./constants.js";
import {textLayers} from "./settings.js"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = PRINT_WIDTH * SCALE;
canvas.height = PRINT_HEIGHT * SCALE;


const image = new Image();
image.src = IMAGE_SRC;

// ---- draw preview function ----
export function drawPreview(layers) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  layers.forEach(layer => {
    ctx.fillStyle = layer.color || "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${layer.fontSize}px ${layer.font}`;

    const x = layer.x + SIGN_AREA.width / 2;
    const y = layer.y + SIGN_AREA.height / 2;

    ctx.fillText(layer.text, x, y);
  });
}

let isDragging = false;
let activeLayer = null;
let offsetX = 0;
let offsetY = 0;

// 🔽 CLICK / TOUCH
canvas.addEventListener("pointerdown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // projdi vrstvy odzadu (vrchní má prioritu)
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


// 🔄 MOVE
canvas.addEventListener("pointermove", (e) => {
  if (!isDragging || !activeLayer) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  activeLayer.x = x - offsetX;
  activeLayer.y = y - offsetY;

  drawPreview(textLayers);
});


// 🔼 RELEASE
canvas.addEventListener("pointerup", () => {
  isDragging = false;
  activeLayer = null;
});

canvas.addEventListener("pointerleave", () => {
  isDragging = false;
  activeLayer = null;
});

// 📱 mobile fix
canvas.style.touchAction = "none";

// ---- draw after image loads ----
image.onload = () => drawPreview(textLayers);