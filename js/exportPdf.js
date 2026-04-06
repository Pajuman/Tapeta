import {
  PRINT_WIDTH,
  PRINT_HEIGHT,
  SCALE,
  SIGN_AREA,
} from "./constants.js";
import { currentImageSrc } from "./appState.js";
import { textLayers } from "./textLayers.js";

export function exportPDF() {
  const exportCanvas = document.createElement("canvas");
  const ctx = exportCanvas.getContext("2d");

  exportCanvas.width = PRINT_WIDTH;
  exportCanvas.height = PRINT_HEIGHT;

  const img = new Image();
  img.src = currentImageSrc;

  img.onload = () => {
    ctx.clearRect(0, 0, PRINT_WIDTH, PRINT_HEIGHT);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 90 % plochy, vycentrované
    const safeScale = 0.9;
    const safeWidth = PRINT_WIDTH * safeScale;
    const safeHeight = PRINT_HEIGHT * safeScale;
    const offsetX = (PRINT_WIDTH - safeWidth) / 2;
    const offsetY = (PRINT_HEIGHT - safeHeight) / 2;

    // zachování poměru stran
    const imgRatio = img.width / img.height;
    const safeRatio = safeWidth / safeHeight;

    let drawWidth;
    let drawHeight;
    let drawX;
    let drawY;

    if (imgRatio > safeRatio) {
      drawWidth = safeWidth;
      drawHeight = safeWidth / imgRatio;
      drawX = offsetX;
      drawY = offsetY + (safeHeight - drawHeight) / 2;
    } else {
      drawHeight = safeHeight;
      drawWidth = safeHeight * imgRatio;
      drawX = offsetX + (safeWidth - drawWidth) / 2;
      drawY = offsetY;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    textLayers.forEach(layer => {
      ctx.fillStyle = layer.color || "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const fontSize = layer.fontSize * (1 / SCALE) * safeScale;
      ctx.font = `${fontSize}px ${layer.font}`;

      const x =
        offsetX + (layer.x + SIGN_AREA.width / 2) * (1 / SCALE) * safeScale;

      const y =
        offsetY + (layer.y + SIGN_AREA.height / 2) * (1 / SCALE) * safeScale + 50;

      ctx.fillText(layer.text, x, y);
    });

    const { jsPDF } = window.jspdf;

    // A4 landscape v mm = nejspolehlivější
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    const imgData = exportCanvas.toDataURL("image/png");

    // A4 landscape = 297 × 210 mm
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
    pdf.save("cedule.pdf");
  };
}