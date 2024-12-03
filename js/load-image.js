import {isEscape} from './util.js';

export const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = document.querySelector('.img-upload__cancel');
const body = document.body;
export const commentInput = document.querySelector('.text__description');
export const hashtagsInput = document.querySelector('.text__hashtags');
const previewImage = document.querySelector('.img-upload__preview img');
const fileTypes = ['jpg', 'jpeg', 'png'];

//показ окна
uploadInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((it) => fileName.endsWith(it));
  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }
});


new Pristine(uploadInput);

export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//скрытие окна

document.addEventListener('keydown', (evt) => {
  if (isEscape(evt)) {
    // Check if error or success message is displayed
    const errorExists = document.querySelector('.error') !== null; // Adjust '.error' if needed
    const successExists = document.querySelector('.success') !== null; // Adjust '.success' if needed

    if (!errorExists && !successExists && document.activeElement !== commentInput && document.activeElement !== hashtagsInput) {
      evt.preventDefault();
      closeOverlay();
    }
  }
});

overlayCloseButton.addEventListener('click', closeOverlay);

export function closeOverlay() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = '';
}

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

