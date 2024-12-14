import { renderComments } from './render-comment.js';
import { isEscape } from './util.js';

const COMMENTS_TO_LOAD = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const likesCount = document.querySelector('.likes-count');
const bigPictureImage = document.querySelector('.big-picture__img img');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentsList = document.querySelector('.social__comments');
const socialCommentShownCount = document.querySelector('.social__comment-shown-count'); // Элемент для отображения показанных комментариев
const socialComment = document.querySelector('.social__caption');
const body = document.querySelector('body');


let loadedComments = 0;
let currentImageData;

export function openBigPicture(dataImage) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialCommentsList.innerHTML = '';
  socialComment.textContent = dataImage.description;
  likesCount.textContent = dataImage.likes;
  socialCommentTotalCount.textContent = dataImage.comments.length;
  bigPictureImage.src = dataImage.url;
  currentImageData = dataImage; // Сохраняем данные изображения
  loadedComments = 0;
  contentLoadHandler();

  // обработчик события для кнопки загрузки комментариев, добавляем только один раз
  commentsLoader.addEventListener('click', contentLoadHandler, { once: true });

  // скрываем кнопку, если комментарии закончились
  if (loadedComments >= dataImage.comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

function contentLoadHandler() {
  const totalComments = currentImageData.comments.length;
  const commentsToLoadNow = Math.min(COMMENTS_TO_LOAD, totalComments - loadedComments);
  const limitedComments = currentImageData.comments.slice(loadedComments, loadedComments + commentsToLoadNow);

  renderComments(limitedComments);
  loadedComments += limitedComments.length;
  socialCommentShownCount.textContent = loadedComments;

  if (loadedComments >= totalComments) {
    commentsLoader.classList.add('hidden');
  }
}

commentsLoader.addEventListener('click', contentLoadHandler);

bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});
