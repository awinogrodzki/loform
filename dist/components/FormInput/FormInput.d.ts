import * as React from 'react';
import { InputDescriptor, FormInputProps, DecoratedInputProps } from '../../types';
interface FormInputState {
    value: string;
    prevValueProp?: string;
    hasErrors: boolean;
    errors: string[];
}
export declare class FormInput extends React.PureComponent<FormInputProps> {
    static defaultProps: Partial<FormInputProps>;
    state: FormInputState;
    private id;
    constructor(props: FormInputProps);
    static getDerivedStateFromProps(props: FormInputProps, state: FormInputState): {
        value: string;
        prevValueProp: string;
    } | null;
    componentDidUpdate(): void;
    getDescriptorFromProps(value: string): InputDescriptor;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onFormSubmit(): void;
    updateInputState(descriptor: InputDescriptor): void;
    onInputChange(value: string): void;
    renderErrors(errors: string[]): JSX.Element;
    render(): JSX.Element;
}
export declare const FormInputDecorator: <T>(Component: React.ComponentClass<T> | React.StatelessComponent<T>) => React.StatelessComponent<T & DecoratedInputProps>;
export default FormInput;
