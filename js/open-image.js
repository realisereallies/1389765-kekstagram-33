import { similarObject } from './data.js';
import { pictureModule } from './module.js';
import { renderComments } from './render-image.js';

pictureModule.renderPictures(similarObject);


const similarObjectsCopy = Array.from(similarObject); // создаю копию массива, чтобы получить из нее комментарии

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCaption = document.querySelector('.social__caption');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialCommentShownCount = document.querySelector('.social__comment-shown-count'); // Элемент для отображения показанных комментариев
const likesCount = document.querySelector('.likes-count');
const bigPictureImage = document.querySelector('.big-picture__img img');
const pictureLinks = document.querySelectorAll('.picture');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentsList = document.querySelector('.social__comments');

const commentsToLoad = 5; // количество комментариев, загружаемых за раз
let loadedComments = 0; // количество уже загруженных комментариев
let currentImageData; // хранит данные текущего изображения

function openBigPicture(evt) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  socialCommentsList.innerHTML = '';
  likesCount.textContent = evt.currentTarget.querySelector('.picture__likes').textContent;
  socialCommentTotalCount.textContent = evt.currentTarget.querySelector('.picture__comments').textContent;

  const currentImage = evt.currentTarget.querySelector('.picture__img');
  bigPictureImage.src = currentImage.src;
  socialCaption.textContent = currentImage.alt;

  const imageId = evt.currentTarget.dataset.id; // получаю id как строку
  currentImageData = similarObjectsCopy.find((image) => image.id === Number(imageId)); // привожу imageId к числу для сравнения

  const totalComments = currentImageData.comments.length;

  loadedComments = 0; // сбрасываю счетчик загруженных комментариев
  loadComments(); // загружаю первые комментарии

  if (loadedComments >= totalComments) {
    commentsLoader.classList.add('hidden');
    socialCommentCount.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
    socialCommentCount.classList.remove('hidden');
  }
}

function loadComments() {
  const totalComments = currentImageData.comments.length;
  const limitedComments = currentImageData.comments.slice(loadedComments, loadedComments + commentsToLoad);

  renderComments(limitedComments);
  loadedComments += limitedComments.length; // увеличиваю счетчик загруженных комментов

  // обновляю количество показанных комментариев
  socialCommentShownCount.textContent = loadedComments;

  // если загружены все комментарии, скрываем кнопку загрузки
  if (loadedComments >= totalComments) {
    commentsLoader.classList.add('hidden');
  }
}

// слушатель события для кнопки загрузки комментариев
commentsLoader.addEventListener('click', loadComments);

pictureLinks.forEach((pictureLink) => {
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
