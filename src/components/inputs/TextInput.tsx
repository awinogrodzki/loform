import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps, DecoratedInputProps } from '../../types';

export const TextInput: React.SFC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  id,
  className,
  name,
  disabled,
  placeholder,
  onChange = () => {},
  onBlur,
  value = '',
  ...rest
}) => (
  <input
    {...rest}
    id={id}
    disabled={disabled}
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    type="text"
    value={value}
    onBlur={onBlur}
    placeholder={placeholder}
  />
);

export default FormInputDecorator(TextInput);
