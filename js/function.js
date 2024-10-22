function getStringLenght(stg,length) {
  if (stg.length >= length) {
    return true;
  }
  return false;
}

console.log(getStringLenght('hbbhbhbhb',2));

function getPalindrome(isPalindrome) {
  const checkString = isPalindrome.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = checkString.length - 1; i >= 0; i--) {
    reverseString += checkString[i];
  }

  return checkString === reverseString;
}

function getNumbers(string) {
  let result = '';
  string = string.toString();
  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    if (!isNaN(parseInt(char, 10))) {
      result += char;
    }
  }

  if (result.length > 0) {
    return parseInt(result, 10);
  } else {
    return NaN;
  }
}

