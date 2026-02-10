// module2-task1
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

//дополнительное задание из module2-task1
function getNumbersFromString (someString) {
  someString = someString.toString();
  let result = '';

  for (let i = 0; i < someString.length; i++) {
    let symbol = someString[i];
    symbol = parseInt(symbol, 10);

    if (!Number.isNaN(symbol)) {
      result += symbol;
    }
  }

  return Number(result);
}

getNumbersFromString('2023 год');
getNumbersFromString('ECMAScript 2022');
getNumbersFromString('1 кефир, 0.5 батона');
getNumbersFromString('агент 007');
getNumbersFromString('а я томат');
getNumbersFromString(2023);
getNumbersFromString(-1);
getNumbersFromString(1.5);

//module5-task2
const getTimeInMinutes = (stringTime) => {
  const minutesInHour = 60;
  const splitedStringTime = stringTime.split(':');
  const stringTimeInInteger = splitedStringTime.map((i) => Number(i));

  return stringTimeInInteger[0] * minutesInHour + stringTimeInInteger[1];
};

const isMeetingAvailable = (startWorkingTime, endWorkingTime, startMeetingTime, meetingTime) => {
  const startWorkingInMinutes = getTimeInMinutes(startWorkingTime);
  const endWorkingInMinutes = getTimeInMinutes(endWorkingTime);
  const startMeetingInMinutes = getTimeInMinutes(startMeetingTime);
  const endMeetingInMinutes = startMeetingInMinutes + meetingTime;

  return startMeetingInMinutes >= startWorkingInMinutes && endMeetingInMinutes <= endWorkingInMinutes;
};

isMeetingAvailable('08:00', '17:30', '14:00', 90);
isMeetingAvailable('8:0', '10:0', '8:0', 120);
isMeetingAvailable('08:00', '14:30', '14:00', 90);
isMeetingAvailable('14:00', '17:30', '08:0', 90);
isMeetingAvailable('8:00', '17:30', '08:00', 900);
