import * as React from 'react';
import * as classNames from 'classnames';
import { FormInputDecorator } from '../../../components';
import { RadioInputProps } from '../../../types';

const styles = require('./RadioInput.css');

const RadioInput: React.SFC<RadioInputProps> = ({
  id,
  name,
  value,
  className,
  onChange = () => {},
  hasErrors,
  options = [],
}) => (
  <div>
    {options.map((option, index) => {
      const inputId = `${id}_${index}`;
      const inputName = `${name}`;
      const checked = value !== undefined && value === option.value;

      return (
        <div
          className={classNames(
            styles.container,
            className,
            { [styles.hasErrors]: hasErrors },
          )}
          key={inputId}
        >
          <input
            id={inputId}
            disabled={option.disabled}
            type="radio"
            name={inputName}
            className={styles.input}
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
