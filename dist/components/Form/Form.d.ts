import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FormService, FormEventEmitter } from '../../services';
import { RenderProps, FormValues, FormErrors } from '../../types';
export interface FormInterface {
    className?: string;
    formService?: FormService;
    formEventEmitter?: FormEventEmitter;
    onSubmit: (values: FormValues) => any;
    onError?: (errors: FormErrors) => any;
    children: (renderProps: RenderProps) => React.ReactNode;
}
declare class Form extends React.Component<FormInterface> {
    private formEventEmitter;
    private formService;
    private renderProps;
    static propTypes: {
        className: PropTypes.Requireable<any>;
        onSubmit: PropTypes.Validator<any>;
        onError: PropTypes.Requireable<any>;
        children: PropTypes.Validator<any>;
        formService: PropTypes.Requireable<any>;
        formEventEmitter: PropTypes.Requireable<any>;
    };
    constructor(props: FormInterface);
    componentWillUnmount(): void;
    submit(): void;
    onSubmitEvent(): void;
    onFormSubmit(e: React.FormEvent<HTMLFormElement>): void;
    render(): JSX.Element;
}
export default Form;
