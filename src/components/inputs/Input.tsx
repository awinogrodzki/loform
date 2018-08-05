import * as React from 'react';
import { FormInputDecorator } from '../../components';
import {
  InputProps as ParentInputProps,
  DecoratedInputProps,
} from '../../types';

export interface InputProps extends ParentInputProps {
  type?: string;
}

export const Input: React.SFC<
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
  type = 'text',
  ...rest
}) => (
  <input
    {...rest}
    id={id}
    disabled={disabled}
    onBlur={onBlur}
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    value={value}
    placeholder={placeholder}
    type={type}
  />
);

export default FormInputDecorator(Input);
