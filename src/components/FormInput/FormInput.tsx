import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as uuid from 'uuid/v4';
import debounce = require('debounce');
import {
  InputDescriptor,
  FormInputProps,
  GenericInputProps,
  InputProps,
  InputValue,
} from '../../types';
import { FormContext } from '../../context';
import { FormEvent } from '../../services';

export interface FormInputState {
  value?: InputValue;
  prevValueProp?: string;
}

export class FormInput extends React.PureComponent<FormInputProps> {
  static defaultProps: Partial<FormInputProps> = {
    validators: [],
    debounce: 0,
  };

  public state: FormInputState = {
    value: this.props.value,
    prevValueProp: this.props.value,
  };

  private id: string;

  constructor(props: FormInputProps) {
    super(props);

    this.id = props.id || uuid();
    this.onInputChange = this.onInputChange.bind(this);
    this.updateInputDescriptor = debounce(
      this.updateInputDescriptor,
      this.props.debounce,
    );
    this.onBlur = this.onBlur.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  static getDerivedStateFromProps(
    props: FormInputProps,
    state: FormInputState,
  ) {
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

    if (input.value === this.getValue()) {
      return;
    }

    this.updateInputDescriptor();
  }

  getValue() {
    return this.props.controlled ? this.props.value : this.state.value;
  }

  updateInputDescriptor() {
    const descriptor = this.getDescriptorFromProps(this.getValue());
    this.props.formService.updateInput(descriptor);
    this.props.formEventEmitter.update(descriptor);
  }

  getDescriptorFromProps(value?: InputValue): InputDescriptor {
    return {
      value,
      id: this.id,
      name: this.props.name,
      required: this.props.required || false,
      requiredMessage: this.props.requiredMessage,
      validators: this.props.validators,
      validateOnChange: this.props.validateOnChange === false ? false : true,
    };
  }

  componentDidMount() {
    this.props.formService.registerInput(
      this.getDescriptorFromProps(this.getValue()),
    );
    this.props.formEventEmitter.addListener(FormEvent.Clear, this.onClear);
  }

  componentWillUnmount() {
    this.props.formService.unregisterInputById(this.id);
  }

  updateInputState(value?: InputValue) {
    this.setState({
      value,
    });
  }

  onInputChange(value?: InputValue) {
    this.updateInputState(value);

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  onBlur(e: React.FocusEvent<any>) {
    this.props.formEventEmitter.blur(
      this.getDescriptorFromProps(this.getValue()),
    );

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onClear() {
    this.setState({ value: this.props.value });
  }

  render() {
    const {
      id,
      formService,
      formEventEmitter,
      className,
      placeholder,
      name,
      value,
      disabled,
      debounce,
      validateOnChange,
      validators,
      required,
      requiredMessage,
      onChange,
      children,
      onBlur,
      controlled = false,
      ...rest
    } = this.props;

    return this.props.children({
      ...rest,
      name,
      disabled,
      placeholder,
      className,
      onBlur: this.onBlur,
      id: this.id,
      value: this.getValue(),
      onChange: this.onInputChange,
    });
  }
}

export const FormInputDecorator = function<T extends InputProps>(
  Component: React.ComponentType<T>,
) {
  const GenericInput: React.SFC<GenericInputProps<T>> = props => (
    <FormContext.Consumer>
      {({ formService, formEventEmitter }) => (
        <FormInput
          formService={formService}
          formEventEmitter={formEventEmitter}
          {...props}
        >
          {(inputProps) => <Component {...inputProps as unknown as T} />}
        </FormInput>
      )}
    </FormContext.Consumer>
  );

  GenericInput.displayName =
    Component.displayName || Component.name || 'GenericInput';
  GenericInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    debounce: PropTypes.number,
    validateOnChange: PropTypes.bool,
    onChange: PropTypes.func,
    validators: PropTypes.arrayOf(
      PropTypes.shape({
        errorMessage: PropTypes.string.isRequired,
        validate: PropTypes.func.isRequired,
      }),
    ),
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    ...((Component as any).propTypes || {}),
  } as any;

  return GenericInput;
};

export default FormInput;
