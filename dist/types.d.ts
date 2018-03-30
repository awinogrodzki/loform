import FormService from 'services/FormService';
import FormEventEmitter from 'services/FormEventEmitter';
export interface InputInterface {
    id?: string;
    className?: string;
    name: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => any;
}
export interface FormInputInterface extends InputInterface {
    containerClass?: string;
    formService: FormService;
    formEventEmitter: FormEventEmitter;
    validators?: InputValidatorInterface[];
    required?: boolean;
    requiredMessage?: string;
    label?: string;
}
export interface Option {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectInputInterface extends InputInterface {
    options?: Option[];
}
export interface RadioInputInterface extends InputInterface {
    containerClassName?: string;
    options?: Option[];
}
export interface InputValidatorInterface {
    errorMessage: string;
    validate: (value: string, formValues: FormValuesInterface) => boolean;
}
export interface InputDescriptorInterface {
    id: string;
    label?: string;
    name: string;
    value: string;
    required: boolean;
    requiredMessage?: string;
    validators?: InputValidatorInterface[];
}
export interface InputPropsInterface {
    containerClass: string;
    formService: FormService;
    formEventEmitter: FormEventEmitter;
}
export interface RenderPropsInterface {
    inputProps: InputPropsInterface;
    submit: () => void;
}
export declare type FormValueType = string | string[] | FormValuesInterface;
export interface FormValuesInterface {
    [key: string]: FormValueType;
}
export interface FormErrors {
    [name: string]: string[];
}
