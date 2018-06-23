import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import * as uuid from 'uuid/v4';
import Label from '../Label';
import { FormEvent } from '../../services';
import {
  InputDescriptor,
  FormInputProps,
  DecoratedInputProps,
} from '../../types';
import { FormContext } from '../../context';

const styles = require('./FormInput.css');

interface FormInputState {
  value: string;
  prevValueProp?: string;
  hasErrors: boolean;
  errors: string[];
}

export class FormInput extends React.PureComponent<FormInputProps> {
  static defaultProps: Partial<FormInputProps> = {
    value: '',
    validators: [],
  };

  public state: FormInputState = {
    value: this.props.value || '',
    prevValueProp: this.props.value,
    hasErrors: false,
    errors: [],
  };

  private id: string;

  constructor(props: FormInputProps) {
    super(props);

    this.id = props.id || uuid();
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  static getDerivedStateFromProps(
    props: FormInputProps,
    state: FormInputState,
  ) {
    if (props.value === undefined) {
      return null;
    }

    if (props.value === state.prevValueProp) {
      return null;
    }

    return {
      value: props.value,
      prevValueProp: props.value,
    };
  }

  componentDidUpdate() {
    const input = this.props.formService.getInput(this.id);

    if (!input) {
      return;
    }

    if (input.value === this.state.value) {
      return;
    }

    const descriptor = this.getDescriptorFromProps(this.state.value);
    this.props.formService.updateInput(descriptor);
    this.props.formEventEmitter.update();
  }

  getDescriptorFromProps(value: string): InputDescriptor {
    return {
      value,
      id: this.id,
      label: this.props.label,
      name: this.props.name,
      required: this.props.required || false,
      requiredMessage: this.props.requiredMessage,
      validators: this.props.validators,
    };
  }

  componentDidMount() {
    this.props.formService.registerInput(
      this.getDescriptorFromProps(this.state.value),
    );
    this.props.formEventEmitter.addListener(
      FormEvent.Submit,
      this.onFormSubmit,
    );
  }

  componentWillUnmount() {
    this.props.formService.unregisterInputById(this.id);
    this.props.formEventEmitter.removeListener(
      FormEvent.Submit,
      this.onFormSubmit,
    );
  }

  onFormSubmit() {
    this.updateInputState(this.getDescriptorFromProps(this.state.value));
  }

  updateInputState(descriptor: InputDescriptor) {
    const errors = this.props.formService.getErrorsFromInput(descriptor);
    const hasErrors = !!errors.length;

    this.setState({
      errors,
      hasErrors,
      value: descriptor.value,
    });
  }

  onInputChange(value: string) {
    const descriptor = this.getDescriptorFromProps(value);
    this.updateInputState(descriptor);

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  renderErrors(errors: string[]) {
    return (
      <div
        className={classNames(styles.errors, this.props.errorContainerClass)}
      >
        {errors.map((error, index) => (
          <div
            title={error}
            key={index}
            className={classNames(styles.error, this.props.errorClass)}
          >
            <span>{error}</span>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      id: notUsedId,
      containerClass,
      inputContainerClass,
      inputWrapperClass,
      errorContainerClass,
      errorClass,
      formService,
      formEventEmitter,
      className,
      placeholder,
      name,
      value,
      disabled,
      validators,
      required,
      requiredMessage,
      label,
      onChange,
      children,
      hasErrors: hasErrorsFromProps,
      ...rest
    } = this.props;

    const hasErrors =
      hasErrorsFromProps !== undefined
        ? hasErrorsFromProps
        : this.state.hasErrors;

    return (
      <div className={classNames(styles.container, containerClass)}>
        <div className={classNames(styles.inputContainer, inputContainerClass)}>
          {label && (
            <Label
              htmlFor={this.id}
              className={styles.label}
              required={required}
            >
              {label}
            </Label>
          )}
          <div className={classNames(styles.inputWrapper, inputWrapperClass)}>
            {this.props.children({
              name,
              disabled,
              placeholder,
              hasErrors,
              id: this.id,
              className: classNames(className, styles.input, {
                [styles.hasErrors]: hasErrors,
              }),
              value: this.state.value,
              onChange: this.onInputChange,
              ...rest,
            })}
            {this.renderErrors(this.state.errors)}
          </div>
        </div>
      </div>
    );
  }
}

export const FormInputDecorator = function<T>(
  Component: React.ComponentClass<T> | React.StatelessComponent<T>,
) {
  const DecoratedInput: React.SFC<T & DecoratedInputProps> = props => (
    <FormContext.Consumer>
      {({ formService, formEventEmitter }) => (
        <FormInput
          formService={formService}
          formEventEmitter={formEventEmitter}
          {...props}
        >
          {inputProps => <Component {...inputProps} />}
        </FormInput>
      )}
    </FormContext.Consumer>
  );

  DecoratedInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    hasErrors: PropTypes.bool,
    containerClass: PropTypes.string,
    inputContainerClass: PropTypes.string,
    inputWrapperClass: PropTypes.string,
    errorContainerClass: PropTypes.string,
    errorClass: PropTypes.string,
    validators: PropTypes.arrayOf(
      PropTypes.shape({
        errorMessage: PropTypes.string.isRequired,
        validate: PropTypes.func.isRequired,
      }),
    ),
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
  } as any;

  return DecoratedInput;
};

export default FormInput;
