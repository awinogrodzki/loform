import { onInputBlur } from './onInputBlur';

describe('onInputBlur FormValidationStrategy', () => {
  it('should return all errors of input that was blurred, and corrected errors of updated inputs', () => {
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

    expect(onInputBlur.getErrorsOnInputBlur!(input, errors, prevErrors)).toEqual(
      expected,
    );
  });
});
