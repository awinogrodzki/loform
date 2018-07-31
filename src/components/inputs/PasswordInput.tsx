import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps, DecoratedInputProps } from '../../types';

export const PasswordInput: React.SFC<InputProps> = ({
  id,
  disabled,
  className,
  name,
  placeholder,
  onChange = () => {},
  value = '',
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
