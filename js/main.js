import { generatePhotos } from './photos.js';
import { renderThumbnail } from './thumbnails.js';
import { openFullPhoto } from './full-photo.js';
import { initForm } from './form.js';
import { initScaleAndEffects } from './scale-and-effects.js';

const userPhotos = generatePhotos();
const picturesContainer = document.querySelector('.pictures');

renderThumbnail(userPhotos, picturesContainer);

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
  setTimeout(initializeForm, 100);
});

export { userPhotos };
