import {uploadForm, pristine, overlayCloseHandler, hashtagsInput, commentInput} from './load-image.js';
import {sendData} from './api.js';
import {escapeCloseHandler} from './util.js';
import { scaleValueInput, resetScale } from './scale-control.js';
import { resetEffects } from './effects-control.js';


const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const createMessage = (template, className, buttonCloseHandler) => {
  const message = template.content.cloneNode(true).querySelector(`.${className}`);
  const button = message.querySelector(`.${className}__button`);
  button.addEventListener('click', buttonCloseHandler);
  message.addEventListener('click', (evt) => {
    if (evt.target === message) {
      buttonCloseHandler();
    }
  });
  return message;
};

export const outsideClickHandler = (evt) => {
  const error = document.querySelector('.error');
  const success = document.querySelector('.success');
  if (error && !error.contains(evt.target)) {
    error.remove();
    document.removeEventListener('keydown', escapeCloseHandler);
    document.removeEventListener('click', outsideClickHandler);
  }
  if (success && !success.contains(evt.target)) {
    success.remove();
    document.removeEventListener('keydown', escapeCloseHandler);
    document.removeEventListener('click', outsideClickHandler);
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
    document.removeEventListener('keydown', escapeCloseHandler);
    document.removeEventListener('click', outsideClickHandler);
    clearForm();
  });

  // Используем более надежный способ добавления сообщения в DOM
  const messageContainer = document.createElement('div');
  messageContainer.id = 'message-container'; // Создаем контейнер для сообщений
  messageContainer.appendChild(successMessage);
  document.body.appendChild(messageContainer);

  document.addEventListener('keydown', escapeCloseHandler);
  document.addEventListener('click', outsideClickHandler);
};


export const showErrorMessage = (message) => {
  const errorElement = createMessage(errorTemplate, 'error', () => {
    errorElement.remove();
    document.removeEventListener('keydown', escapeCloseHandler);
    document.removeEventListener('click', outsideClickHandler);
  });
  const errorTitle = errorElement.querySelector('.error__title');
  errorTitle.textContent = message;
  document.body.appendChild(errorElement);
  document.addEventListener('keydown', escapeCloseHandler);
  document.addEventListener('click', outsideClickHandler);
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
