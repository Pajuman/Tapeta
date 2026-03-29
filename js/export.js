import {
  PRINT_WIDTH,
  PRINT_HEIGHT, 
  SCALE, 
  SIGN_AREA,
  IMAGE_SRC
} from "./constants.js";

export function exportPDF(layers) {
  console.log(layers);
  const exportCanvas = document.createElement("canvas");
  const ctx = exportCanvas.getContext("2d");

  exportCanvas.width = PRINT_WIDTH;
  exportCanvas.height = PRINT_HEIGHT; 

  const img = new Image();
  img.src = IMAGE_SRC;

  img.onload = () => {
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, PRINT_WIDTH, PRINT_HEIGHT);

    layers.forEach(layer => {
      ctx.fillStyle = layer.color || "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const fontSize = layer.fontSize * SCALE;
      ctx.font = `${fontSize}px ${layer.font}`;

      const x =
        (layer.x + SIGN_AREA.width / 2) * SCALE;

      const y =
        (layer.y + SIGN_AREA.height / 2) * SCALE;

      ctx.fillText(layer.text, x, y);
    });

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [PRINT_WIDTH, PRINT_HEIGHT]
    });

    const imgData = exportCanvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, PRINT_WIDTH, PRINT_HEIGHT);
    pdf.save("cedule.pdf");
  };
}