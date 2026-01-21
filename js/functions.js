function checkLength (someText, maxLength) {
  return someText.length <= maxLength;
}

checkLength('какой-то текст', 20);
checkLength('какой-то недопустимо длинный текст', 20);

function checkPalindrom (someText) {
  someText = someText.replaceAll(' ', '');
  someText = someText.toUpperCase();
  let reversedText = '';

  for (let i = someText.length - 1; i >= 0; i--) {
    const character = someText[i];
    reversedText += character;
  }

  if (reversedText === someText) {
    return true;
  }

  return false;
}

checkPalindrom('Лёша на полке клопа нашёл ');
checkPalindrom('Это точно не палиндром');
