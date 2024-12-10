const effectsSlider = document.querySelector('.effect-level__slider');
const effectsValue = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelectorAll('.effects__radio');
const effectLevelContainer = document.querySelector('.img-upload__effect-level'); //Захват элемента для скрытия
const effectNone = document.getElementById('effect-none');
effectNone.checked = true;
effectNone.dispatchEvent(new Event('change'));
let slider;

function updateImageStyle(effect, value) {
  imgPreview.style.filter = '';

  switch (effect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${value})`;
      break;
    case 'none':
      break;
  }
}


function createSlider(options) {
  // Полностью очищаем слайдер, если он существует
  if (slider) {
    slider.destroy();
    while (effectsSlider.firstChild) {
      effectsSlider.removeChild(effectsSlider.firstChild);
    }
  }

  slider = noUiSlider.create(effectsSlider, {
    range: options.range,
    start: options.start,
    step: options.step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  slider.on('update', () => {
    effectsValue.value = slider.get();
    const effect = getSelectedEffect();
    updateImageStyle(effect, slider.get());
  });
}

function getSelectedEffect() {
  for (const effect of effectsList) {
    if (effect.checked) {
      return effect.value;
    }
  }
  return 'none';
}

function sliderInitHandler() {
  effectLevelContainer.style.display = 'none'; // Скрываем контейнер изначально
  createSlider({ range: { min: 0, max: 1 }, start: 1, step: 0.1 }); // Создаем слайдер с опциями по умолчанию
}

effectsList.forEach((radio) => {
  radio.addEventListener('change', () => {
    const selectedEffect = getSelectedEffect();

    if (selectedEffect === 'none') {
      effectLevelContainer.style.display = 'none';
      if (slider) {
        slider.destroy();
        while (effectsSlider.firstChild) {
          effectsSlider.removeChild(effectsSlider.firstChild);
        }
      }
      imgPreview.style.filter = '';
      effectsValue.value = 1;
    } else {
      effectLevelContainer.style.display = 'block';
      let sliderOptions;
      switch (selectedEffect) {
        case 'chrome':
        case 'sepia':
          sliderOptions = { range: { min: 0, max: 1 }, start: 1, step: 0.1 };
          break;
        case 'marvin':
          sliderOptions = { range: { min: 0, max: 100 }, start: 100, step: 1 };
          break;
        case 'heat':
        case 'phobos':
          sliderOptions = { range: { min: 0, max: 3 }, start: 3, step: 0.1 };
          break;
        default:
          sliderOptions = { range: { min: 0, max: 1 }, start: 1, step: 0.1 };
          break;
      }
      createSlider(sliderOptions);
      updateImageStyle(selectedEffect, effectsValue.value);
    }
  });
});

document.addEventListener('DOMContentLoaded', sliderInitHandler);

export function resetEffects() {
  effectNone.checked = true;
  effectNone.dispatchEvent(new Event('change'));
  imgPreview.style.filter = '';
  if (slider) {
    slider.destroy();
    while (effectsSlider.firstChild) {
      effectsSlider.removeChild(effectsSlider.firstChild);
    }
  }
  effectsValue.value = 1;
}
