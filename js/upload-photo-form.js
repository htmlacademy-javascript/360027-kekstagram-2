import {isEscapeKey} from './utils.js';

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const fileInputElement = formElement.querySelector('#upload-file');
const cancelButtonElement = overlayElement.querySelector('#upload-cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});

const parseHashtags = (value) => value.trim().toLowerCase().split(/\s+/);

function validateHashtagsFormat(value) {
  if (!value.trim()) {
    return true;
  }
  const hashtags = parseHashtags(value);
  return hashtags.every((tag) => HASHTAG_PATTERN.test(tag));
}

function validateHashtagsCount(value) {
  if (!value.trim()) {
    return true;
  }
  const hashtags = parseHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
}

function validateHashtagsUnique(value) {
  if (!value.trim()) {
    return true;
  }
  const hashtags = parseHashtags(value);
  return hashtags.length === new Set(hashtags).size;
}

function validateCommentLength(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsFormat,
  'Хэштег должен начинаться с символа "#" и содержать только буквы и цифры, максимальная длина — 20 символов'
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsCount,
  `Нельзя добавить больше ${MAX_HASHTAG_COUNT} хэштегов`
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsUnique,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  commentInputElement,
  validateCommentLength,
  `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`
);

const closeUploadForm = () => {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  formElement.reset();
  pristine.reset();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagsInputElement || document.activeElement === commentInputElement) {
      return;
    }
    closeUploadForm();
  }
}

function onCancelButtonClick() {
  closeUploadForm();
}

const openUploadForm = () => {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const initUploadForm = () => {
  fileInputElement.addEventListener('change', openUploadForm);
};

export {initUploadForm};
