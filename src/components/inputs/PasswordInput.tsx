import * as React from 'react';
import { FormInputDecorator } from 'components';
import { InputInterface, FormInputInterface } from 'types';

export const PasswordInput: React.SFC<InputInterface> = ({
  id,
  className,
  name,
  placeholder,
  onChange,
  value = undefined,
}) => (
  <input
    id={id}
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    placeholder={placeholder}
    type="password"
    value={value}
  />
);

export default FormInputDecorator<InputInterface>(PasswordInput);
