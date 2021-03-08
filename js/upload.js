import 'https://unpkg.com/nouislider@14.6.3/distribute/nouislider.min.js';

const imgInput = document.querySelector('#upload-file');
const imgEditor = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const imgUpldoadPreview = document.querySelector('.img-upload__preview');
const effectsSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let scaleControlValue = 100;
effectLevelValue.value = 100;

imgInput.addEventListener('change', function() {
  imgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

function hideEditor () {
  imgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgInput.value = '';
}

function hideEditorHandler (e) {
  if (e.type === 'keydown' && e.key !== 'Escape') {
    return;
  }
  hideEditor();
}

cancelButton.addEventListener('click', hideEditorHandler);

window.addEventListener('keydown', hideEditorHandler);

function changeValue (step) {
  imgUpldoadPreview.classList.remove('scale-' + scaleControlValue + '-percent');

  let newValue = parseInt(scaleControl.value) + step;
  scaleControl.value = newValue + '%';
  scaleControlValue = newValue;
  imgUpldoadPreview.classList.add('scale-' + newValue + '-percent');
}

smallerButton.addEventListener('click', function() {
  if (scaleControl.value != '25%') {
    changeValue(-25);
  }
});

biggerButton.addEventListener('click', function() {
  if (scaleControl.value != '100%') {
    changeValue(25);
  }
});

window.noUiSlider.create(effectsSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const previewEffects = {
  'effect-chrome': {
    class: 'effects__preview--chrome',
    filter: 'grayscale(',
    filterEnding: '',
    minValue: 0,
    maxValue: 1,
    start: 1,
    step: 0.1,
  },
  'effect-sepia': {
    class: 'effects__preview--sepia',
    filter: 'sepia(',
    filterEnding: '',
    minValue: 0,
    maxValue: 1,
    start: 1,
    step: 0.1,
  },
  'effect-marvin': {
    class: 'effects__preview--marvin',
    filter: 'invert(',
    filterEnding: '%',
    minValue: 0,
    maxValue: 100,
    start: 100,
    step: 1,
  },
  'effect-phobos': {
    class: 'effects__preview--phobos',
    filter: 'blur(',
    filterEnding: 'px',
    minValue: 0,
    maxValue: 3,
    start: 3,
    step: 0.1,
  },
  'effect-heat': {
    class: 'effects__preview--heat',
    filter: 'brightness(',
    filterEnding: '',
    minValue: 1,
    maxValue: 3,
    start: 3,
    step: 0.1,
  },
}

function changePreviewEffect () {
  let effects = document.querySelectorAll('.effects__radio');
  effectsSlider.classList.add('hidden');
  effects.forEach((effect) => {
    effect.addEventListener('change', function() {
      if (effect.id == 'effect-none') {
        effectsSlider.classList.add('hidden');
        imgUpldoadPreview.style.filter = 'none';
      } else {
        effectsSlider.noUiSlider.off();

        effectsSlider.classList.remove('hidden');
        imgUpldoadPreview.className = 'img-upload__preview';
        imgUpldoadPreview.classList.add(previewEffects[effect.id].class);
        changeSliderOptions(previewEffects[effect.id].minValue, previewEffects[effect.id].maxValue, previewEffects[effect.id].start, previewEffects[effect.id].step);

        effectsSlider.noUiSlider.on('update', (values, handle) => {
          effectLevelValue.value = values[handle];
          imgUpldoadPreview.style.filter = previewEffects[effect.id].filter + effectLevelValue.value + previewEffects[effect.id].filterEnding + ')';
        })
      }
    })
  })
}

function changeSliderOptions (minValue, maxValue, start, step) {
  effectsSlider.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: start,
    step: step,
  })
}

export {changePreviewEffect};
