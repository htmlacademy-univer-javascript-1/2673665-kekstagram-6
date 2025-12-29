'use strict';
import { getData } from './api.js';
import { renderThumbnail } from './thumbnails.js';
import { initForm } from './form.js';
import { initScaleAndEffects } from './scale-and-effects.js';
import { initFilters } from './filters.js'; // Добавляем импорт

const ALERT_SHOW_TIME = 5000;
let userPhotos = [];

const showAlert = (message) => {
  // ... существующий код без изменений
};

const loadPhotos = async () => {
  try {
    userPhotos = await getData();
    const picturesContainer = document.querySelector('.pictures');
    renderThumbnail(userPhotos, picturesContainer);

    // Показываем блок фильтров после загрузки данных
    const filters = document.querySelector('.img-filters');
    if (filters) {
      filters.classList.remove('img-filters--inactive');
    }

    // Инициализируем фильтры
    initFilters(userPhotos);
  } catch (error) {
    showAlert(error.message);
    userPhotos = [];
  }
};

const initializeForm = () => {
  const form = document.querySelector('#upload-select-image');
  if (form && typeof Pristine !== 'undefined' && typeof noUiSlider !== 'undefined') {
    initForm();
    initScaleAndEffects();
  } else {
    setTimeout(initializeForm, 100);
  }
};

window.addEventListener('load', () => {
  loadPhotos();
  setTimeout(initializeForm, 100);
});

export { userPhotos };
