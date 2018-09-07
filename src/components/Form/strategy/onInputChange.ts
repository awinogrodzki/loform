import { onInputBlur } from './onInputBlur';
import {
  FormErrorsMap,
  FormValidationStrategy,
  InputDescriptor,
} from '../../../types';

export const onInputChange: FormValidationStrategy = {
  getErrorsOnInputUpdate: (
    input: InputDescriptor,
    errors: FormErrorsMap,
    prevErrors: FormErrorsMap,
  ) => {
    const newErrors = onInputBlur.getErrorsOnInputBlur!(
      input,
      errors,
      prevErrors,
    );

    return newErrors;
  },
};
