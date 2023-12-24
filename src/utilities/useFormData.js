import { useState } from 'react';

export const useFormData = (validator = null, values = {}) => {
  const [state, setState] = useState(() => ({ values }));

  const change = (evt) => {
    const { id, value } = evt.target;
    const error = validator ? validator(id, value) : '';
    evt.target.setCustomValidity(error);

    const updatedValues = {...state.values, [id]: value};
    const errors = {...state.errors, [id]: error};
    const hasError = Object.values(errors).some(x => x !== '');
    setState(hasError ? { values: updatedValues, errors } : { values: updatedValues });
  };

  const setValues = (newValues) => {
    setState({ ...state, values: newValues });
  };

  return [state, change, setValues];
};
