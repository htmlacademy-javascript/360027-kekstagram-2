import {generatePhotos} from './create-array-photos.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const userPhotos = generatePhotos();

const thumbnailFragment = document.createDocumentFragment();

userPhotos.forEach(({url, description, comments, likes}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const imageElement = thumbnailElement.querySelector('.picture__img');
  const commentsElement = thumbnailElement.querySelector('.picture__comments');
  const likesElement = thumbnailElement.querySelector('.picture__likes');
  imageElement.src = url;
  imageElement.alt = description;
  commentsElement.textContent = comments.length;
  likesElement.textContent = likes;
  thumbnailFragment.appendChild(thumbnailElement);
});

thumbnailsContainer.appendChild(thumbnailFragment);
