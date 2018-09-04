import { merge } from '../utils';
import {
  FormValues,
  InputDescriptor,
  FormValueType,
  FormErrors,
} from '../types';

class FormService {
  private inputs: Map<string, InputDescriptor> = new Map();

  getInput(id: string): InputDescriptor | undefined {
    return this.inputs.get(id);
  }

  registerInput(input: InputDescriptor) {
    this.inputs.set(input.id, input);
  }

  updateInput(input: InputDescriptor) {
    this.inputs.set(input.id, input);
  }

  unregisterInputById(id: string) {
    this.inputs.delete(id);
  }

  getInputs() {
    return this.inputs;
  }

  async getErrorsFromInput({
    name,
    value,
    required,
    requiredMessage,
    validators = [],
  }: InputDescriptor): Promise<string[]> {
    let errors: string[] = [];

    if (required && !value) {
      errors = [requiredMessage || `Input ${name} is required`];
    }

    for (const validator of validators) {
      let isValid = validator.validate(value, this.getValuesFromInputs());

      if (isValid instanceof Promise) {
        isValid = await isValid;
      }

      if (!isValid) {
        errors = [...errors, validator.errorMessage];
      }
    }

    return errors;
  }

  async getErrors(): Promise<FormErrors> {
    let errors: FormErrors = {};

    for (const input of Array.from(this.inputs.values())) {
      const inputErrors = await this.getErrorsFromInput(input);
      const inputFormErrors = this.getValueByInputName(
        input.name,
        inputErrors.length ? inputErrors : undefined,
      );

      errors = merge(errors, inputFormErrors);
    }

    return errors;
  }

  getValuesFromInputs(): FormValues {
    let values: FormValues = {};

    this.inputs.forEach(input => {
      values = merge(values, this.getInputValue(input));
    });

    return values;
  }

  getInputErrorKey(input: InputDescriptor) {
    return input.name;
  }

  getInputValue(input: InputDescriptor): FormValues {
    return this.getValueByInputName(input.name, input.value);
  }

  getValueByInputName(name: string, value: FormValueType): FormValueType {
    const regex = /([^\[\]]*)(\[([^\[\]]*)\])/g;

    let match: RegExpMatchArray | null;

    type InputName = {
      key: string;
      name: string;
      childKey: string;
      childName: string;
    };
    const keys: InputName[] = [];

    while ((match = regex.exec(name))) {
      const [key, name, childKey, childName] = match;

      keys.push({
        key,
        name,
        childKey,
        childName,
      });
    }

    if (keys.length === 0) {
      return { [name]: value };
    }

    return keys.reverse().reduce((value, key) => {
      if (key.name && key.childName) {
        return { [key.name]: { [key.childName]: value } };
      }

      if (key.name && !key.childName) {
        return { [key.name]: [value] };
      }

      if (!key.name && !key.childName) {
        return [value];
      }

      if (!key.name && key.childName) {
        return { [key.childName]: value };
      }

      return value;
    }, value);
  }
}

export default FormService;
