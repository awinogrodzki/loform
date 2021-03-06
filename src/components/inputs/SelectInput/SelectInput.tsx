import * as React from 'react';
import { SelectInputProps } from '../../../types';
import { FormInputDecorator } from '../../../components';

export const SelectInput: React.FunctionComponent<
  SelectInputProps & JSX.IntrinsicElements['select']
> = ({
  id,
  className,
  name,
  value = '',
  disabled,
  onChange = () => {},
  onBlur,
  options = [],
  ...rest
}) => (
  <select
    {...rest}
    id={id}
    name={name}
    onBlur={onBlur}
    disabled={disabled}
    className={className}
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

SelectInput.displayName = 'SelectInput';
export default FormInputDecorator(SelectInput);
