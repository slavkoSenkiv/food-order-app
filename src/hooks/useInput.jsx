import { useState } from 'react';

export default function useInput(propName, startUserInfoObj, inputValidationFn) {
  const [enteredValue, setEnteredValue] = useState(startUserInfoObj[propName]);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = inputValidationFn(enteredValue);
  
  function handleInputChange(event) {
    const newValue = event.target.value;
    startUserInfoObj[propName] = newValue;
    setEnteredValue(newValue);
    localStorage.setItem('cachedUserInfo', JSON.stringify(startUserInfoObj));
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
