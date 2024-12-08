
import { GET_DATA_LINK, SEND_DATA_LINK } from './data';

export const getData = () => fetch(
  GET_DATA_LINK)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    return response.json();
  });


export const sendData = (body) => fetch(

  SEND_DATA_LINK,

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
