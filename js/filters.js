'use strict';
import { renderThumbnail } from './thumbnails.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

// Функция устранения дребезга
const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функции фильтрации
const getDefaultPhotos = (photos) => photos;

const getRandomPhotos = (photos) => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) => {
  return [...photos].sort((a, b) => b.comments.length - a.comments.length);
};

// Инициализация фильтров
export const initFilters = (photos) => {
  const filtersContainer = document.querySelector('.img-filters');
  const filterButtons = document.querySelectorAll('.img-filters__button');

  if (!filtersContainer) {
    return;
  }

  // Обработчик изменения фильтра
  const onFilterChange = (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    // Убираем активный класс у всех кнопок
    filterButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    // Добавляем активный класс выбранной кнопке
    evt.target.classList.add('img-filters__button--active');

    let filteredPhotos;
    const filterId = evt.target.id;

    // Применяем фильтр
    switch (filterId) {
      case 'filter-random':
        filteredPhotos = getRandomPhotos(photos);
        break;
      case 'filter-discussed':
        filteredPhotos = getDiscussedPhotos(photos);
        break;
      default: // 'filter-default'
        filteredPhotos = getDefaultPhotos(photos);
        break;
    }

    // Рендерим отфильтрованные фотографии
    const picturesContainer = document.querySelector('.pictures');
    renderThumbnail(filteredPhotos, picturesContainer);
  };

  // Добавляем обработчик с устранением дребезга
  const debouncedFilterHandler = debounce(onFilterChange);
  filtersContainer.addEventListener('click', debouncedFilterHandler);
};
