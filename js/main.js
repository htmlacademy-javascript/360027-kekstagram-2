const NAMES = [
  'Артем',
  'Иван',
  'Мария',
  'Анна',
  'Олег',
  'Анастасия',
  'Юлия',
  'Дмитрий',
  'Павел',
  'Татьяна',
  'Николай',
  'Петр',
  'Елена',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const PHOTO_DESCRIPTIONS = [
  'Машина',
  'Какой-то пляж',
  'Еда',
  'Закат',
  'Чей-то отдых',
  'Опять какая-то еда',
  'Фото из самолета',
  'Снова как-то машина',
];
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const PHOTO_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generatedCommentId = createIdGenerator();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createMessage = () => {
  const sentenceCount = getRandomInteger(1, 2);

  if (sentenceCount === 1) {
    return getRandomArrayElement(MESSAGES);
  }

  return `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`;
};

const createComment = () => {
  const id = generatedCommentId();
  const idAvatar = getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID);

  return {
    id: id,
    avatar: `img/avatar-${idAvatar}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };
};

const generatedPhotoId = createIdGenerator();

const createPhoto = () => {
  const id = generatedPhotoId();

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createComment),
  };
};

const photos = Array.from({length: PHOTO_COUNT}, createPhoto);

// eslint-disable-next-line no-console
console.log(photos);
