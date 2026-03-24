import {isEscapeKey} from '../utils.js';
import {validateForm, resetValidation, setupValidation} from './validate.js';
import {initScale, resetScale} from './scale.js';
import {initEffects, resetEffects} from './effects.js';

const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const fileInputElement = formElement.querySelector('#upload-file');
const cancelButtonElement = overlayElement.querySelector('#upload-cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');

const closeUploadForm = () => {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  formElement.reset();
  resetValidation();
  resetScale();
  resetEffects();
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

const onFileInputChange = () => {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const openUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = validateForm();

  // eslint-disable-next-line no-console
  console.log({isValid});
};

const initUploadForm = () => {
  fileInputElement.addEventListener('change', onFileInputChange);
  formElement.addEventListener('submit', openUploadFormSubmit);
  setupValidation();
  initScale();
  initEffects();
};

export {initUploadForm};
