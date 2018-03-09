import * as React from 'react';
import * as classNames from 'classnames';

const styles = require('./Label.css');

export interface LabelInterface {
  className?: string;
  required?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
}

const Label: React.SFC<LabelInterface> = ({
  className,
  htmlFor,
  required = false,
  children,
}) => (
  <label
    className={classNames(
      styles.container,
      className,
      { [styles.isRequired]: required },
    )}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

export default Label;
