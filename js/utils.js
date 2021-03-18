function getRandomNumber (min, max) {
  if ((typeof min) == 'number' && (typeof max) == 'number') {
    if (min == Math.floor(min) && max == Math.floor(max)) {
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

function lengthStringCheck (string, maxStringSize) {
  if ((typeof string) == 'string' && (typeof maxStringSize) == 'number') {
    return (string.length < maxStringSize);
  }
  return false;
}

function sortFunction (a, b) {
  return (b - a);
}

export {getRandomNumber, lengthStringCheck, getRandomElement, sortFunction};
