const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');


const createPictureElement = (picture, onImageClick) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');
  image.src = picture.url;
  image.alt = picture.description;
  const likes = pictureElement.querySelector('.picture__likes');
  likes.textContent = picture.likes;
  const comments = pictureElement.querySelector('.picture__comments');
  comments.textContent = picture.comments.length;
  image.addEventListener('click', () => onImageClick(picture));
  return pictureElement;
};

// Функция для добавления карточки в DOM
export const renderPictures = (pictureData, onImageClick) => {
  const fragment = document.createDocumentFragment();
  let picture = picturesContainer.querySelector('.picture');
  while(picture) {
    picture.remove();
    picture = picturesContainer.querySelector('.picture');
  }
  pictureData.forEach((pictures) => {
    const pictureElement = createPictureElement(pictures, onImageClick);
    fragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(fragment);
};

