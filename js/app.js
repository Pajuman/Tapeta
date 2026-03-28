const PRINT_WIDTH = 3508;  // A4 210mm @ 300dpi
const PRINT_HEIGHT = 2480 ; // A4 297mm @ 300dpi

const SCALE = 4; //poměr mezi náhledem (web) a tiskem (pdf)

const canvas = document.getElementById("canvas");
canvas.width = PRINT_WIDTH / SCALE;
canvas.height = PRINT_HEIGHT / SCALE;
const ctx = canvas.getContext("2d");

const input = document.getElementById("textInput");

const image = new Image();
image.src = "tapeta.png";

// pozice cedule pro preview (malý canvas)
const printSignArea = {
  x: 170,
  y: 100,
  width: 160,
  height: 50
};

// --- funkce pro preview ---
function draw(text) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let fontSize = 30;
  ctx.font = fontSize + "px Arial";

  while (ctx.measureText(text).width > signArea.width && fontSize > 10) {
    fontSize--;
    ctx.font = fontSize + "px Arial";
  }

  ctx.fillText(
    text,
    signArea.x + signArea.width / 2,
    signArea.y + signArea.height / 2
  );
}

image.onload = () => {
  draw("");
};

input.addEventListener("input", (e) => {
  draw(e.target.value);
});

// --- export do PDF ---
document.getElementById("downloadPdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;

  if (!jsPDF) {
    alert("jsPDF se nenačetl!");
    return;
  }

  const exportCanvas = document.createElement("canvas");
  const exportCtx = exportCanvas.getContext("2d");

  exportCanvas.width = PRINT_WIDTH;
  exportCanvas.height = PRINT_HEIGHT;    

  const text = input.value;

  const img = new Image();
  img.src = image.src;

  img.onload = () => {
    exportCtx.imageSmoothingQuality = "high";
    exportCtx.drawImage(img, 0, 0, PRINT_WIDTH, PRINT_HEIGHT);

    exportCtx.fillStyle = "black";
    exportCtx.textAlign = "center";
    exportCtx.textBaseline = "middle";

    let fontSize = 120; // velký pro tisk
    exportCtx.font = fontSize + "px Arial";

    while (
      exportCtx.measureText(text).width > printSignArea.width &&
      fontSize > 40
    ) {
      fontSize--;
      exportCtx.font = fontSize + "px Arial";
    }

    exportCtx.fillText(
      text,
      printSignArea.x + printSignArea.width / 2,
      printSignArea.y + printSignArea.height / 2
    );

    // PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [PRINT_WIDTH, PRINT_HEIGHT]
    });

    const imgData = exportCanvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, PRINT_WIDTH, PRINT_HEIGHT);
    pdf.save("ukazka.pdf");
  };
});
