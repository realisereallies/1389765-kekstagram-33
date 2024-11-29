import {openDataError} from './data-error';

export const getData = () => fetch(
  'https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (!response.ok) {

      openDataError('');
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    return response.json();
  });
export const sendData = (body) => fetch(
  'https://32.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    body,
  },
).then((response) => {
  if (!response.ok) {
    return Promise.reject(new Error(`Ошибка отправки данных: ${response.status} ${response.statusText}`));
  }
  return response.json();
}).then((data) => data).catch((error) => Promise.reject(error));
