import './scale-control.js';
import './effects-control.js';
import { sortPictures } from './filters-module.js';
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
  .then((pictures) => {
    renderPictures(pictures, openBigImageCb);
    sortPictures (pictures, openBigImageCb);
    const imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
  })
  .catch(() => {
    openDataError();
  });


setUserFormSubmit(closeOverlay);
