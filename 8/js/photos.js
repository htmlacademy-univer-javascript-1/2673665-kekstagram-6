
import { getRandomInteger } from './utils.js';
import { DESCRIPTIONS } from './data.js';
import { createComment } from './comments.js';


export const createPhoto = (id) => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];


  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: comments
  };
};

export const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};
