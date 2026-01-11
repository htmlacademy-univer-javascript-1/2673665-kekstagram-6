'use strict';
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    filter: () => 'none'
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: (value) => `grayscale(${value})`
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: (value) => `sepia(${value})`
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    filter: (value) => `invert(${value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    filter: (value) => `blur(${value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    filter: (value) => `brightness(${value})`
  }
};

export const initScaleAndEffects = () => {
  const scaleSmaller = document.querySelector('.scale__control--smaller');
  const scaleBigger = document.querySelector('.scale__control--bigger');
  const scaleValue = document.querySelector('.scale__control--value');
  const previewImage = document.querySelector('.img-upload__preview img');
  const effectLevel = document.querySelector('.img-upload__effect-level');
  const effectLevelValue = document.querySelector('.effect-level__value');
  const effectLevelSlider = document.querySelector('.effect-level__slider');
  const effectRadios = document.querySelectorAll('.effects__radio');
  const uploadOverlay = document.querySelector('.img-upload__overlay');

  if (!scaleSmaller || !scaleBigger || !scaleValue || !previewImage || !effectLevel || !effectLevelValue || !effectLevelSlider || !effectRadios.length) {
    return;
  }

  let currentScale = SCALE_DEFAULT;
  let slider = null;

  const updateScale = (value) => {
    currentScale = value;
    scaleValue.value = `${value}%`;
    previewImage.style.transform = `scale(${value / 100})`;
  };

  const resetScale = () => {
    updateScale(SCALE_DEFAULT);
  };

  scaleSmaller.addEventListener('click', () => {
    const newScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
    updateScale(newScale);
  });

  scaleBigger.addEventListener('click', () => {
    const newScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
    updateScale(newScale);
  });

  const updateEffect = (effectName) => {
    const effect = EFFECTS[effectName];

    if (effectName === 'none') {
      previewImage.style.filter = '';
      effectLevel.classList.add('hidden');
      if (slider) {
        slider.destroy();
        slider = null;
      }
      effectLevelValue.value = '';
    } else {
      effectLevel.classList.remove('hidden');

      if (slider) {
        slider.destroy();
        slider = null;
      }

      slider = noUiSlider.create(effectLevelSlider, {
        range: {
          min: effect.min,
          max: effect.max
        },
        start: effect.max,
        step: effect.step,
        connect: 'lower'
      });

      slider.on('update', (values) => {
        const sliderValue = parseFloat(values[0]);
        effectLevelValue.value = sliderValue;
        previewImage.style.filter = effect.filter(sliderValue);
      });

      effectLevelValue.value = effect.max;
      previewImage.style.filter = effect.filter(effect.max);
    }
  };

  effectRadios.forEach((radio) => {
    radio.addEventListener('change', (evt) => {
      const effectName = evt.target.value;
      updateEffect(effectName);
    });
  });

  const resetEffects = () => {
    const noneRadio = document.querySelector('#effect-none');
    if (noneRadio) {
      noneRadio.checked = true;
      updateEffect('none');
    }
  };

  const resetAll = () => {
    resetScale();
    resetEffects();
  };

  uploadOverlay.addEventListener('reset', resetAll);

  resetScale();
  resetEffects();
};
