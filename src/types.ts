import FormService from './services/FormService';
import FormEventEmitter from './services/FormEventEmitter';

export interface InputProps {
  id?: string;
  className?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => any;
  hasErrors?: boolean;
}

export interface DecoratedInputProps extends InputProps {
  containerClass?: string;
  inputContainerClass?: string;
  inputWrapperClass?: string;
  errorContainerClass?: string;
  errorClass?: string;
  validators?: InputValidator[];
  required?: boolean;
  requiredMessage?: string;
  label?: string;
}

export interface FormInputProps extends DecoratedInputProps {
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

export interface InputValidator {
  errorMessage: string;
  validate: (value: string, formValues: FormValues) => boolean;
}

export interface InputDescriptor {
  id: string;
  label?: string;
  name: string;
  value: string;
  required: boolean;
  requiredMessage?: string;
  validators?: InputValidator[];
}

export interface RenderProps {
  submit: () => void;
}

export type FormValueType = string | string[] | FormValues;

export interface FormValues {
  [key: string]: FormValueType;
}

export interface FormErrors {
  [name: string]: string[];
}
