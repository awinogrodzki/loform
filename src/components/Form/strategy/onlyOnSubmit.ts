import { FormValidationStrategy, FormErrors } from './../../../types';

export const onlyOnSubmit: FormValidationStrategy = {
  getErrorsOnFormMount: () => {
    return {};
  },

  getErrorsOnInputUpdate: (errors: FormErrors, prevErrors: FormErrors) => {
    const keys = Object.keys(errors);
    const newErrors = keys.reduce((currentErrors: FormErrors, key) => {
      const errorsForKey = errors[key];
      const prevErrorsForKey = prevErrors[key];

      if (!prevErrorsForKey || prevErrorsForKey.length === 0) {
        return currentErrors;
      }

      if (!errorsForKey || errorsForKey.length === 0) {
        return currentErrors;
      }

      const filteredErrors = prevErrorsForKey.filter(error =>
        errorsForKey.includes(error),
      );

      if (!filteredErrors.length) {
        return currentErrors;
      }

      return {
        ...currentErrors,
        [key]: filteredErrors,
      };
    }, {});

    return newErrors;
  },
};
