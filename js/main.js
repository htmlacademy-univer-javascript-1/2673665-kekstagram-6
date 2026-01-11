'use strict';

import { getData } from './api.js';
import { renderThumbnail } from './thumbnails.js';
import { initForm } from './form.js';
import { initScaleAndEffects } from './scale-and-effects.js';
import { initFilters } from './filters.js';

const ALERT_SHOW_TIME = 5000;
let userPhotos = [];

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const loadPhotos = async () => {
  try {
    userPhotos = await getData();
    const picturesContainer = document.querySelector('.pictures');
    renderThumbnail(userPhotos, picturesContainer);

    const filters = document.querySelector('.img-filters');
    if (filters) {
      filters.classList.remove('img-filters--inactive');
    }

    initFilters(userPhotos);
  } catch (error) {
    showAlert(error.message);
    userPhotos = [];
  }
};

const initializeForm = () => {
  const form = document.querySelector('#upload-select-image');
  // Проверяем, что все необходимые библиотеки загружены
  if (form && typeof Pristine !== 'undefined') {
    initForm();
    // Инициализируем масштабирование и эффекты
    initScaleAndEffects();
  } else {
    // Если библиотеки не загрузились, пробуем снова через 100мс
    setTimeout(initializeForm, 100);
  }
};

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  loadPhotos();
  initializeForm();
});

export { userPhotos };
