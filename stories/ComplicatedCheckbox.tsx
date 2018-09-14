import * as React from 'react';
import { FormInputDecorator } from '../src/components';
import { InputProps } from '../src/types';

export interface ComplicatedCheckboxProps extends InputProps {
  checked?: boolean;
}

interface ComplicatedCheckboxState {
  checked: boolean;
  initialValue?: string;
}

class ComplicatedCheckbox extends React.Component<ComplicatedCheckboxProps> {
  public state: ComplicatedCheckboxState = {
    checked: this.props.checked || false,
    initialValue: this.props.value || '',
  };

  constructor(props: ComplicatedCheckboxProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      this.props.onChange!(this.state.initialValue);
    } else {
      this.props.onChange!(undefined);
    }

    this.setState({
      checked: isChecked,
    });
  }

  render() {
    const { id, name, disabled } = this.props;

    return (
      <input
        id={id}
        name={name}
        disabled={disabled}
        value={this.state.initialValue}
        checked={this.state.checked}
        onChange={this.handleChange}
        type="checkbox"
      />
    );
  }
}

export default FormInputDecorator(ComplicatedCheckbox);
