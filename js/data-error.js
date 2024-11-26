const dataErrorTemplate = document.querySelector('#data-error');

export const openDataError = (message) => {
  const errorData = dataErrorTemplate.content.cloneNode(true).querySelector('.data-error');
  const errorTitle = errorData.querySelector('.data-error__title');
  errorTitle.textContent = message; // Используем textContent для сообщения
  document.body.appendChild(errorData);
  setTimeout(() => errorData.remove(), 5000);
};
