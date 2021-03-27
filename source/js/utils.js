function getRandomNumber (min, max) {
  if ((typeof min) === 'number' && (typeof max) === 'number') {
    if (min === Math.floor(min) && max === Math.floor(max)) {
      if (min < max && min >= 0 && max >= 0) {
        return Math.floor(min + Math.random() * (max + 1 - min));
      }
    }
  }
  return 0;
}

function getRandomElement (array) {
  let element = getRandomNumber(0, array.length - 1);
  return array[element];
}

export {getRandomElement};
