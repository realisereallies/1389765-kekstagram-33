const pictureModule = (() => {
  const pictureTemplate = document.querySelector('#picture').content;
  const picturesContainer = document.querySelector('.pictures');

  // Функция для создания разметки карточки
  const createPictureElement = (picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const image = pictureElement.querySelector('.picture__img');
    image.src = picture.url;
    image.alt = picture.description;

    const likes = pictureElement.querySelector('.picture__likes');
    likes.textContent = picture.likes;

    const comments = pictureElement.querySelector('.picture__comments');
    comments.textContent = picture.comments.length;
    const parentElement = pictureElement.querySelector('.picture');
    parentElement.setAttribute('data-id', picture.id); // добавляю data-id что бы по нему искать нужный массив комментариев
    return pictureElement;
  };

  // Функция для добавления карточки в DOM
  const renderPictures = (pictureData) => {
    const fragment = document.createDocumentFragment();
    pictureData.forEach((picture) => {
      const pictureElement = createPictureElement(picture);
      fragment.appendChild(pictureElement);
    });
    picturesContainer.appendChild(fragment);
  };

  return {
    renderPictures,
    createPictureElement,
  };
})();

export { pictureModule };
