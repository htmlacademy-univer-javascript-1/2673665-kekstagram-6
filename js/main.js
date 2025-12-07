import { generatePhotos } from './photos.js';
import { renderThumbnail } from './thumbnails.js';
import { openFullPhoto } from './full-photo.js';
import { initForm } from './form.js';

const userPhotos = generatePhotos();
const picturesContainer = document.querySelector('.pictures');

renderThumbnail(userPhotos, picturesContainer);

const initializeForm = () => {
  const form = document.querySelector('#upload-select-image');
  if (form && typeof Pristine !== 'undefined') {
    initForm();
  } else {
    setTimeout(initializeForm, 100);
  }
};

window.addEventListener('load', () => {
  setTimeout(initializeForm, 100);
});

export { userPhotos };
