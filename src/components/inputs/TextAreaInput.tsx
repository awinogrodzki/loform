import * as React from 'react';
import { FormInputDecorator } from '../../components';
import { InputProps, Overwrite } from '../../types';

export const TextAreaInput: React.FunctionComponent<
  Overwrite<JSX.IntrinsicElements['textarea'], InputProps<string>>
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

TextAreaInput.displayName = 'TextAreaInput';
export default FormInputDecorator(TextAreaInput);
