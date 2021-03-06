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
  CheckboxInput,
  onlyOnSubmit,
  onInputChange,
  onInputBlur,
} from '../src/components';
import { emailValidator } from '../src/validators';
import { FormErrors, FormValidationStrategy } from '../src/types';
import ComplicatedCheckbox from './ComplicatedCheckbox';

const styles = require('./Form.stories.css');
const registrationReadme = require('./readme/registration.md');
const asyncReadme = require('./readme/async.md');
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

class ControlledInput extends React.Component {
  public state: {
    name: string;
  } = {
    name: '',
  };

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState({ name: `User ${Math.random() * 10000}` })
          }
        >
          Random name
        </button>
        Name: {this.state.name}
        <TextInput
          name="name"
          value={this.state.name}
          controlled={true}
          placeholder="Enter name"
          onChange={value =>
            this.setState({ name: value }, () => console.log('change'))
          }
        />
      </div>
    );
  }
}

const renderErrors = (errors: FormErrors, name: string) => {
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

const hasErrors = (errors: FormErrors, name: string) => {
  return errors[name] && errors[name].length;
};

const RegistrationForm = ({
  validationStrategy,
  clearOnSubmit = false,
}: {
  validationStrategy: FormValidationStrategy;
  clearOnSubmit?: boolean;
}) => (
  <Form
    clearOnSubmit={clearOnSubmit}
    className={styles.form}
    onSubmit={action('onSubmit')}
    onError={action('onError')}
    validationStrategy={validationStrategy}
  >
    {({ submit, errors, clear }) => (
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
        <button className={styles.clear} onClick={() => clear()}>
          Clear
        </button>
      </>
    )}
  </Form>
);

storiesOf('Form', module)
  .add(
    'registration with onInputBlur form validation strategy',
    withReadme(registrationReadme, () => (
      <RegistrationForm validationStrategy={onInputBlur} />
    )),
  )
  .add('registration with onlyOnSubmit form validation strategy', () => (
    <RegistrationForm validationStrategy={onlyOnSubmit} />
  ))
  .add('registration with onInputChange form validation strategy', () => (
    <RegistrationForm validationStrategy={onInputChange} />
  ))
  .add('registration with clearOnSubmit prop set to true', () => (
    <RegistrationForm validationStrategy={onInputBlur} clearOnSubmit={true} />
  ))
  .add(
    'with asynchronous (500ms) username validator',
    withReadme(asyncReadme, () => (
      <Form
        className={styles.form}
        onSubmit={action('onSubmit')}
        onError={action('onError')}
      >
        {({ submit, errors, isValidating }) => (
          <>
            {isValidating && <span>Validating...</span>}
            {renderErrors(errors, 'username')}
            <TextInput
              className={classnames(styles.input, {
                [styles.hasErrors]: hasErrors(errors, 'name'),
              })}
              name="username"
              key="username"
              required
              placeholder="Username"
              validateOnChange={false}
              validators={[
                {
                  errorMessage: 'Username should be "admin"',
                  validate: value =>
                    new Promise(resolve =>
                      setTimeout(() => resolve(value === 'admin'), 500),
                    ),
                },
              ]}
            />
            {renderErrors(errors, 'password')}
            <PasswordInput
              className={classnames(styles.input, {
                [styles.hasErrors]: hasErrors(errors, 'password'),
              })}
              name="password"
              key="password"
              required
              placeholder="Password"
            />
            <button className={styles.submit} onClick={() => submit()}>
              Submit
            </button>
          </>
        )}
      </Form>
    )),
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
              [styles.hasErrors]: hasErrors(errors, 'name'),
            })}
            name="name"
            key="name"
            required
            placeholder="Name"
          />

          {renderErrors(errors, 'password')}
          <PasswordInput
            className={classnames(styles.input, {
              [styles.hasErrors]: hasErrors(errors, 'password'),
            })}
            name="password"
            key="password"
            required
            placeholder="Password"
          />

          {renderErrors(errors, 'country')}
          <SelectInput
            className={classnames(styles.input, {
              [styles.hasErrors]: hasErrors(errors, 'country'),
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
              [styles.hasErrors]: hasErrors(errors, 'language'),
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
              [styles.hasErrors]: hasErrors(errors, 'username'),
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
                [styles.hasErrors]: hasErrors(errors, 'pin'),
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
              [styles.hasErrors]: hasErrors(errors, 'password'),
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
  ))
  .add('complicated checkbox', () => (
    <Form
      className={styles.form}
      onSubmit={action('onSubmit')}
      onError={action('onError')}
    >
      {({ submit }) => (
        <>
          <p>
            <ComplicatedCheckbox
              name="agreement"
              value="accepted"
              checked={true}
            />
            I accept Terms and Conditions
          </p>
          <button className={styles.submit} onClick={() => submit()}>
            Try me
          </button>
        </>
      )}
    </Form>
  ))
  .add('controlled input', () => (
    <Form
      className={styles.form}
      onSubmit={action('onSubmit')}
      onError={action('onError')}
    >
      {({ submit }) => (
        <>
          <ControlledInput />
          <button className={styles.submit} onClick={() => submit()}>
            Submit
          </button>
        </>
      )}
    </Form>
  ));
  // .add('debounced input', () => (
  //   <Form
  //     className={styles.form}
  //     onSubmit={action('onSubmit')}
  //     onError={action('onError')}
  //   >
  //     {({ submit }) => (
  //       <TextInput name="name" debounce={500} onChange={action('onChange')} />
  //     )}
  //   </Form>
  // ));
