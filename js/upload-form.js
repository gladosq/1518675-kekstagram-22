const hashtagsInput = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('.img-upload__submit');

const MIN_HASHTAG_LENGTH = 3;
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
    } else if (hashtags.length > 5) {
      hashtagsInput.setCustomValidity('Максимальное кол-во хэштегов - 5');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  })

  hashtagsInput.reportValidity();
});

let hashtagsArray = [];
submitButton.addEventListener('click', function (evt) {

  let hashtags = hashtagsInput.value.split(' ');
  hashtags.forEach((hashtag) => {
    hashtagsArray.push(hashtag);
  });

  for (let i = 0; i < hashtagsArray.length; i++) {
    let newElement = hashtagsArray[i];
    hashtagsArray.splice(i, 1);

    for (let j = 0; j < hashtagsArray.length; j++) {
      if (newElement == hashtagsArray[j]) {
        evt.preventDefault();
        break;
      }
    }
  }
});
