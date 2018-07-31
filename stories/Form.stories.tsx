import * as React from 'react';
import * as classnames from 'classnames';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  TextInput,
  PasswordInput,
  SelectInput,
  RadioInput,
  Form,
  Input,
} from '../src/components';
import { emailValidator } from '../src/validators';
import { FormErrors } from '../src/types';

const styles = require('./Form.stories.css');
const registrationReadme = require('./readme/registration.md');
const { withReadme } = require('storybook-readme');

class Toggle extends React.Component {
  public state: {
    show: boolean;
  } = {
    show: true,
  };

  render() {
    if (this.state.show) {
      return (
        <div>
          <button
            className={styles.pinButton}
            onClick={() => this.setState({ show: !this.state.show })}
          >
            I don't have pin
          </button>
          {this.props.children}
        </div>
      );
    }

    return (
      <button
        className={styles.pinButton}
        onClick={() => this.setState({ show: !this.state.show })}
      >
        I have pin
      </button>
    );
  }
}

const renderErrors = (errors: FormErrors, name: string) => {
  if (!errors || !errors[name]) {
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

const RegistrationForm = () => (
  <Form
    className={styles.form}
    onSubmit={action('onSubmit')}
    onError={action('onError')}
  >
    {({ submit, errors }) => (
      <>
        {renderErrors(errors, 'email')}
        <TextInput
          className={classnames(styles.input, {
            [styles.hasErrors]: !!errors.email,
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
            [styles.hasErrors]: !!errors.password,
          })}
          name="password"
          placeholder="Enter password"
          required
          requiredMessage="Password is required."
        />
        {renderErrors(errors, 'passwordRepeat')}
        <PasswordInput
          className={classnames(styles.input, {
            [styles.hasErrors]: !!errors.passwordRepeat,
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
        <button className={styles.submit} onClick={() => submit()}>
          Login
        </button>
      </>
    )}
  </Form>
);

storiesOf('Form', module)
  .add(
    'registration',
    withReadme(registrationReadme, () => <RegistrationForm />),
  )
  .add('random', () => (
    <Form
      className={styles.form}
      onSubmit={action('onSubmit')}
      onError={action('onError')}
    >
      {({ submit, errors }) => (
        <>
          {renderErrors(errors, 'name')}
          <TextInput
            className={classnames(styles.input, {
              [styles.hasErrors]: !!errors.name,
            })}
            name="name"
            key="name"
            required
            placeholder="Name"
          />

          {renderErrors(errors, 'password')}
          <PasswordInput
            className={classnames(styles.input, {
              [styles.hasErrors]: !!errors.password,
            })}
            name="password"
            key="password"
            required
            placeholder="Password"
          />

          {renderErrors(errors, 'country')}
          <SelectInput
            className={classnames(styles.input, {
              [styles.hasErrors]: !!errors.country,
            })}
            name="country"
            key="country"
            required
            options={[
              { value: '', label: 'Select country' },
              { value: 'US', label: 'United States' },
              { value: 'EN', label: 'England' },
            ]}
          />

          {renderErrors(errors, 'language')}
          <RadioInput
            className={classnames(styles.radioInput, {
              [styles.hasErrors]: !!errors.language,
            })}
            name="language"
            key="language"
            required
            options={[
              { value: 'EN', label: 'en' },
              { value: 'JP', label: 'jp' },
              { value: 'PL', label: 'pl', disabled: true },
            ]}
          />
          <button className={styles.submit} onClick={() => submit()}>
            Submit
          </button>
        </>
      )}
    </Form>
  ))
  .add('with toggle', () => (
    <Form
      className={styles.form}
      onSubmit={action('onSubmit')}
      onError={action('onError')}
    >
      {({ submit, errors }) => (
        <>
          {renderErrors(errors, 'username')}
          <TextInput
            className={classnames(styles.input, {
              [styles.hasErrors]: !!errors.username,
            })}
            name="username"
            placeholder="Enter username"
            required
            requiredMessage="Username is required."
          />
          <Toggle>
            {renderErrors(errors, 'pin')}
            <Input
              className={classnames(styles.input, {
                [styles.hasErrors]: !!errors.pin,
              })}
              name="pin"
              placeholder="Pin code"
              type="number"
              min={0}
              max={9999}
              required
            />
          </Toggle>
          {renderErrors(errors, 'password')}
          <PasswordInput
            className={classnames(styles.input, {
              [styles.hasErrors]: !!errors.password,
            })}
            name="password"
            placeholder="Enter password"
            required
          />
          <button className={styles.submit} onClick={() => submit()}>
            Login
          </button>
        </>
      )}
    </Form>
  ));
