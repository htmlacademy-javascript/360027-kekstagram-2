import {renderThumbnails} from './render-thumbnails.js';
import {openBigPicture} from './render-big-picture.js';
import {debounce} from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');
const filterButtonElements = filtersElement.querySelectorAll('.img-filters__button');
const thumbnailsContainerElement = document.querySelector('.pictures');

const clearThumbnails = () => {
  const thumbnailElements = thumbnailsContainerElement.querySelectorAll('.picture');
  thumbnailElements.forEach((thumbnail) => thumbnail.remove());
};

const setActiveButton = (activeButton) => {
  filterButtonElements.forEach((button) => button.classList.remove('img-filters__button--active'));
  activeButton.classList.add('img-filters__button--active');
};

const renderFilteredPhotos = (photos, filterId) => {
  clearThumbnails();

  switch (filterId) {
    case 'filter-random':
      renderThumbnails(
        photos.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT),
        openBigPicture
      );
      break;
    case 'filter-discussed':
      renderThumbnails(
        photos.slice().sort((a, b) => b.comments.length - a.comments.length),
        openBigPicture
      );
      break;
    default:
      renderThumbnails(photos, openBigPicture);
  }
};

const initFilters = (photos) => {
  filtersElement.classList.remove('img-filters--inactive');

  const debouncedRender = debounce((filterId) => {
    renderFilteredPhotos(photos, filterId);
  }, DEBOUNCE_DELAY);

  filterButtonElements.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveButton(button);
      debouncedRender(button.id);
    });
  });
};

export {initFilters};
