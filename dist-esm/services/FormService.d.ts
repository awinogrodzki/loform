import { FormValuesInterface, InputDescriptorInterface, FormValueType, FormErrors } from '../types';
declare class FormService {
    private inputs;
    registerInput(input: InputDescriptorInterface): void;
    updateInput(input: InputDescriptorInterface): void;
    unregisterInputById(id: string): void;
    getInputs(): Map<string, InputDescriptorInterface>;
    validateInputs(): boolean;
    getErrorsFromInput({label, name, value, required, requiredMessage, validators}: InputDescriptorInterface): string[];
    getErrors(): FormErrors;
    getValuesFromInputs(): FormValuesInterface;
    getInputValue(input: InputDescriptorInterface): FormValuesInterface;
    getInputRootName(name: string): string;
    getValueByMatch(match: string[], input: InputDescriptorInterface, index: number, currentValue: any): FormValueType;
}
export default FormService;
