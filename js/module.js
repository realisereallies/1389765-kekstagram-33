const pictureModule = (() => {
  const pictureTemplate = document.querySelector('#picture').content;
  const picturesContainer = document.querySelector('.pictures');

  const renderPictures = (pictureData) => {
    const fragment = document.createDocumentFragment();
    pictureData.forEach((picture) => {
      const pictureElement = pictureTemplate.cloneNode(true);

      const image = pictureElement.querySelector('.picture__img');
      image.src = picture.url;
      image.alt = picture.description;

      const likes = pictureElement.querySelector('.picture__likes');
      likes.textContent = picture.likes;

      const comments = pictureElement.querySelector('.picture__comments');
      comments.textContent = picture.comments.length;

      fragment.appendChild(pictureElement);
    });
    picturesContainer.appendChild(fragment);
  };

  return {
    renderPictures
  };
})();

export {pictureModule};
