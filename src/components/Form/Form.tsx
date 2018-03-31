import * as React from 'react';
import * as classNames from 'classnames';
import FormService from '../../services/FormService';
import FormEventEmitter from '../../services/FormEventEmitter';
import {
  InputDescriptorInterface,
  RenderPropsInterface,
  FormValuesInterface,
  FormValueType,
  FormErrors,
} from '../../types';

const styles = require('./Form.css');

export interface FormInterface {
  className?: string;
  formService?: FormService;
  formEventEmitter?: FormEventEmitter;
  onSubmit: (data: FormValuesInterface) => any;
  onError?: (errors: FormErrors) => any;
  children: (renderProps: RenderPropsInterface) => React.ReactNode;
}

class Form extends React.Component<FormInterface> {
  private formEventEmitter: FormEventEmitter;
  private formService: FormService;
  private renderProps: RenderPropsInterface;

  constructor(props: FormInterface) {
    super(props);

    this.formEventEmitter = props.formEventEmitter
      ? props.formEventEmitter : (new FormEventEmitter());
    this.formService = props.formService
      ? props.formService : (new FormService());
    this.renderProps = {
      inputProps: {
        containerClass: styles.input,
        formService: this.formService,
        formEventEmitter: this.formEventEmitter,
      },
      submit: this.formEventEmitter.triggerSubmit.bind(this.formEventEmitter),
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSubmitEvent = this.onSubmitEvent.bind(this);

    this.formEventEmitter.addSubmitListener(this.onSubmitEvent);
  }

  componentWillUnmount() {
    this.formEventEmitter.removeSubmitListener(this.onSubmitEvent);
  }

  submit() {
    const values = this.formService.getValuesFromInputs();

    if (!this.formService.validateInputs()) {
      const errors = this.formService.getErrors();
      this.props.onError && this.props.onError(errors);

      return;
    }

    this.props.onSubmit(values);
  }

  onSubmitEvent() {
    this.submit();
  }

  onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
      <form
        onSubmit={this.onFormSubmit}
        className={classNames(styles.container, this.props.className)}
      >
        {this.props.children(this.renderProps)}
      </form>
    );
  }
}

export default Form;
