import { onlyOnSubmit } from './onlyOnSubmit';
import { FormErrors } from '../../../types';

describe('onlyOnSubmit FormValidationStrategy', () => {
  it('should return errors that were not corrected since last submit', () => {
    const errorsFromSubmit: FormErrors = {
      firstName: ['First error 1', 'First error 2'],
      secondName: [],
    };

    const errorsOnUpdate: FormErrors = {
      firstName: ['First error 1', 'First error 3'],
      secondName: ['Second error 1'],
    };

    const errors = onlyOnSubmit.getErrorsOnInputUpdate(
      errorsOnUpdate,
      errorsFromSubmit,
    );

    expect(errors).toEqual({
      firstName: ['First error 1'],
    });
  });
});
