const createThumbnail = (pictureData) => {
    const pictureTemplate = document.querySelector('#picture');
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
