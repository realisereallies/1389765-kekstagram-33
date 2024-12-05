import {isEscape} from './util.js';
import { clearForm } from './dispatch-status.js';
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
    const previewSpans = document.querySelectorAll('.effects__preview');
    previewSpans.forEach((span) => {
      span.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
});

export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTarget: (el) => {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-container');
    el.parentNode.insertBefore(errorContainer, el.nextSibling);
    return errorContainer;
  }
});

//скрытие окна

document.addEventListener('keydown', (evt) => {
  if (isEscape(evt)) {

    const errorExists = document.querySelector('.error') !== null;
    const successExists = document.querySelector('.success') !== null;

    if (!errorExists && !successExists && document.activeElement !== commentInput && document.activeElement !== hashtagsInput) {
      evt.preventDefault();
      clearForm();
      closeOverlay();
    }
  }
});

overlayCloseButton.addEventListener('click', closeOverlay);

export function clearMessages() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach((el) => el.remove());
  const successElements = document.querySelectorAll('.success');
  successElements.forEach((el) => el.remove());
}

export function clearPristineErrors() {
  const errorElements = document.querySelectorAll('.img-upload__field-wrapper--error');
  errorElements.forEach((element) => {
    const errorMessages = element.querySelectorAll('.pristine-error'); // Выбираем сообщения об ошибках
    errorMessages.forEach((errorMessage) => errorMessage.remove()); // Удаляем сообщения
    element.classList.remove('img-upload__field-wrapper--error'); // Удаляем класс ошибки
  });
}

export function closeOverlay() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = '';
  previewImage.style.transform = 'scale(1)';
  previewImage.style.filter = '';
  const errorContainers = document.querySelectorAll('.error-container');
  errorContainers.forEach((container) => {
    container.innerHTML = '';
  });
  clearMessages();
  pristine.reset();
}


pristine.addValidator(hashtagsInput, (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().replace(/\s+/g, ' ').split(' ').filter((tag) => tag !== '');
  const uniqueHashtags = new Set(hashtags);

  if (hashtags.length !== uniqueHashtags.size) {
    return false; // Есть повторяющиеся хэштеги
  }

  if (uniqueHashtags.size > 5) {
    return false; // Слишком много уникальных хэштегов
  }

  for (const tag of uniqueHashtags) {
    if (!/^#[a-zA-Zа-яА-Я0-9]{1,19}$/.test(tag)) {
      return false;
    }
  }

  return true;
}, 'Хэштеги должны начинаться с # и содержать только буквы и цифры (макс. 20 символов). Не более 5 уникальных хэштегов.  Нельзя повторять хэштеги.');

pristine.addValidator(commentInput, (value) => value.length <= 140, 'Комментарий слишком длинный. Максимальная длина: 140 символов.');
