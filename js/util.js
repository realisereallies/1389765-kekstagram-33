import {outsideClickHandler} from './dispatch-status.js';


const isEscape = (evt) => evt.key === 'Escape';
const compareComments = (a, b) => b.comments.length - a.comments.length;

const escapeCloseHandler = (evt) => {
  if (evt.key === 'Escape') {
    const error = document.querySelector('.error');
    const success = document.querySelector('.success');
    if (error) {
      error.remove();
    }
    if (success) {
      success.remove();
    }
    document.removeEventListener('keydown', escapeCloseHandler);
    document.removeEventListener('click', outsideClickHandler);
  }
};


const sortArray = (arrays) => {
  for (let i = arrays.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrays[i], arrays[j]] = [arrays[j], arrays[i]];
  }
  return arrays;
};

export function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscape, escapeCloseHandler,sortArray, compareComments};
