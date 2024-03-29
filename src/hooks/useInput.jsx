import { useState } from 'react';

export default function useInput(propName, defaultValue, inputValidationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = inputValidationFn(enteredValue);

  const cachedUserInfo = localStorage.getItem('cachedUserInfo');
  const userInfoObj = JSON.parse(cachedUserInfo);
  function handleInputChange(event) {
    const newValue = event.target.value;
    userInfoObj[propName] = newValue;
    setEnteredValue(newValue);
    localStorage.setItem('cachedUserInfo', JSON.stringify(userInfoObj));
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid
  };
}
