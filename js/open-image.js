import { similarObject} from './data.js';
import { pictureModule } from './module.js';
import { renderComments } from './render-image.js';

pictureModule.renderPictures(similarObject);


const similarObjectsCopy = Array.from(similarObject);// создаю копию массива, что бы получить из нее комментарии

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCaption = document.querySelector('.social__caption');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const likesCount = document.querySelector('.likes-count');
const bigPictureImage = document.querySelector('.big-picture__img img');
const pictureLinks = document.querySelectorAll('.picture');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentsList = document.querySelector('.social__comments');

function openBigPicture(evt) {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  socialCommentsList.innerHTML = '';
  likesCount.textContent = evt.currentTarget.querySelector('.picture__likes').textContent;
  socialCommentTotalCount.textContent = evt.currentTarget.querySelector('.picture__comments').textContent;

  const currentImage = evt.currentTarget.querySelector('.picture__img');
  bigPictureImage.src = currentImage.src;
  socialCaption.textContent = currentImage.alt;

  const imageId = evt.currentTarget.dataset.id; // получаю id как строку
  const currentImageData = similarObjectsCopy.find((image) => image.id === Number(imageId)); // привожу imageId к числу для сравнения

  renderComments(currentImageData.comments);
}

pictureLinks.forEach((pictureLink) => { //
  pictureLink.addEventListener('click', openBigPicture);
});

bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});
