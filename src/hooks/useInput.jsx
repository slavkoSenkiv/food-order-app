import { useState } from 'react';

export default function useInput(defaultValue, inputValidationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = inputValidationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    localStorage.setItem('chachedUsedInfo', event.target.value);
    console.log('cache input change', localStorage.getItem('chachedUsedInfo'));
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
