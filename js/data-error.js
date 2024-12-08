const dataErrorTemplate = document.querySelector('#data-error');
let dataErrorElement = null;

export const openDataError = (message) => {
  if (dataErrorElement) {
    dataErrorElement.querySelector('.data-error__title').textContent = message;
    clearTimeout(dataErrorElement.timeoutId);
  } else {
    dataErrorElement = dataErrorTemplate.content.cloneNode(true).querySelector('.data-error');
    const errorTitle = dataErrorElement.querySelector('.data-error__title');
    errorTitle.textContent = message;
    document.body.appendChild(dataErrorElement);
  }

  dataErrorElement.timeoutId = setTimeout(() => {
    dataErrorElement.remove();
    dataErrorElement = null;
  }, 5000);
};
