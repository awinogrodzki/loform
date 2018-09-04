import FormService from './services/FormService';
import FormEventEmitter from './services/FormEventEmitter';

export type InputValue = any;

export interface InputProps {
  id?: string;
  className?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  value?: InputValue;
  onChange?: (value?: InputValue) => any;
  onBlur?: (e: React.FocusEvent<any>) => any;
}

export interface DecoratedInputProps {
  validators?: InputValidator[];
  required?: boolean;
  requiredMessage?: string;
}

export interface FormInputProps extends InputProps, DecoratedInputProps {
  formService: FormService;
  formEventEmitter: FormEventEmitter;
  children: <T>(inputProps: InputProps & T) => React.ReactElement<any>;
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

export interface CheckboxInputProps extends InputProps {
  value?: boolean;
}

export interface InputValidator {
  errorMessage: string;
  validate: (value: InputValue | undefined, formValues: FormValues) => boolean | Promise<boolean>;
}

export interface InputDescriptor {
  id: string;
  name: string;
  value: InputValue | undefined;
  required: boolean;
  requiredMessage?: string;
  validators?: InputValidator[];
}

export interface RenderProps {
  submit: () => void;
  errors: FormErrors;
}

export type FormValueType = InputValue | InputValue[] | FormValues;

export interface FormValues {
  [key: string]: FormValueType;
}

export interface FormErrors {
  [name: string]: string[];
}

export interface FormValidationStrategy {
  getErrorsOnFormMount: (errors: FormErrors) => FormErrors | null;
  getErrorsOnInputBlur: (
    inputName: string,
    errors: FormErrors,
    prevErrors: FormErrors,
  ) => any;
  getErrorsOnInputUpdate: (
    inputName: string,
    errors: FormErrors,
    prevErrors: FormErrors,
  ) => FormErrors | null;
}
