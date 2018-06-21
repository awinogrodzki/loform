import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps } from '../../types';

export const TextAreaInput: React.SFC<InputProps> = ({
  id,
  className,
  name,
  onChange = () => {},
  value,
  disabled,
}) => (
  <textarea
    id={id}
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    value={value}
    disabled={disabled}
  />
);

export default FormInputDecorator<InputProps>(TextAreaInput);
