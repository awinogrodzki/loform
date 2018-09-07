## Registration form

```javascript
import { TextInput, PasswordInput, Form } from '@loform/react';

const renderErrors = (errors, name) => {
  if (!errors || !errors[name] || !errors[name].length) {
    return null;
  }

  return (
    <div className={styles.errors}>
      {errors[name].map((error, index) => (
        <span key={index} className={styles.error}>
          {error}
        </span>
      ))}
    </div>
  );
};

const hasErrors = (errors, name) => {
  return errors[name] && errors[name].length;
};

const RegistrationForm = ({ validationStrategy }) => (
  <Form
    className={styles.form}
    onSubmit={action('onSubmit')}
    onError={action('onError')}
    validationStrategy={validationStrategy}
  >
    {({ submit, errors }) => (
      <>
        {renderErrors(errors, 'email')}
        <TextInput
          className={classnames(styles.input, {
            [styles.hasErrors]: hasErrors(errors, 'email'),
          })}
          name="email"
          placeholder="Enter email address"
          required
          requiredMessage="Email is required."
          validators={[emailValidator('Email address is incorrect.')]}
        />
        {renderErrors(errors, 'password')}
        <PasswordInput
          className={classnames(styles.input, {
            [styles.hasErrors]: hasErrors(errors, 'password'),
          })}
          name="password"
          placeholder="Enter password"
          required
          requiredMessage="Password is required."
        />
        {renderErrors(errors, 'passwordRepeat')}
        <PasswordInput
          className={classnames(styles.input, {
            [styles.hasErrors]: hasErrors(errors, 'passwordRepeat'),
          })}
          name="passwordRepeat"
          placeholder="Repeat password"
          required
          requiredMessage="You need to repeat password."
          validators={[
            {
              errorMessage: 'Passwords do not match.',
              validate: (value, formValues) => {
                return value === formValues.password;
              },
            },
          ]}
        />
        {renderErrors(errors, 'agreement')}
        <p>
          <CheckboxInput
            className={classnames(styles.checkbox, {
              [styles.hasErrors]: hasErrors(errors, 'agreement'),
            })}
            name="agreement"
            value={true}
            validators={[
              {
                errorMessage: 'You need to accept Terms and Conditions',
                validate: value => value,
              },
            ]}
          />
          I accept Terms and Conditions
        </p>
        <button className={styles.submit} onClick={() => submit()}>
          Login
        </button>
      </>
    )}
  </Form>
);
```
