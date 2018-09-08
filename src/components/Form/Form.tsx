import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FormService, FormEventEmitter, FormEvent } from '../../services';
import {
  RenderProps,
  FormValues,
  FormErrors,
  InputDescriptor,
  FormValidationStrategy,
  FormErrorsMap,
  ValidationStrategy,
  InputValidationStrategy,
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
  errors: FormErrorsMap;
  isValidating: boolean;
  formErrors: FormErrors;
}

class Form extends React.Component<FormProps, FormState> {
  private formEventEmitter: FormEventEmitter;
  private formService: FormService;
  private validationStrategy: FormValidationStrategy;
  public state: FormState = {
    formErrors: {},
    errors: new Map(),
    isValidating: false,
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
      getErrorsOnInputBlur: PropTypes.func,
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

    return this.updateErrorsWithStrategy(
      this.validationStrategy.getErrorsOnFormMount,
    );
  }

  componentWillUnmount() {
    this.formEventEmitter.removeListener(FormEvent.Update, this.onUpdateEvent);
    this.formEventEmitter.removeListener(FormEvent.Submit, this.onSubmitEvent);
    this.formEventEmitter.removeListener(FormEvent.Blur, this.onBlurEvent);
  }

  async updateErrorsForInputWithStrategy(
    input: InputDescriptor,
    strategy: InputValidationStrategy,
  ): Promise<void> {
    this.setState({ isValidating: true });

    try {
      const newErrors = strategy(
        input,
        await this.formService.getErrors(),
        this.state.errors,
      );

      this.setState({
        isValidating: false,
        errors: newErrors,
        formErrors: this.formService.mapToFormErrors(newErrors),
      });
    } catch (e) {
      this.setState({ isValidating: false });
      throw e;
    }
  }

  async updateErrorsWithStrategy(strategy: ValidationStrategy): Promise<void> {
    this.setState({ isValidating: true });

    try {
      const prevErrors = this.state.errors;
      const errors = await this.formService.getErrors();
      const newErrors = strategy(errors, prevErrors);

      this.setState({
        isValidating: false,
        errors: newErrors,
        formErrors: this.formService.mapToFormErrors(newErrors),
      });
    } catch (e) {
      this.setState({ isValidating: false });
      throw e;
    }
  }

  async submit() {
    this.setState({ isValidating: true });

    try {
      const errors = await this.formService.getErrors();
      const formErrors = this.formService.mapToFormErrors(errors);
      const isValid =
        Array.from(errors.values()).filter(item => item.length > 0).length ===
        0;

      if (!isValid) {
        this.setState(
          {
            errors,
            formErrors,
            isValidating: false,
          },
          () => this.props.onError && this.props.onError(formErrors),
        );

        return;
      }

      const values = this.formService.getValuesFromInputs();

      this.setState(
        {
          errors: new Map(),
          formErrors: {},
          isValidating: false,
        },
        () => this.props.onSubmit(values),
      );
    } catch (e) {
      this.setState({ isValidating: false });
      throw e;
    }
  }

  async onBlurEvent(input: InputDescriptor) {
    if (!this.validationStrategy.getErrorsOnInputBlur) {
      return;
    }

    return this.updateErrorsForInputWithStrategy(
      input,
      this.validationStrategy.getErrorsOnInputBlur,
    );
  }

  async onSubmitEvent() {
    return this.submit();
  }

  async onUpdateEvent(input: InputDescriptor) {
    if (
      !this.validationStrategy.getErrorsOnInputUpdate ||
      !input.validateOnChange
    ) {
      return;
    }

    return this.updateErrorsForInputWithStrategy(
      input,
      this.validationStrategy.getErrorsOnInputUpdate,
    );
  }

  onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  getRenderProps(): RenderProps {
    return {
      submit: this.formEventEmitter.submit.bind(this.formEventEmitter),
      errors: this.state.formErrors,
      isValidating: this.state.isValidating,
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
