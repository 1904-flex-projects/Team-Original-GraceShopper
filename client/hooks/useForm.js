import { useState } from 'react';
import { callbackify } from 'util';

const useForm = (onSubmit, initialState) => {
  if (!initialState) {
    throw new Error('initial state required');
  }
  const [values, setValues] = useState(initialState);

  const handleChange = evt => {
    evt.persist();
    setValues(vals => ({ ...vals, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = evt => {
    if (evt) {
      evt.preventDefault();
    }
    console.log('handling submit');
    onSubmit(values);
  };

  return [values, setValues, handleChange, handleSubmit];
};

export default useForm;
