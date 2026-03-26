import {isEscapeKey} from './utils.js';

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  const successElement = successTemplate.querySelector('.success');
  const successButtonElement = successElement.querySelector('.success__button');

  document.body.appendChild(successElement);

  const removeSuccessMessage = () => {
    document.body.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessKeydown);
  };

  const onSuccessButtonClick = () => removeSuccessMessage();

  const onSuccessOverlayClick = (evt) => {
    if (evt.target === document.body.querySelector('.success')) {
      removeSuccessMessage();
    }
  };

  function onSuccessKeydown(evt) {
    if (isEscapeKey(evt)) {
      removeSuccessMessage();
    }
  }

  successButtonElement.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('click', onSuccessOverlayClick);
  document.addEventListener('keydown', onSuccessKeydown);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');
  const errorButtonElement = errorElement.querySelector('.error__button');

  document.body.appendChild(errorElement);

  const removeErrorMessage = () => {
    document.body.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorKeydown);
  };

  const onErrorButtonClick = () => removeErrorMessage();

  const onErrorOverlayClick = (evt) => {
    if (evt.target === document.body.querySelector('.error')) {
      removeErrorMessage();
    }
  };

  function onErrorKeydown(evt) {
    if (isEscapeKey(evt)) {
      removeErrorMessage();
    }
  }

  errorButtonElement.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onErrorOverlayClick);
  document.addEventListener('keydown', onErrorKeydown);
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
