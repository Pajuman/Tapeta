const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const input = document.getElementById("textInput");

    const image = new Image();
    image.src = "tapeta.png"; // ← sem dej svůj obrázek

    const signArea = {
      x: 150,
      y: 120,
      width: 200,
      height: 60
    };

    function draw(text) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // vykresli obrázek
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // nastavení textu
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let fontSize = 30;
      ctx.font = fontSize + "px Arial";

      // zmenšování textu pokud je moc dlouhý
      while (ctx.measureText(text).width > signArea.width && fontSize > 10) {
        fontSize--;
        ctx.font = fontSize + "px Arial";
      }

      // vykreslení textu
      ctx.fillText(
        text,
        signArea.x + signArea.width / 2,
        signArea.y + signArea.height / 2
      );
    }

    // když se načte obrázek
    image.onload = () => {
      draw("");
    };

    // při psaní
    input.addEventListener("input", (e) => {
      draw(e.target.value);
    });

    document.getElementById("downloadPdf").addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
      
        // vytvoří PDF ve stejné velikosti jako canvas
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height]
        });
      
        const imgData = canvas.toDataURL("image/png");
      
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("cedule.pdf");
      });