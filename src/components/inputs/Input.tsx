import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps as ParentInputProps, Overwrite } from '../../types';

interface InputProps extends ParentInputProps<string> {
  type?: string;
}

export const Input: React.FunctionComponent<
  Overwrite<JSX.IntrinsicElements['input'], InputProps>
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

Input.displayName = 'Input';
export default FormInputDecorator(Input);
