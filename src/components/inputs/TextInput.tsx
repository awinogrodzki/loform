import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps, Overwrite } from '../../types';

export const TextInput: React.SFC<
  Overwrite<React.InputHTMLAttributes<HTMLInputElement>, InputProps<string>>
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

TextInput.displayName = 'TextInput';
export default FormInputDecorator(TextInput);
