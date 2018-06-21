import * as React from 'react';
import { InputDescriptor, FormInputProps, DecoratedInputProps } from '../../types';
export declare class FormInput extends React.Component<FormInputProps> {
    static defaultProps: Partial<FormInputProps>;
    state: {
        value: string;
        hasErrors: boolean;
        errors: string[];
    };
    private id;
    constructor(props: FormInputProps);
    componentWillReceiveProps(nextProps: FormInputProps): void;
    getDescriptorFromProps(value: string): InputDescriptor;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onFormSubmit(): void;
    validate(descriptor: InputDescriptor): boolean;
    onInputChange(value: string): void;
    renderErrors(errors: string[]): JSX.Element;
    render(): JSX.Element;
}
export declare const FormInputDecorator: <T>(Component: React.ComponentClass<T> | React.StatelessComponent<T>) => React.StatelessComponent<T & DecoratedInputProps>;
export default FormInput;
