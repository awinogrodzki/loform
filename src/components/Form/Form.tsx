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
  isLoading: boolean;
}

class Form extends React.Component<FormProps, FormState> {
  private formEventEmitter: FormEventEmitter;
  private formService: FormService;
  private validationStrategy: FormValidationStrategy;
  public state: FormState = {
    errors: {},
    isLoading: false,
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
    this.updateErrorsOnMount();
  }

  async updateErrorsOnMount() {
    if (!this.validationStrategy.getErrorsOnFormMount) {
      return;
    }

    const errors = await this.getErrors();
    const newErrors = this.validationStrategy.getErrorsOnFormMount(errors);

    if (!newErrors) {
      return;
    }

    this.setState({
      errors: newErrors,
    });
  }

  componentWillUnmount() {
    this.formEventEmitter.removeListener(FormEvent.Update, this.onUpdateEvent);
    this.formEventEmitter.removeListener(FormEvent.Submit, this.onSubmitEvent);
    this.formEventEmitter.removeListener(FormEvent.Blur, this.onBlurEvent);
  }

  async getErrors(): Promise<FormErrors> {
    this.setState({ isLoading: true });

    try {
      const errors = await this.formService.getErrors();
      this.setState({ isLoading: false });
      return errors;
    } catch (e) {
      this.setState({ isLoading: false });
      throw e;
    }
  }

  async submit() {
    const errors = await this.getErrors();
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

  async onBlurEvent(input: InputDescriptor) {
    if (!this.validationStrategy.getErrorsOnInputBlur) {
      return;
    }

    const errors = await this.getErrors();
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

  async onUpdateEvent(input: InputDescriptor) {
    if (!this.validationStrategy.getErrorsOnInputUpdate) {
      return;
    }

    const errors = await this.getErrors();
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
      isLoading: this.state.isLoading,
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
