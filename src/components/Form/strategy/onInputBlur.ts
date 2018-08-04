import { onlyOnSubmit } from './onlyOnSubmit';
import { FormValidationStrategy, FormErrors } from '../../../types';

export const onInputBlur: FormValidationStrategy = {
  getErrorsOnFormMount: () => {
    return {};
  },

  getErrorsOnInputBlur: (
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

  getErrorsOnInputUpdate: (
    inputName: string,
    errors: FormErrors,
    prevErrors: FormErrors,
  ) => {
    return onlyOnSubmit.getErrorsOnInputUpdate(inputName, errors, prevErrors);
  },
};
