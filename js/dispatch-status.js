import {uploadForm, pristine} from './load-image.js';
import {sendData} from './api.js';
import {handleEscape} from './util.js';

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
const clearForm = () => {
  uploadForm.reset();
  pristine.reset();
};

const showSuccessMessage = () => {
  const successMessage = createMessage(successTemplate, 'success', () => {
    successMessage.remove();
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleOutsideClick);
    clearForm();
  });
  document.body.insertBefore(successMessage, document.body.lastChild);
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


export const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(new FormData(evt.target))
        .then(() => showSuccessMessage())
        .catch(() => showErrorMessage('Ошибка загрузки файла'));
    }
  });
};
