import FormService from './FormService';
jest.mock('./FormEventEmitter');
describe('FormService', function () {
    var formService;
    beforeEach(function () {
        formService = new FormService();
    });
    it('should validate required input', function () {
        var input = {
            id: 'inputId',
            name: 'name',
            value: '',
            required: true,
            requiredMessage: 'error message',
        };
        var errors = formService.getErrorsFromInput(input);
        expect(errors).toEqual(['error message']);
    });
    it('should validate required input with default message with label', function () {
        var input = {
            id: 'inputId',
            label: 'Nice Name',
            name: 'name',
            value: '',
            required: true,
        };
        var errors = formService.getErrorsFromInput(input);
        expect(errors).toEqual(['Input Nice Name is required']);
    });
    it('should validate required input with default message \
    with name if label is not provided', function () {
        var input = {
            id: 'inputId',
            name: 'name',
            value: '',
            required: true,
        };
        var errors = formService.getErrorsFromInput(input);
        expect(errors).toEqual(['Input name is required']);
    });
    it('should return empty array of errors if input is valid', function () {
        var input = {
            id: 'inputId',
            name: 'name',
            value: 'asd',
            required: true,
            requiredMessage: 'error message',
        };
        var errors = formService.getErrorsFromInput(input);
        expect(errors).toEqual([]);
    });
    it('should validate using validators', function () {
        var mockValidators = [
            { errorMessage: 'message1', validate: function (value) { return value === 'value1'; } },
            { errorMessage: 'message2', validate: function (value) { return value === 'value2'; } },
        ];
        var input = {
            id: 'inputId',
            name: 'name',
            value: 'value1',
            required: false,
            validators: mockValidators,
        };
        var errors = formService.getErrorsFromInput(input);
        expect(errors).toEqual(['message2']);
    });
    it('should be able to validate registered inputs', function () {
        var input = {
            id: 'input1',
            name: 'name1',
            value: 'value1',
            required: false,
        };
        var input2 = {
            id: 'input2',
            name: 'name2',
            value: 'value2',
            required: false,
            validators: [
                { errorMessage: 'input2 is invalid', validate: function () { return false; } },
            ],
        };
        formService.registerInput(input);
        formService.registerInput(input2);
        expect(formService.validateInputs()).toBe(false);
    });
    it('should be able to validate registered inputs', function () {
        var input = {
            id: 'input1',
            name: 'name1',
            value: 'value1',
            required: true,
        };
        var input2 = {
            id: 'input2',
            name: 'name2',
            value: 'value2',
            required: true,
        };
        formService.registerInput(input);
        formService.registerInput(input2);
        expect(formService.validateInputs()).toBe(true);
    });
    it('should return values from registered inputs', function () {
        var input = {
            id: 'input1',
            name: 'name1',
            value: 'value1',
            required: true,
        };
        var input2 = {
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
    it('should return nested values from inputs with nested names', function () {
        var input = {
            id: 'input1',
            name: 'name[nestedName1]',
            value: 'value1',
            required: true,
        };
        var input2 = {
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
    it('should return values in array from inputs with array names', function () {
        var input = {
            id: 'input1',
            name: 'name[]',
            value: 'value1',
            required: true,
        };
        var input2 = {
            id: 'input2',
            name: 'name[]',
            value: 'value2',
            required: true,
        };
        formService.registerInput(input);
        formService.registerInput(input2);
        expect(formService.getValuesFromInputs()).toEqual({
            name: [
                'value1',
                'value2',
            ],
        });
    });
    it('should return nested values and values in array if mixed', function () {
        var input = {
            id: 'input1',
            name: 'name[one][]',
            value: 'value1',
            required: true,
        };
        var input2 = {
            id: 'input2',
            name: 'name[one][]',
            value: 'value2',
            required: true,
        };
        var input3 = {
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
                one: [
                    'value1',
                    'value2',
                    { three: 'value3' },
                ],
            },
        });
    });
    it('should return handle input key names with special characters', function () {
        var input = {
            id: 'input1',
            name: 'name[test-name.1]',
            value: 'value1',
            required: true,
        };
        var input2 = {
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
    input without key in front of square braces', function () {
        var input = {
            id: 'input1',
            name: '[]',
            value: 'value1',
            required: true,
        };
        formService.registerInput(input);
        expect(function () { return formService.getValuesFromInputs(); })
            .toThrowError('Input name needs a key in front of array or object');
    });
    it('should extract errors from inputs', function () {
        var mockValidators = [
            { errorMessage: 'message1', validate: function (value) { return value === 'value1'; } },
            { errorMessage: 'message2', validate: function (value) { return value === 'value2'; } },
            { errorMessage: 'message3', validate: function (value) { return value === 'value2'; } },
        ];
        var input = {
            id: 'inputId',
            name: 'name',
            value: 'value1',
            required: false,
            validators: mockValidators,
        };
        var input2 = {
            id: 'input2Id',
            name: 'name2',
            value: 'value2',
            required: false,
            validators: mockValidators,
        };
        var input3 = {
            id: 'input3Id',
            label: 'Third input',
            name: 'name3[testKey][]',
            value: '',
            required: true,
            requiredMessage: 'input 3 required message',
        };
        formService.registerInput(input);
        formService.registerInput(input2);
        formService.registerInput(input3);
        var errors = formService.getErrors();
        expect(errors).toEqual({
            name: ['message2', 'message3'],
            name2: ['message1'],
            name3: [expect.any(String)],
        });
    });
});
//# sourceMappingURL=FormService.test.js.map