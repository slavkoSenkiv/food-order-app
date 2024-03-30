export function isEmail(text) {
  if (text.includes('@') && text.includes('.')) {
    return true;
  } else {
    return false;
  }
}

export function hasCorrectLength(text, minLen, maxLen) {
  if (text.length >= minLen && text.length <= maxLen) {
    return true;
  } else {
    return false;
  }
}

export function charCheck(text, mustCharArr, forbidenCharArr) {
  mustCharArr.forEach((char) => {
    if (!text.includes(char)) {
      console.log(`in "${text}" value required character "${char}" is missing`);
      return false;
    }
  });
  forbidenCharArr.forEach((char) => {
    if (text.includes(char)) {
      console.log(`in "${text}" value forbidden character "${char}" is present`);
      return false;
    }
    console.log(`for value "${text}" all checks passed`);
    return true;
  });
}
