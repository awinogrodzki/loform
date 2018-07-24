import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FormService, FormEventEmitter } from '../../services';
import { RenderProps, FormValues, FormErrors } from '../../types';
export interface FormProps {
    className?: string;
    formService?: FormService;
    formEventEmitter?: FormEventEmitter;
    onSubmit: (values: FormValues) => any;
    onError?: (errors: FormErrors) => any;
    children: (renderProps: RenderProps) => React.ReactNode;
}
interface FormState {
    errors: FormErrors;
}
declare class Form extends React.Component<FormProps, FormState> {
    private formEventEmitter;
    private formService;
    state: FormState;
    static propTypes: {
        className: PropTypes.Requireable<any>;
        onSubmit: PropTypes.Validator<any>;
        onError: PropTypes.Requireable<any>;
        children: PropTypes.Validator<any>;
        formService: PropTypes.Requireable<any>;
        formEventEmitter: PropTypes.Requireable<any>;
    };
    constructor(props: FormProps);
    componentWillUnmount(): void;
    submit(): void;
    onSubmitEvent(): void;
    onUpdateEvent(): void;
    onFormSubmit(e: React.FormEvent<HTMLFormElement>): void;
    getRenderProps(): RenderProps;
    render(): JSX.Element;
}
export default Form;
