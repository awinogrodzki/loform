import { onlyOnSubmit } from './onlyOnSubmit';
import {
  FormValidationStrategy,
  FormErrorsMap,
  InputDescriptor,
} from '../../../types';

export const onInputBlur: FormValidationStrategy = {
  getErrorsOnInputBlur: (
    input: InputDescriptor,
    errors: FormErrorsMap,
    prevErrors: FormErrorsMap,
  ) => {
    const newErrors = new Map();

    for (const [inputId, inputErrors] of Array.from(errors.entries())) {
      if (inputId === input.id) {
        newErrors.set(inputId, inputErrors);
        continue;
      }

      newErrors.set(
        inputId,
        inputErrors.filter(error =>
          (prevErrors.get(inputId) || []).includes(error),
        ),
      );
    }

    return newErrors;
  },

  getErrorsOnInputUpdate: (
    input: InputDescriptor,
    errors: FormErrorsMap,
    prevErrors: FormErrorsMap,
  ) => {
    return onlyOnSubmit.getErrorsOnInputUpdate!(input, errors, prevErrors);
  },
};
