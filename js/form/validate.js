const formElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});

const parseHashtags = (value) => value.trim().toLowerCase().split(/\s+/);

const validateHashtagsFormat = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = parseHashtags(value);
  return hashtags.every((tag) => HASHTAG_PATTERN.test(tag));
};

const validateHashtagsCount = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = parseHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const validateHashtagsUnique = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = parseHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const validateForm = () => pristine.validate();

const resetValidation = () => pristine.reset();

const setupValidation = () => {
  pristine.addValidator(
    hashtagsInputElement,
    validateHashtagsFormat,
    `Хэштег должен начинаться с символа "#" и содержать только буквы и цифры, максимальная длина — ${MAX_HASHTAG_LENGTH} символов`
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
};

export {validateForm, resetValidation, setupValidation};
