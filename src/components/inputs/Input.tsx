import * as React from 'react';
import { FormInputDecorator } from '../../components';
import {
  InputProps as ParentInputProps,
  DecoratedInputProps,
} from '../../types';

export interface InputProps extends ParentInputProps {
  type?: string;
}

export const Input: React.SFC<InputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  className,
  name,
  disabled,
  placeholder,
  onChange = () => {},
  value,
  type = 'text',
  ...rest
}) => (
  <input
    id={id}
    disabled={disabled}
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    value={value}
    placeholder={placeholder}
    type={type}
    {...rest}
  />
);

export default FormInputDecorator<InputProps & React.InputHTMLAttributes<HTMLInputElement>>(Input);
