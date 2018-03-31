import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputInterface, FormInputInterface } from '../../types';

export const TextInput: React.SFC<InputInterface> = ({
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
    type="text"
    value={value}
    placeholder={placeholder}
  />
);

export default FormInputDecorator<InputInterface>(TextInput);
