function getRandomNumber (min, max) {
  if ((typeof min) == 'number' && (typeof max) == 'number') {
    if (min == Math.floor(min) && max == Math.floor(max)) {
      if (min < max && min >= 0 && max >= 0) {
        let randomCalculation = min + Math.random() * (max + 1 - min);
        randomCalculation = Math.floor(randomCalculation);
        return randomCalculation;
      }
    }
  }
  return false;
}

function lengthStringCheck (string, maxStringSize) {
  if ((typeof string) == 'string' && (typeof maxStringSize) == 'number') {
    return (string.length < maxStringSize);
  }
  return false;
}

alert(getRandomNumber());
alert(lengthStringCheck());



