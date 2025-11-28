// ссылка на элемент полноразмерного просмотра
const bigPicture = document.querySelector('.big-picture');
//  элемент изображения внутри полноразмерного просмотра
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
//  для отображения количества лайков
const likesCount = bigPicture.querySelector('.likes-count');
// для отображения общего количества комментариев
const commentsCount = bigPicture.querySelector('.comments-count');
//  для описания фотографии
const socialCaption = bigPicture.querySelector('.social__caption');
//  для списка комментариев
const socialComments = bigPicture.querySelector('.social__comments');
//  счётчик комментариев
const commentCount = bigPicture.querySelector('.social__comment-count');
//  загрузка новых комментариев
const commentsLoader = bigPicture.querySelector('.comments-loader');
//  закрытие полноразмерного просмотра
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// функция для создания элемента комментария
const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.appendChild(img);
  commentElement.appendChild(text);

  return commentElement;
};

// функция для отрисовки комментариев
const renderComments = (comments) => {
  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);
};

// Функция для открытия полноразмерного просмотра
const openFullPhoto = (photo) => {
  // заполн данные
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  // Отрисовка комментарий
  renderComments(photo.comments);

  // скрыт блоков счётчика и загрузки
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // показ окна
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// функция для закрытия полноразмерного просмотра
const closeFullPhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// обработка событий для закрытия
closeButton.addEventListener('click', () => {
  closeFullPhoto();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    closeFullPhoto();
  }
});

export { openFullPhoto };
