import { onInputChange } from './onInputChange';
import { FormErrors } from '../../../types';

describe('onInputChange FormValidationStrategy', () => {
  it('should update only errors of input that was updated', () => {
    const initialErrors: FormErrors = {};

    const errorsOnUpdate: FormErrors = {
      firstName: ['First error 1', 'First error 2'],
      secondName: ['Second error 1'],
    };
    const expectedErrors: FormErrors = {
      firstName: ['First error 1', 'First error 2'],
    };

    expect(
      onInputChange.getErrorsOnInputUpdate(
        'firstName',
        errorsOnUpdate,
        initialErrors,
      ),
    ).toEqual(expectedErrors);

    expect(
      onInputChange.getErrorsOnInputUpdate(
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
