import { InputValidatorInterface } from '../types';

const emailValidator = (message: string): InputValidatorInterface => ({
  errorMessage: message,
  validate: (value: string) => {
    if (!value) {
      return true;
    }

    // tslint:disable-next-line
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
  },
});

export default emailValidator;
