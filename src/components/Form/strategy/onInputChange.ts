import { FormErrors, FormValidationStrategy } from '../../../types';

export const onInputChange: FormValidationStrategy = {
  getErrorsOnInputUpdate: (
    inputName: string,
    errors: FormErrors,
    prevErrors: FormErrors,
  ) => {
    if (!errors[inputName] || !errors[inputName].length) {
      const newErrors = { ...prevErrors };
      delete newErrors[inputName];

      return newErrors;
    }

    return { ...prevErrors, [inputName]: [...errors[inputName]] };
  },
};
