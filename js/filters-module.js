import { renderPictures } from './render-image';
import { debounce } from './data.js';
import { sortArray, compareComments } from './util';

const imageFiltersButtons = document.querySelectorAll('.img-filters__button');
let currentPictures = []; // Глобальная переменная для хранения текущего массива изображений

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
      switch (filter) {
        case 'filter-random':
          currentPictures = sortArray([...pictures]).slice(0, 10); // Создаем копию и обрезаем
          break;
        case 'filter-discussed':
          currentPictures = [...pictures].sort(compareComments); // Создаем копию и сортируем
          break;
        case 'filter-default': // Добавим явное имя для обычной сортировки
          currentPictures = [...pictures]; // Создаем копию, без сортировки
          break;
        default:
          currentPictures = [...pictures]; // Создаем копию, без сортировки
          break;
      }
      renderPictures(currentPictures, cb);
    }, 500);

    currentButton.addEventListener('click', () => {
      const filterType = onFiltersChange(currentButton);
      sortPicturesDebounce(filterType);
    });
  });
};
