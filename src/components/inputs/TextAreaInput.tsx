import * as React from 'react';
import { FormInputDecorator } from 'components';
import { InputInterface, FormInputInterface } from 'types';

export const TextAreaInput: React.SFC<InputInterface> = ({
  id,
  className,
  name,
  onChange,
  value = undefined,
}) => (
  <textarea
    id={id}
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    value={value}
  />
);

export default FormInputDecorator<InputInterface>(TextAreaInput);
