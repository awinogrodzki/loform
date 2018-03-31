import * as React from 'react';
import * as classNames from 'classnames';
import { FormInputDecorator } from '../../../components';
import { RadioInputInterface, FormInputInterface } from '../../../types';

const styles = require('./RadioInput.css');

const RadioInput: React.SFC<RadioInputInterface> = ({
  id,
  name,
  value,
  containerClassName,
  className,
  onChange,
  options,
}) => (
  <div>
    {options.map((option, index) => {
      const inputId = `${id}_${index}`;
      const inputName = `${name}`;
      const checked = value !== undefined && value === option.value;

      return (
        <div className={classNames(styles.container, containerClassName)} key={inputId}>
          <input
            id={inputId}
            disabled={option.disabled}
            type="radio"
            className={classNames(styles.input, className)}
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

export default FormInputDecorator<RadioInputInterface>(RadioInput);
