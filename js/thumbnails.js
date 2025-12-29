'use strict';
import { openFullPhoto } from './full-photo.js';

const createThumbnail = (pictureData) => {
    const pictureTemplate = document.querySelector('#picture');
    const thumbnailElement = pictureTemplate.content.querySelector('.picture').cloneNode(true);

    const thumbImg = thumbnailElement.querySelector('.picture__img');
    thumbImg.src = pictureData.url;
    thumbImg.alt = pictureData.description;

    const thumbComments = thumbnailElement.querySelector('.picture__comments');
    thumbComments.textContent = pictureData.comments.length;

    const thumbLikes = thumbnailElement.querySelector('.picture__likes');
    thumbLikes.textContent = pictureData.likes;

    thumbnailElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        openFullPhoto(pictureData);
    });

    return thumbnailElement;
};

const renderThumbnail = (picturesList, pictureContainer) => {
    // Находим форму загрузки перед очисткой
    const uploadForm = pictureContainer.querySelector('.img-upload');

    // Полностью очищаем контейнер
    pictureContainer.innerHTML = '';

    // Добавляем форму загрузки обратно
    if (uploadForm) {
        pictureContainer.appendChild(uploadForm);
    }

    // Создаем фрагмент для эффективного добавления
    const renderFragment = document.createDocumentFragment();

    picturesList.forEach((pictureItem) => {
        const thumbnail = createThumbnail(pictureItem);
        renderFragment.appendChild(thumbnail);
    });

    pictureContainer.appendChild(renderFragment);
};

export { renderThumbnail };
