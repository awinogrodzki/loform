import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FormService, FormEventEmitter } from '../../services';
import { RenderProps, FormValues, FormErrors, InputDescriptor, FormValidationStrategy, FormErrorsMap, ValidationStrategy, InputValidationStrategy } from '../../types';
export interface FormProps {
    clearOnSubmit?: boolean;
    className?: string;
    formService?: FormService;
    formEventEmitter?: FormEventEmitter;
    validationStrategy?: FormValidationStrategy;
    onSubmit: (values: FormValues) => any;
    onError?: (errors: FormErrors) => any;
    children: (renderProps: RenderProps) => React.ReactNode;
}
export interface FormState {
    errors: FormErrorsMap;
    isValidating: boolean;
    formErrors: FormErrors;
}
declare class Form extends React.Component<FormProps, FormState> {
    private formEventEmitter;
    private formService;
    private validationStrategy;
    state: FormState;
    static defaultProps: Partial<FormProps>;
    static propTypes: {
        clearOnSubmit: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        onSubmit: PropTypes.Validator<(...args: any[]) => any>;
        onError: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Validator<(...args: any[]) => any>;
        formService: PropTypes.Requireable<FormService>;
        formEventEmitter: PropTypes.Requireable<FormEventEmitter>;
        validationStrategy: PropTypes.Requireable<PropTypes.InferProps<{
            getErrorsOnFormMount: PropTypes.Requireable<(...args: any[]) => any>;
            getErrorsOnInputUpdate: PropTypes.Requireable<(...args: any[]) => any>;
            getErrorsOnInputBlur: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
    };
    constructor(props: FormProps);
    componentDidMount(): void;
    updateErrorsOnMount(): Promise<void>;
    componentWillUnmount(): void;
    updateErrorsForInputWithStrategy(input: InputDescriptor, strategy: InputValidationStrategy): Promise<void>;
    updateErrorsWithStrategy(strategy: ValidationStrategy): Promise<void>;
    submit(): Promise<void>;
    onBlurEvent(input: InputDescriptor): Promise<void>;
    onSubmitEvent(): Promise<void>;
    onUpdateEvent(input: InputDescriptor): Promise<void>;
    onClearEvent(): Promise<void>;
    onFormSubmit(e: React.FormEvent<HTMLFormElement>): void;
    getRenderProps(): RenderProps;
    render(): JSX.Element;
}
export default Form;
