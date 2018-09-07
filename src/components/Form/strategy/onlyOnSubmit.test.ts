import { onlyOnSubmit } from './onlyOnSubmit';

describe('onlyOnSubmit FormValidationStrategy', () => {
  it('should return errors that were not corrected since last submit on input update', () => {
    const errors = new Map([
      ['input1-id', ['error1', 'error3']],
      ['input2-id', ['error4']],
    ]);
    const prevErrors = new Map([
      ['input1-id', ['error2', 'error3']],
      ['input2-id', ['error4']],
    ]);
    const expected = new Map([
      ['input1-id', ['error3']],
      ['input2-id', ['error4']],
    ]);

    const input = {
      id: 'input1-id',
      name: 'name',
      value: '',
      required: false,
    };

    expect(
      onlyOnSubmit.getErrorsOnInputUpdate(input, errors, prevErrors),
    ).toEqual(expected);
  });
});
