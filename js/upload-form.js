import {sendData} from './api.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const submitForm = document.querySelector('.img-upload__form');

// const MIN_HASHTAG_LENGTH = 3;
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

hashtagsInput.addEventListener('input', () => {
  let hashtags = hashtagsInput.value.split(' ');

  hashtags.forEach((hashtag) => {
    if (hashtag[0] != '#') {
      hashtagsInput.setCustomValidity('Хэштег должен начинаться с решётки');
    } else if (checkValidityHashtag(hashtag) == false) {
      hashtagsInput.setCustomValidity('Введены некорректные символы');
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity('Превышена максимальная длина хэштега');
    } else if (hashtags.length > MAX_HASHTAGS_COUNT) {
      hashtagsInput.setCustomValidity('Максимальное кол-во хэштегов - 5');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  })

  hashtagsInput.reportValidity();
});


submitForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(
    () => onSuccess(),
    () => () => {
      alert('Данные заполнены не верно')
    },
    new FormData(evt.target),
  );
});
