import { SCALE, PRINT_WIDTH, PRINT_HEIGHT, SIGN_AREA, IMAGES } from "./constants.js";
import { textLayers } from "./textLayers.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = PRINT_WIDTH * SCALE;
canvas.height = PRINT_HEIGHT * SCALE;

export let currentIndex = 1;
const image = new Image();
image.src = IMAGES[currentIndex];

export function renderPreview(layers) {
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

// RENDER AFTER IMAGE LOADS
image.onload = () => renderPreview(textLayers);
