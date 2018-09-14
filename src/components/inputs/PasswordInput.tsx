import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps } from '../../types';

export const PasswordInput: React.SFC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  id,
  disabled,
  className,
  name,
  placeholder,
  onChange = () => {},
  onBlur,
  value = '',
  ...rest
}) => (
  <input
    {...rest}
    id={id}
    onBlur={onBlur}
    disabled={disabled}
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    placeholder={placeholder}
    type="password"
    value={value}
  />
);

PasswordInput.displayName = 'PasswordInput';
export default FormInputDecorator(PasswordInput);
