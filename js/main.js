import './load-image.js';
import { similarObject } from './data.js';
import { openBigPicture } from './open-image.js';
import { renderPictures } from './render-image.js';


const openBigImageCb = (dataImage) => {
  openBigPicture(dataImage);
};

renderPictures(similarObject, openBigImageCb);

