import {isEscapeKey} from '../utils.js';
import {validateForm, resetValidation, setupValidation} from './validate.js';
import {initScale, resetScale} from './scale.js';
import {initEffects, resetEffects} from './effects.js';
import {sendData} from '../api.js';
import {showSuccessMessage, showErrorMessage} from '../message.js';

const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const fileInputElement = formElement.querySelector('#upload-file');
const cancelButtonElement = overlayElement.querySelector('#upload-cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const previewImageElement = overlayElement.querySelector('.img-upload__preview img');
const effectsPreviewElements = overlayElement.querySelectorAll('.effects__preview');

const loadPreviewImage = () => {
  const file = fileInputElement.files[0];

  if (file) {
    const objectUrl = URL.createObjectURL(file);
    previewImageElement.src = objectUrl;
    effectsPreviewElements.forEach((preview) => {
      preview.style.backgroundImage = `url(${objectUrl})`;
    });
  }
};

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
    if (document.querySelector('.error')) {
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
  loadPreviewImage();
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  blockSubmitButton();

  sendData(new FormData(formElement))
    .then(() => {
      closeUploadForm();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      unblockSubmitButton();
    });
};

const initUploadForm = () => {
  fileInputElement.addEventListener('change', onFileInputChange);
  formElement.addEventListener('submit', onFormSubmit);
  setupValidation();
  initScale();
  initEffects();
};

export {initUploadForm};
