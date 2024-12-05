import {uploadForm, pristine, closeOverlay, hashtagsInput, commentInput} from './load-image.js';
import {sendData} from './api.js';
import {handleEscape} from './util.js';
import { scaleValueInput } from './scale-control.js';


const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const createMessage = (template, className, closeFunction) => {
  const message = template.content.cloneNode(true).querySelector(`.${className}`);
  const button = message.querySelector(`.${className}__button`);
  button.addEventListener('click', closeFunction);
  message.addEventListener('click', (evt) => {
    if (evt.target === message) {
      closeFunction();
    }
  });
  return message;
};

export const handleOutsideClick = (evt) => {
  const error = document.querySelector('.error');
  const success = document.querySelector('.success');
  if (error && !error.contains(evt.target)) {
    error.remove();
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleOutsideClick);
  }
  if (success && !success.contains(evt.target)) {
    success.remove();
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleOutsideClick);
  }
};
export const clearForm = () => {
  pristine.reset();
  uploadForm.reset();
  hashtagsInput.value = '';
  commentInput.textContent = '';
  scaleValueInput.value = '100%';

};

const showSuccessMessage = () => {
  const successMessage = createMessage(successTemplate, 'success', () => {
    successMessage.remove();
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleOutsideClick);
    clearForm(); // Закрываем оверлей после нажатия на кнопку или клика вне сообщения
  });

  // Используем более надежный способ добавления сообщения в DOM
  const messageContainer = document.createElement('div');
  messageContainer.id = 'message-container'; // Создаем контейнер для сообщений
  messageContainer.appendChild(successMessage);
  document.body.appendChild(messageContainer);

  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleOutsideClick);
};


const showErrorMessage = (message) => {
  const errorElement = createMessage(errorTemplate, 'error', () => {
    errorElement.remove();
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleOutsideClick);
  });
  const errorTitle = errorElement.querySelector('.error__title');
  errorTitle.textContent = message;
  document.body.appendChild(errorElement);
  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleOutsideClick);
};


export const setUserFormSubmit = async () => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const submitButton = uploadForm.querySelector('.img-upload__submit'); // Получаем кнопку
    submitButton.disabled = true; // Блокируем кнопку

    const isValid = pristine.validate();
    if (isValid) {
      try {
        await sendData(new FormData(evt.target));
        closeOverlay();
        await showSuccessMessage();
        clearForm();
      } catch (error) {
        showErrorMessage('Ошибка загрузки файла');
      } finally {
        submitButton.disabled = false; // Разблокируем кнопку в любом случае (после success или error)
      }
    } else {
      submitButton.disabled = false; // Разблокируем кнопку если форма не валидна
    }
  });
};
