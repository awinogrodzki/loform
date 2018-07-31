import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps, DecoratedInputProps } from '../../types';

export const TextInput: React.SFC<InputProps> = ({
  id,
  className,
  name,
  disabled,
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
    type="text"
    value={value}
    placeholder={placeholder}
  />
);

export default FormInputDecorator<InputProps>(TextInput);
