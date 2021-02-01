function getRandomNumber (min, max) {
  if ((typeof min) == 'number' && (typeof max) == 'number') {
    if (min < max && min >= 0 && max >= 0) {
      let randomValues = Math.random();
      let randomCalculation = min + randomValues * (max + 1 - min);
      randomCalculation = Math.floor(randomCalculation);
      return randomCalculation;
    }
    return alert('Первое число не должно быть меньше или равняться второму!');
  }
  return alert('Введите корректные данные');
}

function getStringLength (string, maxStringSize) {
  if ((typeof string) == 'string' && (typeof maxStringSize) == 'number') {
    if (string.length > maxStringSize) {
      return false;
    }
    return true;
  }
  return alert('Введите корректные данные');
}

getRandomNumber();
getStringLength();

