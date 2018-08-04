import { onInputBlur } from './onInputBlur';
import { FormErrors } from '../../../types';

describe('onInputBlur FormValidationStrategy', () => {
  it('should update only errors of input that was blured', () => {
    const initialErrors: FormErrors = {};

    const errorsOnBlur: FormErrors = {
      firstName: ['First error 1', 'First error 2'],
      secondName: ['Second error 1'],
    };
    const expectedErrors: FormErrors = {
      firstName: ['First error 1', 'First error 2'],
    };

    expect(
      onInputBlur.getErrorsOnInputBlur(
        'firstName',
        errorsOnBlur,
        initialErrors,
      ),
    ).toEqual(expectedErrors);

    expect(
      onInputBlur.getErrorsOnInputBlur(
        'secondName',
        {
          firstName: ['Different error'],
          secondName: ['Another Error'],
        },
        expectedErrors,
      ),
    ).toEqual({
      firstName: ['First error 1', 'First error 2'],
      secondName: ['Another Error'],
    });
  });
});
