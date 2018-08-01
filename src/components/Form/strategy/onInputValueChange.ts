import { FormValidationStrategy } from './../../../types';

export const onInputValueChange: FormValidationStrategy = {
  getErrorsOnFormMount: () => {
    return {};
  },

  getErrorsOnInputUpdate: errors => {
    return errors;
  },
};
