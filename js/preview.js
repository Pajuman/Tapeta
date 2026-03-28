import { PREVIEW_WIDTH, PREVIEW_HEIGHT, IMAGE_SRC, SIGN_AREA } from "./constants.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = PREVIEW_WIDTH;
canvas.height = PREVIEW_HEIGHT;

const image = new Image();
image.src = IMAGE_SRC;

export function drawPreview(text, textState) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = textState.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = `${textState.fontSize}px ${textState.font}`;

  const x = textState.x + SIGN_AREA.width / 2;
  const y = textState.y + SIGN_AREA.height / 2;

  ctx.fillText(text, x, y);
}

image.onload = () => {
  drawPreview("", {
    font: "Arial",
    fontSize: 30,
    color: "#000",
    x: SIGN_AREA.x,
    y: SIGN_AREA.y
  });
};