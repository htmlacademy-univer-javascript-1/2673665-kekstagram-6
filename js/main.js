
import { generatePhotos } from './photos.js';

import { renderThumbnail } from './thumbnail.js';

const userPhotos = generatePhotos();

const picturesContainer = document.querySelector('.pictures');

renderThumbnail(userPhotos, picturesContainer);

export { userPhotos };
