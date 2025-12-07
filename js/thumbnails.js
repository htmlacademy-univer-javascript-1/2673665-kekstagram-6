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
    const uploadForm = pictureContainer.querySelector('.img-upload');
    const renderFragment = document.createDocumentFragment();

    picturesList.forEach((pictureItem) => {
        const thumbnail = createThumbnail(pictureItem);
        renderFragment.appendChild(thumbnail);
    });

    pictureContainer.innerHTML = "";

    if (uploadForm) {
        pictureContainer.appendChild(uploadForm);
    }

    pictureContainer.appendChild(renderFragment);
};

export { renderThumbnail };
