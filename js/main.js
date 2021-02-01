function randomizer (num1, num2) {
  if (num1 < num2 && num1 >= 0 && num2 >= 0) {
    let randomValues = Math.random();  // Генерируем случайные вероятности
    let randomCalculation = num1 + randomValues * (num2 + 1 - num1);  // Подгоняем под заданные минимум и максимум
    randomCalculation = Math.floor(randomCalculation);  // Округляем до целого числа
    return randomCalculation;
  }
  return alert('Первое число не должно быть меньше или равняться второму!');
}

function lengthCalc (string, max) {
  let stringValue = string.length;
  if (stringValue > max) {
    return false;
  }
  return true;
}
