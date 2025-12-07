import { generatePhotos } from './photos.js';
import { renderThumbnail } from './thumbnails.js';
import { openFullPhoto } from './full-photo.js';
import { initForm } from './form.js';

const userPhotos = generatePhotos();
const picturesContainer = document.querySelector('.pictures');

renderThumbnail(userPhotos, picturesContainer);
initForm();
export { userPhotos };
