const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const formElement = document.querySelector('.img-upload__form');
const scaleControlSmallerElement = formElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = formElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = formElement.querySelector('.scale__control--value');
const previewImageElement = formElement.querySelector('.img-upload__preview img');

const applyScale = (value) => {
  scaleControlValueElement.value = `${value}%`;
  previewImageElement.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleControlValueElement.value, 10);
  const newValue = Math.max(currentValue - SCALE_STEP, SCALE_MIN);
  applyScale(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleControlValueElement.value, 10);
  const newValue = Math.min(currentValue + SCALE_STEP, SCALE_MAX);
  applyScale(newValue);
};

const initScale = () => {
  applyScale(SCALE_DEFAULT);
  scaleControlSmallerElement.addEventListener('click', onSmallerButtonClick);
  scaleControlBiggerElement.addEventListener('click', onBiggerButtonClick);
};

const resetScale = () => {
  applyScale(SCALE_DEFAULT);
};

export {initScale, resetScale};
