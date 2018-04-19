import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import * as uuid from 'uuid/v4';
import Label from '../Label';
import {
  FormService,
  FormEventEmitter,
} from '../../services';
import {
  InputInterface,
  InputDescriptorInterface,
  SelectInputInterface,
  FormValuesInterface,
  InputValidatorInterface,
  FormInputInterface,
} from '../../types';

const styles = require('./FormInput.css');

export interface FormInputProps extends FormInputInterface {
  children: <T>(inputProps: InputInterface & T) => React.ReactElement<any>;
}

export class FormInput extends React.Component<FormInputProps> {
  static defaultProps: Partial<FormInputProps> = {
    value: '',
    validators: [],
  };

  public state: {
    value: string;
    hasErrors: boolean;
    errors: string[];
  } = {
    value: this.props.value || '',
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

  componentWillReceiveProps(nextProps: FormInputProps) {
    if (nextProps.value !== undefined && this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  getDescriptorFromProps(value: string): InputDescriptorInterface {
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
    this.props.formService.registerInput(this.getDescriptorFromProps(this.state.value));
    this.props.formEventEmitter.addSubmitListener(this.onFormSubmit);
  }

  componentWillUnmount() {
    this.props.formService.unregisterInputById(this.id);
    this.props.formEventEmitter.removeSubmitListener(this.onFormSubmit);
  }

  onFormSubmit() {
    this.validate(this.getDescriptorFromProps(this.state.value));
  }

  validate(descriptor: InputDescriptorInterface) {
    const errors = this.props.formService.getErrorsFromInput(descriptor);
    const hasErrors = !!errors.length;

    this.setState({
      errors,
      hasErrors,
      value: descriptor.value,
    });

    return !hasErrors;
  }

  onInputChange(value: string) {
    const descriptor = this.getDescriptorFromProps(value);
    this.props.formService.updateInput(descriptor);
    this.props.formEventEmitter.triggerUpdate();

    this.validate(descriptor);

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  renderErrors(errors: string[]) {
    return (
      <div className={classNames(styles.errors, this.props.errorContainerClass)}>
        {errors.map((error, index) => (
          <div
            title={error}
            key={index}
            className={classNames(
              styles.error,
              this.props.errorClass,
            )}
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
      ...rest,
    } = this.props;

    const hasErrors = hasErrorsFromProps !== undefined
      ? hasErrorsFromProps  : this.state.hasErrors;

    return (
      <div className={classNames(styles.container, containerClass)}>
        <div className={classNames(styles.inputContainer, inputContainerClass)}>
          {
            label &&
            <Label
              htmlFor={this.id}
              className={styles.label}
              required={required}
            >
              {label}
            </Label>
          }
          <div className={classNames(styles.inputWrapper, inputWrapperClass)}>
            {this.renderErrors(this.state.errors)}
            {this.props.children({
              name,
              disabled,
              placeholder,
              hasErrors,
              id: this.id,
              className: classNames(
                className,
                styles.input,
                { [styles.hasErrors]: hasErrors },
              ),
              value: this.state.value,
              onChange: this.onInputChange,
              ...rest,
            })}
          </div>
        </div>
      </div>
    );
  }
}

export const FormInputDecorator = function <T>(
  Component: React.ComponentClass<T> | React.StatelessComponent<T>,
) {
  type ComposedInterface = FormInputInterface & T;

  const Input: React.SFC<ComposedInterface> = props => (
    <FormInput {...props}>
      {inputProps => <Component {...inputProps} />}
    </FormInput>
  );

  Input.propTypes = {
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
    formService: PropTypes.instanceOf(FormService).isRequired,
    formEventEmitter: PropTypes.instanceOf(FormEventEmitter).isRequired,
    validators: PropTypes.arrayOf(PropTypes.shape({
      errorMessage: PropTypes.string.isRequired,
      validate: PropTypes.func.isRequired,
    })),
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
  } as any;

  return Input;
};

export default FormInput;
