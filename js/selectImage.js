import { IMAGES } from "./constants";
import { renderPreview } from "./renderPreview";

let currentIndex = 1;

const leftPreview = document.getElementById("leftPreview");
const rightPreview = document.getElementById("rightPreview");

// UPDATE IMAGES
function updateImages() {
  // hlavní obrázek
  window.currentImageSrc = IMAGES[currentIndex];

  // LEFT IMAGE
  if (currentIndex > 0) {
    leftPreview.src = IMAGES[currentIndex - 1];
    leftPreview.style.visibility = "visible";
  } else {
    leftPreview.style.visibility = "hidden";
  }

  // RIGHT IMAGE
  if (currentIndex < IMAGES.length - 1) {
    rightPreview.src = IMAGES[currentIndex + 1];
    rightPreview.style.visibility = "visible";
  } else {
    rightPreview.style.visibility = "hidden";
  }

  renderPreview(textLayers);
}

// 👉 kliky
leftPreview.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateImages();
  }
});

rightPreview.addEventListener("click", () => {
  if (currentIndex < IMAGES.length - 1) {
    currentIndex++;
    updateImages();
  }
});
