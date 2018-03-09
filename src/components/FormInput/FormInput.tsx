import * as React from 'react';
import * as classNames from 'classnames';
import Label from 'components/Label';
import {
  FormService,
  FormEventEmitter,
} from 'services';
import {
  InputInterface,
  InputDescriptorInterface,
  SelectInputInterface,
  FormValuesInterface,
  InputValidatorInterface,
  FormInputInterface,
} from 'types';

const styles = require('./FormInput.css');

export interface FormInputProps extends FormInputInterface {
  children: <T>(inputProps: InputInterface & T) => React.ReactElement<any>;
}

class FormInput extends React.Component<FormInputProps> {
  static defaultProps: Partial<FormInputProps> = {
    value: '',
    validators: [],
  };

  public state: {
    value?: string;
    hasErrors: boolean;
    errors: string[];
  } = {
    value: this.props.value,
    hasErrors: false,
    errors: [],
  };

  constructor(props: FormInputProps) {
    super(props);

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
      id: this.props.id,
      label: this.props.label,
      name: this.props.name,
      required: this.props.required,
      requiredMessage: this.props.requiredMessage,
      validators: this.props.validators,
    };
  }

  componentDidMount() {
    this.props.formService.registerInput(this.getDescriptorFromProps(this.state.value));
    this.props.formEventEmitter.addSubmitListener(this.onFormSubmit);
  }

  componentWillUnmount() {
    this.props.formService.unregisterInputById(this.props.id);
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
    return errors.map((error, index) => (
      <div title={error} key={index} className={styles.error}>
        <span>{error}</span>
      </div>
    ));
  }

  render() {
    const {
      id,
      containerClass,
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
      ...rest,
    } = this.props;

    return (
      <div className={classNames(styles.container, containerClass)}>
        <div className={styles.inputContainer}>
          {
            label &&
            <Label
              htmlFor={id}
              className={styles.label}
              required={required}
            >
              {label}
            </Label>
          }
          <div className={styles.inputWrapper}>
            {this.renderErrors(this.state.errors)}
            {this.props.children({
              id,
              name,
              disabled,
              placeholder,
              className: classNames(
                className,
                styles.input,
                { [styles.hasErrors]: this.state.hasErrors },
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
};

export const FormInputDecorator = function <T>(
  Component: React.ComponentClass<T> | React.StatelessComponent<T>
) {
  return (props: FormInputInterface & T) => (
    <FormInput {...props}>
      {(inputProps) => <Component {...inputProps} />}
    </FormInput>
  );
};

export default FormInput;
