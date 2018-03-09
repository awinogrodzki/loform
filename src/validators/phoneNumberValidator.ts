import { InputValidatorInterface } from 'types';

const phoneNumberValidator = (message: string): InputValidatorInterface => ({
  errorMessage: message,
  validate: (value: string) => {
    if (!value) {
      return true;
    }

    // tslint:disable-next-line
    const regex = /^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\/\s.]|\d)+$/;
    return regex.test(value);
  },
});

export default phoneNumberValidator;
