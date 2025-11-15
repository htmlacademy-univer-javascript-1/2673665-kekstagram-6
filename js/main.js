
import { generatePhotos } from './photos.js';

import { renderThumbnail } from './thumbnails.js';

const userPhotos = generatePhotos();

const picturesContainer = document.querySelector('.pictures');

renderThumbnail(userPhotos, picturesContainer);

export { userPhotos };
