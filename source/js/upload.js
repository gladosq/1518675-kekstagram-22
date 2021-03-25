import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

import {hashtagsInput} from './upload-form.js';

const imgInput = document.querySelector('#upload-file');
const imgEditor = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreviewImage = document.querySelector('.img-upload__preview-image');
const effectsSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const templateSuccessModal = document.querySelector('#success').content.querySelector('.success');
const mainPage = document.querySelector('.main');
const templateErrorModal = document.querySelector('#error').content.querySelector('.error');
const templateFailServerModal = document.querySelector('#fail-server').content.querySelector('.fail');
const imgUploadBackground = document.querySelector('.img-upload__effect-level');
const textHashtagsInput = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

let scaleControlValue = 100;
effectLevelValue.value = 100;

imgInput.addEventListener('change', function() {
  const imgFile = imgInput.files[0];
  const imgFileName = imgFile.name.toLowerCase();

  const checkFileName = FILE_TYPES.some((name) => {
    return imgFileName.endsWith(name);
  });

  if (checkFileName) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgUploadPreviewImage.src = reader.result;
    })

    reader.readAsDataURL(imgFile);
  }

  imgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  hashtagsInput.setCustomValidity('');
});

function hideEditor () {
  imgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgInput.value = '';
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.style.filter = 'none';
  let firstEffect = document.querySelector('.effects__radio');
  firstEffect.checked = true;
  effectsSlider.classList.add('hidden');
  scaleControl.value = '100%';
  hashtagsInput.style.borderColor = '';
  hashtagsInput.style.color = '';
  hashtagsInput.style.outline = '';
  hashtagsInput.setCustomValidity('');
  hashtagsInput.value = '';
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
  imgUploadPreview.classList.remove('scale-' + scaleControlValue + '-percent');

  let newValue = parseInt(scaleControl.value) + step;
  scaleControl.value = newValue + '%';
  scaleControlValue = newValue;
  imgUploadPreview.classList.add('scale-' + newValue + '-percent');
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

noUiSlider.create(effectsSlider, {
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
        imgUploadPreview.style.filter = 'none';
        imgUploadPreview.className = 'img-upload__preview';
        scaleControl.value = '100%';
        if (!imgUploadBackground.classList.contains('hidden')) {
          imgUploadBackground.classList.add('hidden');
        }
      } else {
        effectsSlider.noUiSlider.off();
        effectsSlider.classList.remove('hidden');
        if (imgUploadBackground.classList.contains('hidden')) {
          imgUploadBackground.classList.remove('hidden');
        }
        imgUploadPreview.className = 'img-upload__preview';
        scaleControl.value = '100%';
        imgUploadPreview.classList.add(previewEffects[effect.id].class);
        changeSliderOptions(previewEffects[effect.id].minValue, previewEffects[effect.id].maxValue, previewEffects[effect.id].start, previewEffects[effect.id].step);

        effectsSlider.noUiSlider.on('update', (values, handle) => {
          effectLevelValue.value = values[handle];
          imgUploadPreview.style.filter = previewEffects[effect.id].filter + effectLevelValue.value + previewEffects[effect.id].filterEnding + ')';
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

function showSuccessModal () {
  let modal = templateSuccessModal.cloneNode(true);
  mainPage.appendChild(modal);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', function () {
    modal.parentNode.removeChild(modal);
  })
  window.addEventListener('keydown', function (evt) {
    if (evt.type === 'keydown' && evt.key == 'Escape') {
      modal.parentNode.removeChild(modal);
    }
  })

  window.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('success')) {
      modal.parentNode.removeChild(modal);
    }
  })
}

function showErrorModal () {
  imgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  textHashtagsInput.value = '';
  textDescription.value = '';
  let modal = templateErrorModal.cloneNode(true);
  mainPage.appendChild(modal);
  window.addEventListener('keydown', function (evt) {
    if (evt.type == 'keydown' && evt.key == 'Escape') {
      modal.parentNode.removeChild(modal);
    }
  })
  window.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('error') || evt.target.classList.contains('error__button')) {
      modal.parentNode.removeChild(modal);
    }
  })
}

function failServerModal () {
  let modal = templateFailServerModal.cloneNode(true);
  mainPage.appendChild(modal);
  window.addEventListener('keydown', function (evt) {
    if (evt.type == 'keydown' && evt.key == 'Escape') {
      modal.parentNode.removeChild(modal);
    }
  })
  window.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('fail') || evt.target.classList.contains('fail__button')) {
      modal.parentNode.removeChild(modal);
    }
  })
}

function closeSuccessForm () {
  imgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  effectLevelValue.value = 100;
  effectsSlider.classList.add('hidden');
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.style.filter = 'none';
  imgUploadPreviewImage.className = '';
  let firstEffect = document.querySelector('.effects__radio');
  firstEffect.checked = true;
  scaleControl.value = '100%';
  textHashtagsInput.value = '';
  textDescription.value = '';
  showSuccessModal();
}

export {changePreviewEffect, hideEditorHandler, closeSuccessForm, showErrorModal, failServerModal};
