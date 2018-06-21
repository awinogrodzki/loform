import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps } from '../../types';

export const PasswordInput: React.SFC<InputProps> = ({
  id,
  disabled,
  className,
  name,
  placeholder,
  onChange = () => {},
  value = undefined,
}) => (
  <input
    id={id}
    disabled={disabled}
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    placeholder={placeholder}
    type="password"
    value={value}
  />
);

export default FormInputDecorator<InputProps>(PasswordInput);
