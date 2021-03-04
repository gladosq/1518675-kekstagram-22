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

cancelButton.addEventListener('click', function() {
  hideEditor();
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    hideEditor();
  }
});

smallerButton.addEventListener('click', function() {
  if (scaleControl.value == '100%') {
    scaleControl.value = '75%';
    scaleControlValue == 75;
    imgUpldoadPreview.classList.add('scale-75-percent');
  } else if (scaleControl.value == '75%') {
    scaleControl.value = '50%';
    scaleControlValue == 50;
    imgUpldoadPreview.classList.remove('scale-75-percent');
    imgUpldoadPreview.classList.add('scale-50-percent');
  } else if (scaleControl.value == '50%') {
    scaleControl.value = '25%';
    scaleControlValue == 25;
    imgUpldoadPreview.classList.remove('scale-50-percent');
    imgUpldoadPreview.classList.add('scale-25-percent');
  }
});

biggerButton.addEventListener('click', function() {
  if (scaleControl.value == '25%') {
    scaleControl.value = '50%';
    scaleControlValue == 50;
    imgUpldoadPreview.classList.remove('scale-25-percent');
    imgUpldoadPreview.classList.add('scale-50-percent');
  } else if (scaleControl.value == '50%') {
    scaleControl.value = '75%';
    scaleControlValue == 75;
    imgUpldoadPreview.classList.remove('scale-50-percent');
    imgUpldoadPreview.classList.add('scale-75-percent');
  } else if (scaleControl.value == '75%') {
    scaleControl.value = '100%';
    scaleControlValue == 100;
    imgUpldoadPreview.classList.remove('scale-75-percent');
    imgUpldoadPreview.classList.add('scale-100-percent');
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
});



function changePreviewEffect () {
  let effects = document.querySelectorAll('.effects__radio');
  effectsSlider.classList.add('hidden');
  effects.forEach((effect) => {
    effect.addEventListener('change', function() {
      if (effect.id == 'effect-chrome') {
        effectsSlider.classList.remove('hidden');
        imgUpldoadPreview.className = 'img-upload__preview';
        imgUpldoadPreview.classList.add('effects__preview--chrome');
        changeSliderOptions(0, 1, 1, 0.1);
        effectsSlider.noUiSlider.on('update', (_, handle, unencoded) => {
          effectLevelValue.value = unencoded[handle];
          imgUpldoadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
        })
      } else if (effect.id == 'effect-sepia') {
        effectsSlider.classList.remove('hidden');
        imgUpldoadPreview.className = 'img-upload__preview';
        imgUpldoadPreview.classList.add('effects__preview--sepia');
        changeSliderOptions(0, 1, 1, 0.1);
        effectsSlider.noUiSlider.on('update', (_, handle, unencoded) => {
          effectLevelValue.value = unencoded[handle];
          imgUpldoadPreview.style.filter = `sepia(${effectLevelValue.value})`;
        })
      } else if (effect.id == 'effect-marvin') {
        effectsSlider.classList.remove('hidden');
        imgUpldoadPreview.className = 'img-upload__preview';
        imgUpldoadPreview.classList.add('effects__preview--marvin');
        changeSliderOptions(0, 100, 100, 1);
        effectsSlider.noUiSlider.on('update', (_, handle, unencoded) => {
          effectLevelValue.value = unencoded[handle];
          imgUpldoadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
        })
      } else if (effect.id == 'effect-phobos') {
        if (effectsSlider.classList.contains('hidden')) {
          effectsSlider.classList.remove('hidden');
        }
        imgUpldoadPreview.className = 'img-upload__preview';
        imgUpldoadPreview.classList.add('effects__preview--phobos');
        changeSliderOptions(0, 3, 3, 0.1);
        effectsSlider.noUiSlider.on('update', (_, handle, unencoded) => {
          effectLevelValue.value = unencoded[handle];
          imgUpldoadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
        })
      } else if (effect.id == 'effect-heat') {
        effectsSlider.classList.remove('hidden');
        imgUpldoadPreview.className = 'img-upload__preview';
        imgUpldoadPreview.classList.add('effects__preview--heat');
        changeSliderOptions(1, 3, 3, 0.1);
        effectsSlider.noUiSlider.on('update', (_, handle, unencoded) => {
          effectLevelValue.value = unencoded[handle];
          imgUpldoadPreview.style.filter = `brightness(${effectLevelValue.value})`;
        })
      } else {
        effectsSlider.classList.add('hidden');
        imgUpldoadPreview.style.filter = 'none';

      }
    })
  })
}

changePreviewEffect();

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
