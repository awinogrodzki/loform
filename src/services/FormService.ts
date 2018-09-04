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
    const errors: FormErrors = {};

    for (const input of Array.from(this.inputs.values())) {
      const inputErrors = await this.getErrorsFromInput(input);

      if (inputErrors.length > 0) {
        const inputKey = this.getInputErrorKey(input);

        errors[inputKey] = [...(errors[inputKey] || []), ...inputErrors];
      }
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
    const regex = /\[(.*?)\]/g;
    const match = input.name.match(regex);

    if (!match || match.length === 0) {
      return { [input.name]: input.value };
    }

    const rootName = this.getInputRootName(input.name);
    const value = {
      [rootName]: this.getValueByMatch(match, input, match.length - 1, null),
    };

    return value;
  }

  getInputRootName(name: string) {
    const regex = /^(.+?)\[/;
    const match = regex.exec(name);

    if (!match) {
      throw new Error('Input name needs a key in front of array or object');
    }

    return match[1];
  }

  getValueByMatch(
    match: string[],
    input: InputDescriptor,
    index: number,
    currentValue: any,
  ): FormValueType {
    if (index < 0) {
      return currentValue;
    }

    const regex = /\[(.*?)\]/;
    const matchString = match[index];
    const isLastKey = match.length - 1 === index;
    const keyMatch = regex.exec(matchString);
    const key = (keyMatch && keyMatch[1]) || null;
    const nextIndex = index - 1;

    if (isLastKey && key) {
      return this.getValueByMatch(match, input, nextIndex, {
        [key]: input.value,
      });
    }

    if (isLastKey && !key) {
      return this.getValueByMatch(match, input, nextIndex, [input.value]);
    }

    if (key) {
      return this.getValueByMatch(match, input, nextIndex, {
        [key]: currentValue,
      });
    }

    return this.getValueByMatch(match, input, nextIndex, [currentValue]);
  }
}

export default FormService;
