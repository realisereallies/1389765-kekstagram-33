const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
export const scaleValueInput = document.querySelector('.scale__control--value');
export const imagePreview = document.querySelector('.img-upload__preview img');

export let currentScale = 100;

export function updateScale() {
  scaleValueInput.value = `${currentScale }%`;
  const scaleFactor = currentScale / 100;
  imagePreview.style.transform = `scale(${scaleFactor})`;
}

smallerButton.addEventListener('click', () => {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale();
  }
});

biggerButton.addEventListener('click', () => {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale();
  }
});


updateScale();
