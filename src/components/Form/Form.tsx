import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FormService, FormEventEmitter, FormEvent } from '../../services';
import {
  RenderProps,
  FormValues,
  FormErrors,
  InputDescriptor,
  FormValidationStrategy,
} from '../../types';
import { FormContext } from '../../context';
import { onInputBlur } from './strategy';

export interface FormProps {
  className?: string;
  formService?: FormService;
  formEventEmitter?: FormEventEmitter;
  validationStrategy?: FormValidationStrategy;
  onSubmit: (values: FormValues) => any;
  onError?: (errors: FormErrors) => any;
  children: (renderProps: RenderProps) => React.ReactNode;
}

export interface FormState {
  errors: FormErrors;
}

class Form extends React.Component<FormProps, FormState> {
  private formEventEmitter: FormEventEmitter;
  private formService: FormService;
  private validationStrategy: FormValidationStrategy;
  public state: FormState = {
    errors: {},
  };

  static propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onError: PropTypes.func,
    children: PropTypes.func.isRequired,
    formService: PropTypes.instanceOf(FormService),
    formEventEmitter: PropTypes.instanceOf(FormEventEmitter),
    validationStrategy: PropTypes.shape({
      getErrorsOnFormMount: PropTypes.func,
      getErrorsOnInputUpdate: PropTypes.func,
    }),
  };

  constructor(props: FormProps) {
    super(props);

    this.formEventEmitter = props.formEventEmitter
      ? props.formEventEmitter
      : new FormEventEmitter();
    this.formService = props.formService
      ? props.formService
      : new FormService();
    this.validationStrategy = props.validationStrategy || onInputBlur;

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
    this.onUpdateEvent = this.onUpdateEvent.bind(this);
    this.onBlurEvent = this.onBlurEvent.bind(this);

    this.formEventEmitter.addListener(FormEvent.Update, this.onUpdateEvent);
    this.formEventEmitter.addListener(FormEvent.Submit, this.onSubmitEvent);
    this.formEventEmitter.addListener(FormEvent.Blur, this.onBlurEvent);
  }

  componentDidMount() {
    const errors = this.formService.getErrors();
    const newErrors = this.validationStrategy.getErrorsOnFormMount(errors);

    if (!newErrors) {
      return;
    }

    this.setState({
      errors: newErrors,
    });
  }

  componentWillUnmount() {
    this.formEventEmitter.removeListener(FormEvent.Submit, this.onSubmitEvent);
  }

  submit() {
    const errors = this.formService.getErrors();
    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      this.setState(
        {
          errors,
        },
        () => this.props.onError && this.props.onError(errors),
      );

      return;
    }

    const values = this.formService.getValuesFromInputs();

    this.setState(
      {
        errors: {},
      },
      () => this.props.onSubmit(values),
    );
  }

  onBlurEvent(input: InputDescriptor) {
    const errors = this.formService.getErrors();
    const inputName = this.formService.getInputErrorKey(input);

    const newErrors = this.validationStrategy.getErrorsOnInputBlur(
      inputName,
      errors,
      this.state.errors,
    );

    if (!newErrors) {
      return;
    }

    this.setState({
      errors: newErrors,
    });
  }

  onSubmitEvent() {
    this.submit();
  }

  onUpdateEvent(input: InputDescriptor) {
    const errors = this.formService.getErrors();
    const inputName = this.formService.getInputErrorKey(input);
    const newErrors = this.validationStrategy.getErrorsOnInputUpdate(
      inputName,
      errors,
      this.state.errors,
    );

    if (!newErrors) {
      return;
    }

    this.setState({
      errors: newErrors,
    });
  }

  onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  getRenderProps(): RenderProps {
    return {
      submit: this.formEventEmitter.submit.bind(this.formEventEmitter),
      errors: this.state.errors,
    };
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className={this.props.className}>
        <FormContext.Provider
          value={{
            formEventEmitter: this.formEventEmitter,
            formService: this.formService,
          }}
        >
          {this.props.children(this.getRenderProps())}
        </FormContext.Provider>
      </form>
    );
  }
}

export default Form;
