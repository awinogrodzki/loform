import * as React from 'react';
import { SelectInputInterface, FormInputInterface } from 'types';
import { FormInputDecorator } from 'components';

const SelectInput: React.SFC<SelectInputInterface> = ({
  id,
  className,
  name,
  value,
  onChange,
  options = [],
}) => (
  <select
    id={id}
    name={name}
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
);

export default FormInputDecorator<SelectInputInterface>(SelectInput);
