import * as React from 'react';
import { CheckboxInputProps, DecoratedInputProps } from '../../types';
import { FormInputDecorator } from '../FormInput';

const CheckboxInput: React.SFC<CheckboxInputProps> = ({
  id,
  name,
  value = false,
  disabled,
  onChange = () => {},
}) => {
  return (
    <input
      id={id}
      name={name}
      checked={value}
      disabled={disabled}
      type="checkbox"
      onChange={e => onChange(e.target.checked)}
    />
  );
}

export default FormInputDecorator(CheckboxInput);
