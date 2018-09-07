import { onInputChange } from './onInputChange';

describe('onInputChange FormValidationStrategy', () => {
  it('should return all errors of input that was updated, and corrected errors of other inputs', () => {
    const errors = new Map([
      ['input1-id', ['error1', 'error3']],
      ['input2-id', ['error5']],
    ]);
    const prevErrors = new Map([
      ['input1-id', ['error2', 'error3']],
      ['input2-id', ['error4']],
    ]);
    const expected = new Map([
      ['input1-id', ['error1', 'error3']],
      ['input2-id', []],
    ]);

    const input = {
      id: 'input1-id',
      name: 'name',
      value: '',
      required: false,
    };

    expect(
      onInputChange.getErrorsOnInputUpdate(input, errors, prevErrors),
    ).toEqual(expected);
  });
});
