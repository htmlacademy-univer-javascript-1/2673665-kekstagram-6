'use strict';
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

// переменные для комментариев
const COMMENTS_PER_PORTION = 5;
let currentComments = [];
let commentsShown = 0;

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

// функц для показа следующих комментариев
const showMoreComments = () => {
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);

  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialComments.appendChild(commentElement);
  });

  commentsShown += commentsToShow.length;

  // обновление счётчика
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  // скрываем кнопку, если все комментарии показаны
  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

// функция для отрисовки комментариев
const renderComments = (comments) => {
  socialComments.innerHTML = '';
  currentComments = comments;
  commentsShown = 0;

  // показываем блоки счётчика и загрузки
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  showMoreComments();
};

// функция для открытия полноразмерного просмотра
const openFullPhoto = (photo) => {
  // заполняем данные
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  // отрисовка комментариев
  renderComments(photo.comments);

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

// обработчик для кнопки загрузить ещё
commentsLoader.addEventListener('click', showMoreComments);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    closeFullPhoto();
  }
});

export { openFullPhoto };
