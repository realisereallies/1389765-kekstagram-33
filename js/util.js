import {handleOutsideClick} from './dispatch-status.js';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const isEscape = (evt) => evt.key === 'Escape';
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


const handleEscape = (evt) => {
  if (evt.key === 'Escape') {
    const error = document.querySelector('.error');
    const success = document.querySelector('.success');
    if (error) {
      error.remove();
    }
    if (success) {
      success.remove();
    }
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleOutsideClick);
  }
};

const sortArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const compareComments = (a, b) => b.comments.length - a.comments.length;

export {getRandomInteger, getRandomArrayElement,isEscape, handleEscape,sortArray, compareComments};
