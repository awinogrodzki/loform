import { FormValues, InputDescriptor, FormValueType, FormErrors, FormErrorsMap, InputValidator } from '../types';
declare class FormService {
    private inputs;
    private asyncValidatorCache;
    getInput(id: string): InputDescriptor | undefined;
    registerInput(input: InputDescriptor): void;
    updateInput(input: InputDescriptor): void;
    unregisterInputById(id: string): void;
    clearInputs(): void;
    getInputs(): Map<string, InputDescriptor>;
    getFromAsyncValidatorCache(id: string, validator: InputValidator): boolean | undefined;
    saveToAsyncValidatorCache(id: string, validator: InputValidator, value: boolean): void;
    getErrorsFromInput({ id, name, value, required, requiredMessage, validators, }: InputDescriptor): Promise<string[]>;
    getErrors(): Promise<FormErrorsMap>;
    getFormErrors(): Promise<FormErrors>;
    getValuesFromInputs(): FormValues;
    getInputErrorKey(input: InputDescriptor): string;
    getInputValue(input: InputDescriptor): FormValues;
    mapToFormErrors(errors: FormErrorsMap): FormErrors;
    getValueByInputName(name: string, value: FormValueType): FormValueType;
}
export default FormService;
