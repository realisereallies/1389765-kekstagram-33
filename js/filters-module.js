import { renderPictures } from './render-image';
import { debounce } from './data.js';
import { sortArray, compareComments } from './util';

const imageFiltersButtons = document.querySelectorAll('.img-filters__button');

function onFiltersChange (filter) {
  imageFiltersButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filter.classList.add('img-filters__button--active');
  return filter.id;
}

export const sortPictures = (pictures, cb) => {
  imageFiltersButtons.forEach((currentButton) => {
    const sortPicturesDebounce = debounce((filter) => {
      let currentPictures = pictures;
      switch (filter) {
        case 'filter-random':
          currentPictures = sortArray(pictures)
            .slice(0, 10);
          break;
        case 'filter-discussed':
          currentPictures = pictures.slice()
            .sort(compareComments);
          break;
        default:
          currentPictures = pictures;
          break;
      }
      renderPictures(currentPictures, cb);
    },

    500);

    currentButton.addEventListener('click', () => {
      const filterType = onFiltersChange(currentButton);
      sortPicturesDebounce(filterType);
    });
  });
};
