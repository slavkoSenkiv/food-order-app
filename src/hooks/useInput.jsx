import { useState } from 'react';

export default function useInput(defaultValue, inputValidationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = inputValidationFn(enteredValue);

  function handleInputChange(event) {
    const newValue = event.target.value;
    setEnteredValue(newValue);
    localStorage.setItem('chachedUsedInfo', newValue);
    console.log('cached value', localStorage.getItem('chachedUsedInfo'));
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
