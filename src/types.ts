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
  validate: (value: InputValue|undefined, formValues: FormValues) => boolean;
}

export interface InputDescriptor {
  id: string;
  name: string;
  value: InputValue|undefined;
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
