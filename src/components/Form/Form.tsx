import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FormService, FormEventEmitter, FormEvent } from '../../services';
import {
  RenderProps,
  FormValues,
  FormErrors,
  InputDescriptor,
} from '../../types';
import { FormContext } from '../../context';

export interface FormProps {
  className?: string;
  formService?: FormService;
  formEventEmitter?: FormEventEmitter;
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
  };

  constructor(props: FormProps) {
    super(props);

    this.formEventEmitter = props.formEventEmitter
      ? props.formEventEmitter
      : new FormEventEmitter();
    this.formService = props.formService
      ? props.formService
      : new FormService();

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
    this.onUpdateEvent = this.onUpdateEvent.bind(this);

    this.formEventEmitter.addListener(FormEvent.Update, this.onUpdateEvent);
    this.formEventEmitter.addListener(FormEvent.Submit, this.onSubmitEvent);
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

  onSubmitEvent() {
    this.submit();
  }

  onUpdateEvent() {
    const errors = this.formService.getErrors();

    this.updateOnlyCorrectedErrors(errors);
  }

  private updateOnlyCorrectedErrors(errors: FormErrors) {
    const keys = Object.keys(errors);

    const newErrors = keys.reduce((currentErrors: FormErrors, key) => {
      const errorsForKey = errors[key];
      const stateErrorsForKey = this.state.errors[key];

      if (!stateErrorsForKey || stateErrorsForKey.length === 0) {
        return currentErrors;
      }

      if (!errorsForKey || errorsForKey.length === 0) {
        return currentErrors;
      }

      const filteredErrors = stateErrorsForKey.filter(error => errorsForKey.includes(error));

      if (!filteredErrors.length) {
        return currentErrors;
      }

      return {
        ...currentErrors,
        [key]: filteredErrors,
      };
    }, {});

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
