import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps, DecoratedInputProps } from '../../types';

export const TextAreaInput: React.SFC<
  InputProps & React.InputHTMLAttributes<HTMLTextAreaElement>
> = ({
  id,
  className,
  name,
  onChange = () => {},
  onBlur,
  value = '',
  disabled,
  ...rest
}) => (
  <textarea
    {...rest}
    id={id}
    onBlur={onBlur}
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    value={value}
    disabled={disabled}
  />
);

export default FormInputDecorator(TextAreaInput);
