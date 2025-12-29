'use strict';
function checkLen(stringForCheck, maxLength) {
  return (stringForCheck.length <= maxLength);
}

console.log(checkLen('проверяемая строка', 20))
console.log(checkLen('проверяемая строка', 18))
console.log(checkLen('проверяемая строка', 10))


// Проверка строки на палиндромность
function Palindrome(stringPalindrome) {
  const normalString = stringPalindrome.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let index = normalString.length - 1; index >= 0; index--) {
    reverseString += normalString[index];
  }

  return (normalString === reverseString);
}

console.log(Palindrome('топот'))
console.log(Palindrome('ДовОд'))
console.log(Palindrome('Кекс'))
console.log(Palindrome('Лёша на полке клопа нашёл '))



function funk_work(work_Start, work_End, meet_Start, minutes_work) {
  function time_Minutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  //  время в минуты
  const workStartMinutes = time_Minutes(work_Start);
  const workEndMinutes = time_Minutes(work_End);
  const meetingStartMinutes = time_Minutes(meet_Start);
  const meetingEndMinutes = meetingStartMinutes + minutes_work;


  return meetingStartMinutes >= workStartMinutes &&
         meetingEndMinutes <= workEndMinutes;
}

console.log(funk_work('08:00', '17:30', '14:00', 90)); // true
console.log(funk_work('8:0', '10:0', '8:0', 120));     // true
console.log(funk_work('08:00', '14:30', '14:00', 90)); // false
console.log(funk_work('14:00', '17:30', '08:0', 90));  // false
console.log(funk_work('8:00', '17:30', '08:00', 900)); // false
