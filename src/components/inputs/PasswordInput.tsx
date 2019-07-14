import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps, Overwrite } from '../../types';

export const PasswordInput: React.FunctionComponent<
  Overwrite<JSX.IntrinsicElements['input'], InputProps<string>>
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
