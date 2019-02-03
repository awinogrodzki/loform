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
  children: <T extends InputProps>(inputProps: T) => React.ReactElement<any>;
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
