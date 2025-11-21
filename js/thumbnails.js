import { openFullPhoto } from './full-photo.js';

const createThumbnail = (pictureData) => {
// поиск шаблона в DOM
    const pictureTemplate = document.querySelector('#picture');
    // клонировка
    const thumbnailElement = pictureTemplate.content.querySelector('.picture').cloneNode(true);

    // Редактирование картинки
    const thumbImg = thumbnailElement.querySelector('.picture__img');
    thumbImg.src = pictureData.url;
    thumbImg.alt = pictureData.description;

    // Редактирование комментариев
    const thumbComments = thumbnailElement.querySelector('.picture__comments');
    thumbComments.textContent = pictureData.comments.length;

    // Редактирование лайков
    const thumbLikes = thumbnailElement.querySelector('.picture__likes');
    thumbLikes.textContent = pictureData.likes;

    // Добавляем обработчик клика для открытия полноразмерного просмотра
    thumbnailElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        openFullPhoto(pictureData);
    });

    return thumbnailElement;
}

// Отрисовка миниатюр
const renderThumbnail = (picturesList, pictureContainer) => {
    const renderFragment = document.createDocumentFragment();

    picturesList.forEach((pictureItem) => {
        const thumbnail = createThumbnail(pictureItem);
        renderFragment.appendChild(thumbnail);
    });

    pictureContainer.innerHTML = "";
    pictureContainer.appendChild(renderFragment);
};

export { renderThumbnail };
