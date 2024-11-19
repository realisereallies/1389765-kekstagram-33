import {isEscape} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = document.querySelector('.img-upload__cancel');
const body = document.body;
const commentInput = document.querySelector('.text__description');
const hashtagsInput = document.querySelector('.text__hashtags');

//показ окна
uploadInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
});
//скрытие окна
document.addEventListener('keydown', (evt) => {
  if (isEscape(evt)) {
    if (document.activeElement !== commentInput && document.activeElement !== hashtagsInput) {
      evt.preventDefault();
      closeOverlay();
    }
  }
});
overlayCloseButton.addEventListener('click', closeOverlay);

function closeOverlay() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = '';
}

//валидация полей
new Pristine(uploadInput);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate(); // Проверяет валидность полей

  if (!isValid) {
    evt.preventDefault();
  }
});

pristine.addValidator(commentInput,
  (value) => value.length <= 140,
  'Комментарий не должен содержать более 140 символов.'
);

pristine.addValidator(hashtagsInput, (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.split(' ').map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(hashtags);

  if (uniqueHashtags.size > 5) {
    return false;
  }

  for (const tag of uniqueHashtags) {
    if (!/^#[A-Za-z0-9]{1,19}$/.test(tag)) {
      return false;
    }
  }

  return true;
}, 'Хэштеги должны начинаться с # и содержать только буквы и цифры (макс. 20 символов). Не более 5 уникальных хэштегов.');
