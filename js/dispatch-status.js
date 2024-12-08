import {uploadForm, pristine, overlayCloseHandler, hashtagsInput, commentInput} from './load-image.js';
import {sendData} from './api.js';
import {handleEscape} from './util.js';
import { scaleValueInput, resetScale } from './scale-control.js';
import { resetEffects } from './effects-control.js';


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
  commentInput.value = '';
  scaleValueInput.value = '100%';
  resetScale();
};


const showSuccessMessage = () => {
  const successMessage = createMessage(successTemplate, 'success', () => {
    successMessage.remove();
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleOutsideClick);
    clearForm();
  });

  // Используем более надежный способ добавления сообщения в DOM
  const messageContainer = document.createElement('div');
  messageContainer.id = 'message-container'; // Создаем контейнер для сообщений
  messageContainer.appendChild(successMessage);
  document.body.appendChild(messageContainer);

  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleOutsideClick);
};


export const showErrorMessage = (message) => {
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
    const submitButton = uploadForm.querySelector('.img-upload__submit');
    submitButton.disabled = true;

    const isValid = pristine.validate();
    if (isValid) {
      try {
        await sendData(new FormData(evt.target));
        overlayCloseHandler();
        resetEffects();
        await showSuccessMessage();
        clearForm();
      } catch (error) {
        // Более подробная обработка ошибок для лучшего информирования пользователя
        const errorMessage = error.message;
        if (errorMessage.includes('Некорректные данные')) {
          showErrorMessage('Пожалуйста, проверьте правильность введенных данных.');
        } else if (errorMessage.includes('Ошибка сети')) {
          showErrorMessage('Ошибка загрузки файла');
        } else if (errorMessage.includes('Ошибка авторизации')) {
          showErrorMessage('Ошибка авторизации. Пожалуйста, авторизуйтесь.');
        } else if (errorMessage.includes('Ошибка сервера')) {
          showErrorMessage('Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.');
        } else {
          showErrorMessage('Ошибка загрузки файла');
        }
      } finally {
        submitButton.disabled = false;
      }
    } else {
      submitButton.disabled = false;
    }
  });
};
