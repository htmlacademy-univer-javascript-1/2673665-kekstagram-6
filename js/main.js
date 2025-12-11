import { getData } from './api.js';
import { renderThumbnail } from './thumbnails.js';
import { initForm } from './form.js';
import { initScaleAndEffects } from './scale-and-effects.js';

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
