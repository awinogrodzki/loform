/// <reference types="react" />
import * as React from 'react';
import { InputInterface, InputDescriptorInterface, FormInputInterface } from 'types';
export interface FormInputProps extends FormInputInterface {
    children: <T>(inputProps: InputInterface & T) => React.ReactElement<any>;
}
export declare class FormInput extends React.Component<FormInputProps> {
    static defaultProps: Partial<FormInputProps>;
    state: {
        value?: string;
        hasErrors: boolean;
        errors: string[];
    };
    private id;
    constructor(props: FormInputProps);
    componentWillReceiveProps(nextProps: FormInputProps): void;
    getDescriptorFromProps(value: string): InputDescriptorInterface;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onFormSubmit(): void;
    validate(descriptor: InputDescriptorInterface): boolean;
    onInputChange(value: string): void;
    renderErrors(errors: string[]): JSX.Element;
    render(): JSX.Element;
}
export declare const FormInputDecorator: <T>(Component: React.ComponentClass<T> | React.StatelessComponent<T>) => (props: FormInputInterface & T) => JSX.Element;
export default FormInput;
