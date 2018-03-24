/// <reference types="react" />
import * as React from 'react';
import FormService from 'services/FormService';
import FormEventEmitter from 'services/FormEventEmitter';
import { RenderPropsInterface, FormValuesInterface, FormErrors } from 'types';
export interface FormInterface {
    className?: string;
    formService?: FormService;
    formEventEmitter?: FormEventEmitter;
    onSubmit: (data: FormValuesInterface) => any;
    onError?: (errors: FormErrors) => any;
    children: (renderProps: RenderPropsInterface) => React.ReactNode;
}
declare class Form extends React.Component<FormInterface> {
    private formEventEmitter;
    private formService;
    private renderProps;
    constructor(props: FormInterface);
    componentWillUnmount(): void;
    submit(): void;
    onSubmitEvent(): void;
    onFormSubmit(e: React.FormEvent<HTMLFormElement>): void;
    render(): JSX.Element;
}
export default Form;
