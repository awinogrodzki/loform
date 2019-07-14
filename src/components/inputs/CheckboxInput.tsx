import * as React from 'react';
import { CheckboxInputProps, Overwrite } from '../../types';
import { FormInputDecorator } from '../FormInput';

const CheckboxInput: React.FunctionComponent<
  Overwrite<JSX.IntrinsicElements['input'], CheckboxInputProps>
> = ({
  id,
  name,
  value = false,
  disabled,
  onChange = () => {},
  onBlur,
  ...rest
}) => {
  return (
    <input
      {...rest}
      id={id}
      name={name}
      checked={value}
      disabled={disabled}
      type="checkbox"
      onChange={e => onChange(e.target.checked)}
      onBlur={onBlur}
    />
  );
};

CheckboxInput.displayName = 'CheckboxInput';
export default FormInputDecorator(CheckboxInput);
