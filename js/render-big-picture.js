import {isEscapeKey} from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img')
  .querySelector('img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const createCommentElement = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  const avatarElement = document.createElement('img');
  const textElement = document.createElement('p');

  commentElement.classList.add('social__comment');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(textElement);

  return commentElement;
};

const renderBigPicture = ({url, likes, description, comments}) => {
  bigPictureImgElement.src = url;
  likesCountElement.textContent = likes;
  captionElement.textContent = description;
  commentsTotalCountElement.textContent = comments.length;
  commentShownCountElement.textContent = comments.length;

  commentsListElement.innerHTML = '';
  comments.forEach((comment) => {
    commentsListElement.appendChild(createCommentElement(comment));
  });

  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

cancelButtonElement.addEventListener('click', () => {
  closeBigPicture();
  document.removeEventListener('keydown', onDocumentKeydown);
});

const openBigPicture = (photo) => {
  renderBigPicture(photo);
  document.addEventListener('keydown', onDocumentKeydown);
};

export {openBigPicture};
