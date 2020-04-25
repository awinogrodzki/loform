import { merge } from '../utils';
import {
  FormValues,
  InputDescriptor,
  FormValueType,
  FormErrors,
  FormErrorsMap,
  InputValidator,
} from '../types';

type ValidatorMap = Map<InputValidator, boolean>;
type ValidatorCache = Map<string, ValidatorMap>;

class FormService {
  private inputs: Map<string, InputDescriptor> = new Map();
  private asyncValidatorCache: ValidatorCache = new Map();

  getInput(id: string): InputDescriptor | undefined {
    return this.inputs.get(id);
  }

  registerInput(input: InputDescriptor) {
    this.inputs.set(input.id, input);
  }

  updateInput(input: InputDescriptor) {
    this.inputs.set(input.id, input);
    this.asyncValidatorCache.delete(input.id);
  }

  unregisterInputById(id: string) {
    this.inputs.delete(id);
  }

  clearInputs() {
    this.inputs = new Map(
      Array.from(this.inputs.entries()).map(([id, input]) => [
        id,
        { ...input, value: '' },
      ] as [string, InputDescriptor]),
    );
  }

  getInputs() {
    return this.inputs;
  }

  getFromAsyncValidatorCache(
    id: string,
    validator: InputValidator,
  ): boolean | undefined {
    const validatorMap = this.asyncValidatorCache.get(id);

    return validatorMap && validatorMap.get(validator);
  }

  saveToAsyncValidatorCache(
    id: string,
    validator: InputValidator,
    value: boolean,
  ) {
    const map: ValidatorMap = this.asyncValidatorCache.get(id) || new Map();
    map.set(validator, value);

    this.asyncValidatorCache.set(id, map);
  }

  async getErrorsFromInput({
    id,
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
      const fromCache = this.getFromAsyncValidatorCache(id, validator);
      let isValid;

      if (fromCache !== undefined) {
        isValid = fromCache;
      } else {
        isValid = validator.validate(value, this.getValuesFromInputs());
      }

      if (isValid instanceof Promise) {
        isValid = await isValid;
        this.saveToAsyncValidatorCache(id, validator, isValid);
      }

      if (!isValid) {
        errors = [...errors, validator.errorMessage];
      }
    }

    return errors;
  }

  async getErrors(): Promise<FormErrorsMap> {
    const errors: FormErrorsMap = new Map();

    for (const input of Array.from(this.inputs.values())) {
      const inputErrors = await this.getErrorsFromInput(input);
      errors.set(input.id, inputErrors);
    }

    return errors;
  }

  async getFormErrors(): Promise<FormErrors> {
    return this.mapToFormErrors(await this.getErrors());
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

  mapToFormErrors(errors: FormErrorsMap): FormErrors {
    return Array.from(errors.entries()).reduce(
      (formErrors: FormErrors, entry: [string, string[]]) => {
        const id = entry[0];
        const errors = entry[1];
        const input = this.getInput(id)!;

        if (!input) {
          return formErrors;
        }

        return merge(formErrors, this.getValueByInputName(input.name, errors));
      },
      {},
    );
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
