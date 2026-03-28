import {
    PRINT_WIDTH,
    PRINT_HEIGHT,
    PREVIEW_WIDTH,
    PREVIEW_HEIGHT,
    SIGN_AREA,
    IMAGE_SRC
  } from "./constants.js";
  
  export function exportPDF(text, textState) {
    const exportCanvas = document.createElement("canvas");
    const ctx = exportCanvas.getContext("2d");
  
    exportCanvas.width = PRINT_WIDTH;
    exportCanvas.height = PRINT_HEIGHT;
  
    const scaleX = PRINT_WIDTH / PREVIEW_WIDTH;
    const scaleY = PRINT_HEIGHT / PREVIEW_HEIGHT;
  
    const printSignArea = {
      x: SIGN_AREA.x * scaleX,
      y: SIGN_AREA.y * scaleY,
      width: SIGN_AREA.width * scaleX,
      height: SIGN_AREA.height * scaleY
    };
  
    const img = new Image();
    img.src = IMAGE_SRC;
  
    img.onload = () => {
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, PRINT_WIDTH, PRINT_HEIGHT);
  
      ctx.fillStyle = textState.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
  
      let fontSize = textState.fontSize * scaleX;
      ctx.font = `${fontSize}px ${textState.font}`;
  
      ctx.fillText(
        text,
        printSignArea.x + printSignArea.width / 2,
        printSignArea.y + printSignArea.height / 2
      );
  
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