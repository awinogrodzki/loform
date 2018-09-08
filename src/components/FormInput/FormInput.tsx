import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as uuid from 'uuid/v4';
import debounce = require('debounce');
import {
  InputDescriptor,
  FormInputProps,
  DecoratedInputProps,
  InputProps,
  InputValue,
} from '../../types';
import { FormContext } from '../../context';

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

    if (input.value === this.state.value) {
      return;
    }

    this.updateInputDescriptor();
  }

  updateInputDescriptor() {
    const descriptor = this.getDescriptorFromProps(this.state.value);
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
      this.getDescriptorFromProps(this.state.value),
    );
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
      this.getDescriptorFromProps(this.state.value),
    );

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
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
      value: this.state.value,
      onChange: this.onInputChange,
    });
  }
}

export const FormInputDecorator = function<T extends InputProps>(
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
  } as any;

  return DecoratedInput;
};

export default FormInput;
