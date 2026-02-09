import {NAMES, MESSAGES, PHOTO_DESCRIPTIONS} from './data.js';
import {getRandomInteger, createIdGenerator, getRandomArrayElement} from './utils.js';

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const PHOTO_COUNT = 25;

const generatedCommentId = createIdGenerator();
const generatedPhotoId = createIdGenerator();

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

const getArrayPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

export {getArrayPhotos};
