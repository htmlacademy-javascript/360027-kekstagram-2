const EFFECTS = {
  none: {
    filter: null,
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1
  },
  chrome: {
    filter: 'grayscale',
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1
  },
  sepia: {
    filter: 'sepia',
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1
  },
  marvin: {
    filter: 'invert',
    range: {min: 0, max: 100},
    start: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    range: {min: 0, max: 3},
    start: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    range: {min: 1, max: 3},
    start: 3,
    step: 0.1
  }
};

const formElement = document.querySelector('.img-upload__form');
const effectsFieldsetElement = formElement.querySelector('.img-upload__effects');
const sliderContainerElement = formElement.querySelector('.img-upload__effect-level');
const sliderElement = formElement.querySelector('.effect-level__slider');
const effectLevelValueElement = formElement.querySelector('.effect-level__value');
const previewImageElement = formElement.querySelector('.img-upload__preview img');

noUiSlider.create(sliderElement, {
  range: {min: 0, max: 1},
  start: 1,
  step: 0.1,
  connect: 'lower'
});

const applyEffect = (effectName) => {
  const effect = EFFECTS[effectName];

  if (!effect.filter) {
    previewImageElement.style.filter = '';
    sliderContainerElement.classList.add('hidden');
    return;
  }

  sliderContainerElement.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: effect.range,
    step: effect.step,
    start: effect.start
  });
};

const onSliderUpdate = () => {
  const value = sliderElement.noUiSlider.get();
  const checkedEffect = effectsFieldsetElement.querySelector('.effects__radio:checked');
  const effectName = checkedEffect.value;
  const effect = EFFECTS[effectName];

  effectLevelValueElement.value = value;

  if (effect.filter) {
    const unit = effect.unit ? effect.unit : '';
    previewImageElement.style.filter = `${effect.filter}(${value}${unit})`;
  }
};

sliderElement.noUiSlider.on('update', onSliderUpdate);

const onEffectChange = (evt) => {
  applyEffect(evt.target.value);
};

const initEffects = () => {
  applyEffect('none');
  effectsFieldsetElement.addEventListener('change', onEffectChange);
};

export {initEffects};
