import * as React from 'react';
import { InputDescriptor, FormInputProps, GenericInputProps, InputProps, InputValue } from '../../types';
export interface FormInputState {
    value?: InputValue;
    prevValueProp?: string;
}
export declare class FormInput extends React.PureComponent<FormInputProps> {
    static defaultProps: Partial<FormInputProps>;
    state: FormInputState;
    private id;
    constructor(props: FormInputProps);
    static getDerivedStateFromProps(props: FormInputProps, state: FormInputState): {
        value: any;
        prevValueProp: any;
    } | null;
    componentDidUpdate(): void;
    getValue(): any;
    updateInputDescriptor(): void;
    getDescriptorFromProps(value?: InputValue): InputDescriptor;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateInputState(value?: InputValue): void;
    onInputChange(value?: InputValue): void;
    onBlur(e: React.FocusEvent<any>): void;
    onClear(): void;
    render(): React.ReactElement<any>;
}
export declare const FormInputDecorator: <T extends InputProps>(Component: React.ComponentType<T>) => React.StatelessComponent<GenericInputProps<T>>;
export default FormInput;
