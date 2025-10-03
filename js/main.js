
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Массивы данных для генерации
const NAMES = [
  'Иван',
  'Мария',
  'Алексей',
  'Ольга',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Елена',
  'Артём',
  'Наталья'
];
const DESCRIPTIONS = [
  'Прекрасный закат на море',
  'Горный пейзаж',
  'Уютный вечер в городе',
  'Прогулка по лесу',
  'Архитектурный шедевр',
  'Момент радости',
  'Путешествие мечты',
  'Уличное искусство',
  'Кофе утром',
  'Зимняя сказка'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// генерация комментария
const createComment = () => {
  const messageCount = getRandomInteger(1, 2);
  let messageText = '';

  for (let i = 0; i < messageCount; i++) {
    const randomIndex = getRandomInteger(0, MESSAGES.length - 1);
    if (i > 0) {
      messageText += ' ';
    }
    messageText += MESSAGES[randomIndex];
  }

  return {
    id: getRandomInteger(1, 25),
    message: messageText,
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
};

// Функция для создания объекта фотографии
const createPhoto = (id) => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];

  // Генерируем комментарии
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

// Создание массива из 25 фотографий
const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

// Генерация массива фотографий
const photos = generatePhotos();
