import { FormValues, InputDescriptor, FormValueType, FormErrors } from '../types';
declare class FormService {
    private inputs;
    getInput(id: string): InputDescriptor | undefined;
    registerInput(input: InputDescriptor): void;
    updateInput(input: InputDescriptor): void;
    unregisterInputById(id: string): void;
    getInputs(): Map<string, InputDescriptor>;
    validateInputs(): boolean;
    getErrorsFromInput({ name, value, required, requiredMessage, validators, }: InputDescriptor): string[];
    getErrors(): FormErrors;
    getValuesFromInputs(): FormValues;
    getInputValue(input: InputDescriptor): FormValues;
    getInputRootName(name: string): string;
    getValueByMatch(match: string[], input: InputDescriptor, index: number, currentValue: any): FormValueType;
}
export default FormService;
