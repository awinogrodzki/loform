import * as React from 'react';
import FormService from './services/FormService';
import FormEventEmitter from './services/FormEventEmitter';

export type InputValue = any;

export interface InputProps<V = InputValue> {
  id?: string;
  className?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  value?: V;
  onChange?: (value?: V) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export type GenericInputProps<T extends InputProps> = T & {
  validateOnChange?: boolean;
  validators?: InputValidator[];
  required?: boolean;
  controlled?: boolean;
  requiredMessage?: string;
  debounce?: number;
};

export interface FormInputProps extends GenericInputProps<any> {
  formService: FormService;
  formEventEmitter: FormEventEmitter;
  children: <T extends InputProps>(inputProps: T) => React.ReactNode;
  id?: string;
  debounce?: number;
}

export type Diff<
  T extends string | number | symbol,
  U extends string | number | symbol
> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
export type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectInputProps extends InputProps {
  options?: Option[];
}

export interface RadioInputProps extends InputProps {
  options?: Option[];
}

export type CheckboxInputProps = InputProps<boolean>;

export interface InputValidator {
  errorMessage: string;
  validate: (
    value: InputValue | undefined,
    formValues: FormValues,
  ) => boolean | Promise<boolean>;
}

export interface InputDescriptor {
  id: string;
  name: string;
  value: InputValue | undefined;
  required: boolean;
  requiredMessage?: string;
  validators?: InputValidator[];
  validateOnChange?: boolean;
}

export interface RenderProps {
  clear: () => void;
  submit: () => void;
  errors: FormErrors;
  isValidating: boolean;
}

export type FormValueType = InputValue | InputValue[] | FormValues;

export interface FormValues {
  [key: string]: FormValueType;
}

export interface FormErrors {
  [name: string]: string[];
}

export interface ArrayInputFormErrors {
  [name: string]: string[][];
}

export interface ObjectInputFormErrors {
  [name: string]: { [key: string]: string[] };
}

export type FormErrorsMap = Map<string, string[]>;

export type ValidationStrategy = (
  errors: FormErrorsMap,
  prevErrors: FormErrorsMap,
) => FormErrorsMap;

export type InputValidationStrategy = (
  input: InputDescriptor,
  errors: FormErrorsMap,
  prevErrors: FormErrorsMap,
) => FormErrorsMap;

export interface FormValidationStrategy {
  getErrorsOnFormMount?: ValidationStrategy;
  getErrorsOnInputBlur?: InputValidationStrategy;
  getErrorsOnInputUpdate?: InputValidationStrategy;
}
