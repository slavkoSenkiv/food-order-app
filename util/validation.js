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
      return false;
    }
  });
  forbidenCharArr.forEach((char) => {
    if (text.includes(char)) {
      return false;
    }
    return true;
  });
}
