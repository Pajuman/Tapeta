import { currentImageSrc, currentIndex, IMAGES } from "./appState.js";

export function updateImages(leftPreview, rightPreview) { 
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
}


