
import { openDataError } from './data-error.js';

export const fetchData = () => fetch(
  'https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) =>{
    if (!response.ok) {
      openDataError(`Ошибка запроса: ${response.status}`);
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Ошибка при получении данных:', error);
  });
