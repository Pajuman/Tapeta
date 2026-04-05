export const IMAGES = [
    "../images/tapeta0.png",
    "../images/tapeta1.png",
    "../images/tapeta2.png"
  ];

export let currentIndex = 1;
export let currentImageSrc = IMAGES[currentIndex];

export function selectLeftImage(){
    currentIndex--;
    currentImageSrc = IMAGES[currentIndex];
}

export function selectRightImage(){
    currentIndex++;
    currentImageSrc = IMAGES[currentIndex];
}
