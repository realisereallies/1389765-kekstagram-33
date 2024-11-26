import './scale-control.js';
import './effects-control.js';
import {openDataError} from './data-error.js';
import {getData} from './api.js';
import {closeOverlay} from './load-image.js';
import {setUserFormSubmit} from'./dispatch-status.js';
import { renderPictures } from './render-image.js';
import { openBigPicture } from './open-image.js';


const openBigImageCb = (dataImage) => {
  openBigPicture(dataImage);
};

getData()
  .then((wizards) => {
    renderPictures(wizards, openBigImageCb);
  })
  .catch(() => {
    openDataError('Ошибка загрузки данных');
  });


setUserFormSubmit(closeOverlay);
