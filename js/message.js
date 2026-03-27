import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showMessage = (nodeElement, type) => {
  const buttonElement = nodeElement.querySelector('button');

  document.body.appendChild(nodeElement);

  const removeElement = () => {
    nodeElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOverlayClick);
  };

  const onButtonClick = () => removeElement();

  function onOverlayClick(evt) {
    if (evt.target === document.body.querySelector(`.${type}`)) {
      removeElement();
    }
  }

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      removeElement();
    }
  }

  buttonElement.addEventListener('click', onButtonClick);
  document.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  const successElement = successTemplate.cloneNode(true);

  showMessage(successElement, 'success');
};

const showErrorMessage = () => {
  const errorElement = errorTemplate.cloneNode(true);

  showMessage(errorElement, 'error');
};

const showDataErrorMessage = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.cloneNode(true);
  const dataErrorElement = dataErrorTemplate.querySelector('.data-error');

  document.body.appendChild(dataErrorElement);

  const DATA_ERROR_TIMEOUT = 5000;

  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_TIMEOUT);
};

export {showSuccessMessage, showErrorMessage, showDataErrorMessage};
