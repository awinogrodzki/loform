import {
  FormValidationStrategy,
  FormErrorsMap,
  InputDescriptor,
} from './../../../types';

export const onlyOnSubmit: FormValidationStrategy = {
  getErrorsOnInputUpdate: (
    input: InputDescriptor,
    errors: FormErrorsMap,
    prevErrors: FormErrorsMap,
  ) => {
    const newErrors = new Map();

    for (const [inputId, inputErrors] of Array.from(errors.entries())) {
      newErrors.set(
        inputId,
        inputErrors.filter(error =>
          (prevErrors.get(inputId) || []).includes(error),
        ),
      );
    }

    return newErrors;
  },
};
