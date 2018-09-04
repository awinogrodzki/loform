import FormService from './FormService';

jest.mock('./FormEventEmitter');

describe('FormService', () => {
  let formService: FormService;

  beforeEach(() => {
    formService = new FormService();
  });

  it('should validate required input', async () => {
    const input = {
      id: 'inputId',
      name: 'name',
      value: '',
      required: true,
      requiredMessage: 'error message',
    };
    const errors = await formService.getErrorsFromInput(input);

    expect(errors).toEqual(['error message']);
  });

  it('should validate required input with default message \
    with name if label is not provided', async () => {
    const input = {
      id: 'inputId',
      name: 'name',
      value: '',
      required: true,
    };
    const errors = await formService.getErrorsFromInput(input);

    expect(errors).toEqual(['Input name is required']);
  });

  it('should return empty array of errors if input is valid', async () => {
    const input = {
      id: 'inputId',
      name: 'name',
      value: 'asd',
      required: true,
      requiredMessage: 'error message',
    };
    const errors = await formService.getErrorsFromInput(input);

    expect(errors).toEqual([]);
  });

  it('should validate using validators', async () => {
    const mockValidators = [
      {
        errorMessage: 'message1',
        validate: (value: string) => value === 'value1',
      },
      {
        errorMessage: 'message2',
        validate: (value: string) => value === 'value2',
      },
    ];
    const input = {
      id: 'inputId',
      name: 'name',
      value: 'value1',
      required: false,
      validators: mockValidators,
    };
    const errors = await formService.getErrorsFromInput(input);

    expect(errors).toEqual(['message2']);
  });

  it('should return values from registered inputs', () => {
    const input = {
      id: 'input1',
      name: 'name1',
      value: 'value1',
      required: true,
    };
    const input2 = {
      id: 'input2',
      name: 'name2',
      value: 'value2',
      required: true,
    };

    formService.registerInput(input);
    formService.registerInput(input2);

    expect(formService.getValuesFromInputs()).toEqual({
      name1: 'value1',
      name2: 'value2',
    });
  });

  it('should return nested values from inputs with nested names', () => {
    const input = {
      id: 'input1',
      name: 'name[nestedName1]',
      value: 'value1',
      required: true,
    };
    const input2 = {
      id: 'input2',
      name: 'name[nestedName2]',
      value: 'value2',
      required: true,
    };

    formService.registerInput(input);
    formService.registerInput(input2);

    expect(formService.getValuesFromInputs()).toEqual({
      name: {
        nestedName1: 'value1',
        nestedName2: 'value2',
      },
    });
  });

  it('should return values in array from inputs with array names', () => {
    const input = {
      id: 'input1',
      name: 'name[]',
      value: 'value1',
      required: true,
    };
    const input2 = {
      id: 'input2',
      name: 'name[]',
      value: 'value2',
      required: true,
    };

    formService.registerInput(input);
    formService.registerInput(input2);

    expect(formService.getValuesFromInputs()).toEqual({
      name: ['value1', 'value2'],
    });
  });

  it('should return nested values and values in array if mixed', () => {
    const input = {
      id: 'input1',
      name: 'name[one][]',
      value: 'value1',
      required: true,
    };
    const input2 = {
      id: 'input2',
      name: 'name[one][]',
      value: 'value2',
      required: true,
    };
    const input3 = {
      id: 'input3',
      name: 'name[one][][three]',
      value: 'value3',
      required: true,
    };

    formService.registerInput(input);
    formService.registerInput(input2);
    formService.registerInput(input3);

    expect(formService.getValuesFromInputs()).toEqual({
      name: {
        one: ['value1', 'value2', { three: 'value3' }],
      },
    });
  });

  it('should return handle input key names with special characters', () => {
    const input = {
      id: 'input1',
      name: 'name[test-name.1]',
      value: 'value1',
      required: true,
    };
    const input2 = {
      id: 'input2',
      name: 'name[test@name.2]',
      value: 'value2',
      required: true,
    };

    formService.registerInput(input);
    formService.registerInput(input2);

    expect(formService.getValuesFromInputs()).toEqual({
      name: {
        'test-name.1': 'value1',
        'test@name.2': 'value2',
      },
    });
  });

  it('should throw error if we try to get values from \
    input without key in front of square braces', () => {
    const input = {
      id: 'input1',
      name: '[]',
      value: 'value1',
      required: true,
    };

    formService.registerInput(input);

    expect(() => formService.getValuesFromInputs()).toThrowError(
      'Input name needs a key in front of array or object',
    );
  });

  it('should extract errors from inputs', async () => {
    const mockValidators = [
      {
        errorMessage: 'message1',
        validate: (value: string) => value === 'value1',
      },
      {
        errorMessage: 'message2',
        validate: (value: string) => value === 'value2',
      },
      {
        errorMessage: 'message3',
        validate: (value: string) => value === 'value2',
      },
    ];
    const input = {
      id: 'inputId',
      name: 'name',
      value: 'value1',
      required: false,
      validators: mockValidators,
    };
    const input2 = {
      id: 'input2Id',
      name: 'name2',
      value: 'value2',
      required: false,
      validators: mockValidators,
    };
    const input3 = {
      id: 'input3Id',
      label: 'Third input',
      name: 'name3[testKey][]',
      value: '',
      required: true,
      requiredMessage: 'input 3 required message',
    };
    const input4 = {
      id: 'input4Id',
      label: 'Fourth input',
      name: 'name3[testKey][]',
      value: '',
      required: true,
      requiredMessage: 'input 4 required message',
    };

    formService.registerInput(input);
    formService.registerInput(input2);
    formService.registerInput(input3);
    formService.registerInput(input4);

    const errors = await formService.getErrors();

    expect(errors).toEqual({
      name: ['message2', 'message3'],
      name2: ['message1'],
      'name3[testKey][]': [
        'input 3 required message',
        'input 4 required message',
      ],
    });
  });

  it('should validate input using asynchronous validator', async () => {
    const input = {
      id: 'inputId',
      name: 'name',
      value: 'value1',
      required: false,
      validators: [
        { errorMessage: 'error1', validate: () => false },
        { errorMessage: 'error2', validate: async () => false },
      ],
    };

    formService.registerInput(input);

    const errors = await formService.getErrors();

    expect(errors).toEqual({ name: ['error1', 'error2'] });
  });
});
