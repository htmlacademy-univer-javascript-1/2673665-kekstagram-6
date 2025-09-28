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