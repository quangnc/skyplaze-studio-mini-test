import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
};

export const useFormErrors = (initialValues) => {
  const [errors, setErrors] = useState(initialValues);

  return [
    errors,
    (data) => {
      setErrors(data);
    },
  ];
};
