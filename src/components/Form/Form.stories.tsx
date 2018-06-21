import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  TextInput,
  PasswordInput,
  SelectInput,
  RadioInput,
  Form,
} from '../../components';
import { emailValidator } from '../..';

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
          <button onClick={() => this.setState({ show: !this.state.show })}>
            I don't have pin
          </button>
          {this.props.children}
        </div>
      );
    }

    return (
      <button onClick={() => this.setState({ show: !this.state.show })}>
        I have pin
      </button>
    );
  }
}

storiesOf('Form', module)
  .add('default', () => (
    <Form onSubmit={action('onSubmit')} onError={action('onError')}>
      {({ submit }) => (
        <>
          <TextInput
            id="firstName"
            name="firstName"
            key="firstName"
            label="First name"
            required
          />
          <TextInput
            name="lastName"
            key="lastName"
            label="Last name"
            required
          />
          <PasswordInput
            name="password"
            key="password"
            label="Password"
            required
          />
          <SelectInput
            name="country"
            key="country"
            label="Country"
            required
            options={[
              { value: '', label: 'Select country' },
              { value: 'PL', label: 'Polska' },
              { value: 'EN', label: 'England' },
            ]}
          />
          <RadioInput
            name="language"
            key="language"
            label="Language"
            required
            options={[
              { value: 'JP', label: 'jp' },
              { value: 'PL', label: 'pl', disabled: true },
              { value: 'EN', label: 'en' },
            ]}
          />
          <button onClick={() => submit()}>Submit</button>
        </>
      )}
    </Form>
  ))
  .add('with toggle', () => (
    <Form onSubmit={action('onSubmit')} onError={action('onError')}>
      {({ submit }) => (
        <>
          <TextInput
            name="username"
            placeholder="Enter username"
            required
            requiredMessage="Username is required."
          />
          <Toggle>
            <TextInput name="pin" placeholder="Pin code" required />
          </Toggle>
          <PasswordInput
            name="password"
            placeholder="Enter password"
            required
          />
          <button onClick={() => submit()}>Login</button>
        </>
      )}
    </Form>
  ))
  .add('login form', () => (
    <Form onSubmit={action('onSubmit')} onError={action('onError')}>
      {({ submit }) => (
        <>
          <TextInput
            name="email"
            placeholder="Enter email address"
            required
            requiredMessage="Email is required."
            validators={[emailValidator('Email address is incorrect.')]}
          />
          <PasswordInput
            name="password"
            placeholder="Enter password"
            required
          />
          <button onClick={() => submit()}>Login</button>
        </>
      )}
    </Form>
  ));
