const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;

import {sendData} from './api.js';
import {closeSuccessForm, showErrorModal} from './upload.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const submitForm = document.querySelector('.img-upload__form');
const descriptionInput = document.querySelector('.text__description');

const invalidSymbols = ['#', '@', '$', '!', '~', '`', '"', '№', ';', '%', '^', ':', '?', '&', '*', '(', ')', '-', '_', '+', '=', '<', '>', '/', '.', ','];

function checkValidityHashtag (hashtag) {
  for (let i = 1; i < hashtag.length - 1; i++) {
    for (let j = 0; j < invalidSymbols.length; j++) {
      if (hashtag[i] === invalidSymbols[j]) {
        return false;
      }
    }
  }
  return true;
}

let possibilitySubmit = true;
hashtagsInput.addEventListener('input', () => {
  let hashtags = hashtagsInput.value.split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    let lowerCaseValue = hashtags[i].toLowerCase();

    if (checkValidityHashtag(lowerCaseValue) === false) {
      hashtagsInput.setCustomValidity('Введены некорректные символы');
      possibilitySubmit = false;
    } else if (lowerCaseValue.length > MAX_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity('Превышена максимальная длина хэштега');
      possibilitySubmit = false;
    } else {
      hashtagsInput.setCustomValidity('');
      possibilitySubmit = true;
    }

    if (hashtagsInput.value === '') {
      hashtagsInput.setCustomValidity('');
      possibilitySubmit = true;
    }
  }

  hashtagsInput.reportValidity();
});

function checkSubmitForm (hashtags) {
  if (hashtags === '') {
    possibilitySubmit = true;
  } else {
    let hashtagsValues = hashtags.split(' ');

    hashtagsValues.some((hashtag) => {
      if (hashtag[0] !== '#' && hashtag.length > 1) {
        hashtagsInput.setCustomValidity('Хэштег должен начинаться с решётки');
        possibilitySubmit = false;
        return true;
      } else if (hashtagsValues.indexOf(hashtag) !== hashtagsValues.lastIndexOf(hashtag)) {
        hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
        possibilitySubmit = false;
        return true;
      } else if (hashtag === '#') {
        hashtagsInput.setCustomValidity('Хэштеги не должны состоять из одной решётки');
        possibilitySubmit = false;
        return true;
      } else if (checkValidityHashtag(hashtag) === false) {
        hashtagsInput.setCustomValidity('Хэштеги содержат не допустимые символы');
        possibilitySubmit = false;
        return true;
      } else if (hashtagsValues.length > MAX_HASHTAGS_COUNT) {
        hashtagsInput.setCustomValidity('Максимальное кол-во хэштегов - 5');
        possibilitySubmit = false;
        return true;
      } else {
        possibilitySubmit = true;
        return false;
      }
    })
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
}

submitForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  checkSubmitForm(hashtagsInput.value);

  if (possibilitySubmit) {
    sendData(
      () => closeSuccessForm(),
      () => showErrorModal(),
      new FormData(evt.target),
    );
  }

  hashtagsInput.reportValidity();
});

export {hashtagsInput, possibilitySubmit, descriptionInput};
