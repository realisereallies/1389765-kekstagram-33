let CURRENT_SCALE = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
export const scaleValueInput = document.querySelector('.scale__control--value');
export const imagePreview = document.querySelector('.img-upload__preview img');

let areListenersAttached = false;

export function updateScale() {
  scaleValueInput.value = `${CURRENT_SCALE}%`;
  const scaleFactor = CURRENT_SCALE / 100;
  imagePreview.style.transform = `scale(${scaleFactor})`;
}

function attachEventListeners() {
  smallerButton.addEventListener('click', () => {
    if (CURRENT_SCALE > 25) {
      CURRENT_SCALE -= 25;
      updateScale();
    }
  });

  biggerButton.addEventListener('click', () => {
    if (CURRENT_SCALE < 100) {
      CURRENT_SCALE += 25;
      updateScale();
    }
  });
  areListenersAttached = true;
}

// Прикрепляем обработчики только один раз при загрузке страницы
if (!areListenersAttached) {
  attachEventListeners();
}

updateScale();


//функция сброса масштаба
export function resetScale(){
  CURRENT_SCALE = 100;
  updateScale();
}
