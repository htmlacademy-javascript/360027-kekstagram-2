const checkLength = (someText, maxLength) => someText.length <= maxLength;

checkLength('какой-то текст', 20);
checkLength('какой-то недопустимо длинный текст', 20);

const isPalindrom = (someText) => {
  const cleanText = someText.replaceAll(' ', '').toUpperCase();
  let reversedText = '';

  for (let i = cleanText.length - 1; i >= 0; i--) {
    const character = cleanText[i];
    reversedText += character;
  }

  return reversedText === cleanText;
};

isPalindrom('Лёша на полке клопа нашёл ');
isPalindrom('Это точно не палиндром');
