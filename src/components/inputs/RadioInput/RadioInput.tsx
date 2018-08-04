import * as React from 'react';
import { FormInputDecorator } from '../../../components';
import { RadioInputProps, DecoratedInputProps } from '../../../types';

const RadioInput: React.SFC<
  RadioInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  id,
  name,
  value = '',
  className,
  onChange = () => {},
  onBlur,
  options = [],
  ...rest
}) => (
  <div className={className}>
    {options.map((option, index) => {
      const inputId = `${id}_${index}`;
      const inputName = `${name}`;
      const checked = value !== undefined && value === option.value;

      return (
        <div key={inputId}>
          <input
            {...rest}
            onBlur={onBlur}
            id={inputId}
            disabled={option.disabled}
            type="radio"
            name={inputName}
            value={option.value}
            checked={checked}
            onClick={() => !option.disabled && onChange(option.value)}
          />
          <label
            onClick={() => !option.disabled && onChange(option.value)}
            htmlFor={inputId}
          >
            {option.label}
          </label>
        </div>
      );
    })}
  </div>
);

export default FormInputDecorator<RadioInputProps>(RadioInput);
