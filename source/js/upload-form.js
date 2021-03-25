import {sendData} from './api.js';
import {closeSuccessForm, showErrorModal} from './upload.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const submitForm = document.querySelector('.img-upload__form');

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;

const invalidSymbols = ['#', '@', '$', '!', '~', '`', '"', '№', ';', '%', '^', ':', '?', '&', '*', '(', ')', '-', '_', '+', '=', '<', '>', '/', '.', ','];

function checkValidityHashtag (hashtag) {
  for (let i = 1; i < hashtag.length - 1; i++) {
    for (let j = 0; j < invalidSymbols.length; j++) {
      if (hashtag[i] == invalidSymbols[j]) {
        return false;
      }
    }
  }
  return true;
}

let possibilitySubmit = true;
hashtagsInput.addEventListener('input', (evt) => {
  let hashtags = hashtagsInput.value.split(' ');

  hashtags.forEach((hashtag) => {
    let lowerCaseValue = hashtag.toLowerCase();

    if (lowerCaseValue[0] != '#') {
      hashtagsInput.setCustomValidity('Хэштег должен начинаться с решётки');
      possibilitySubmit = false;
    } else if (checkValidityHashtag(lowerCaseValue) == false) {
      hashtagsInput.setCustomValidity('Введены некорректные символы');
      possibilitySubmit = false;
    } else if (lowerCaseValue.length > MAX_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity('Превышена максимальная длина хэштега');
      possibilitySubmit = false;
    } else if (hashtags.length > MAX_HASHTAGS_COUNT) {
      hashtagsInput.setCustomValidity('Максимальное кол-во хэштегов - 5');
      possibilitySubmit = false;
    } else if (lowerCaseValue.length > 1 && invalidSymbols.includes(evt.data)) {
      hashtagsInput.setCustomValidity('Введены некорректные символы');
      possibilitySubmit = false;
    } else {
      hashtagsInput.setCustomValidity('');
      possibilitySubmit = true;
    }

    if (hashtagsInput.value == '') {
      hashtagsInput.setCustomValidity('');
      possibilitySubmit = true;
    }
  })

  hashtagsInput.reportValidity();
});

function checkSubmitForm (hashtags) {
  let hashtagsValues = hashtags.split(' ');

  hashtagsValues.forEach((hashtag) => {
    if (hashtagsValues.indexOf(hashtag) !== hashtagsValues.lastIndexOf(hashtag)) {
      hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
      possibilitySubmit = false;
    } else if (hashtag == '#') {
      hashtagsInput.setCustomValidity('Хэштеги не должен состоять из одной решётки');
      possibilitySubmit = false;
    }

    if (possibilitySubmit) {
      hashtagsInput.style.borderColor = '';
      hashtagsInput.style.color = '';
      hashtagsInput.style.outline = '';
    } else {
      hashtagsInput.style.borderColor = 'tomato';
      hashtagsInput.style.color = 'tomato';
      hashtagsInput.style.outline = '2px solid tomato';
    }
  })
}

submitForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  checkSubmitForm(hashtagsInput.value);

  const formData = new FormData(evt.target);

  sendData(
    () => closeSuccessForm(),
    () => showErrorModal(),
    new FormData(evt.target),
  );

  hashtagsInput.reportValidity();
});
