import * as React from 'react';
import * as classNames from 'classnames';
import { SelectInputProps } from '../../../types';
import { FormInputDecorator } from '../../../components';

const styles = require('./SelectInput.css');

const SelectInput: React.SFC<SelectInputProps> = ({
  id,
  className,
  name,
  value,
  disabled,
  onChange = () => {},
  options = [],
}) => (
  <select
    id={id}
    name={name}
    disabled={disabled}
    className={classNames(className, styles.input)}
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
);

export default FormInputDecorator<SelectInputProps>(SelectInput);
