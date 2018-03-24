import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  TextInput,
  PasswordInput,
  SelectInput,
  RadioInput,
  Label,
  Form,
} from 'components';
import { TextInput as InputWithoutHOC } from 'components/inputs/TextInput';

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

    return <button onClick={() => this.setState({ show: !this.state.show })}>I have pin</button>;
  }
}

storiesOf('Form', module)
  .add('default', () => (
    <Form onSubmit={action('onSubmit')}>
      {({
        inputProps,
      }) =>
        <>
          <TextInput
            {...inputProps}
            name="firstName"
            key="firstName"
            label="First name"
            required
          />
          <TextInput
            {...inputProps}
            name="lastName"
            key="lastName"
            label="Last name"
            required
          />
          <PasswordInput
            {...inputProps}
            name="password"
            key="password"
            label="Password"
            required
          />
          <SelectInput
            {...inputProps}
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
            {...inputProps}
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
        </>
      }
    </Form>
  ))
  .add('with toggle', () => (
    <Form onSubmit={action('onSubmit')}>
      {({
        inputProps,
        submit,
      }) =>
        <>
          <TextInput
            {...inputProps}
            name="username"
            placeholder="Enter username"
            required
            requiredMessage="Username is required."
          />
          <Toggle>
            <TextInput
              {...inputProps}
              name="pin"
              placeholder="Pin code"
              required
            />
          </Toggle>
          <PasswordInput
            {...inputProps}
            name="password"
            placeholder="Enter password"
            required
          />
          <button onClick={() => submit()}>Login</button>
        </>
      }
    </Form>
  ));

