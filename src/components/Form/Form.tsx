import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import {
  FormService,
  FormEventEmitter,
  FormEvent,
} from '../../services';
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

  static propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onError: PropTypes.func,
    children: PropTypes.func.isRequired,
    formService: PropTypes.instanceOf(FormService),
    formEventEmitter: PropTypes.instanceOf(FormEventEmitter),
  };

  constructor(props: FormInterface) {
    super(props);

    this.formEventEmitter = props.formEventEmitter
      ? props.formEventEmitter : (new FormEventEmitter());
    this.formService = props.formService
      ? props.formService : (new FormService());
    this.renderProps = {
      inputProps: {
        formService: this.formService,
        formEventEmitter: this.formEventEmitter,
      },
      submit: this.formEventEmitter.submit.bind(this.formEventEmitter),
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSubmitEvent = this.onSubmitEvent.bind(this);

    this.formEventEmitter.addListener(FormEvent.Submit, this.onSubmitEvent);
  }

  componentWillUnmount() {
    this.formEventEmitter.removeListener(FormEvent.Submit, this.onSubmitEvent);
  }

  submit() {
    const values = this.formService.getValuesFromInputs();
    const errors = this.formService.getErrors();
    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
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
