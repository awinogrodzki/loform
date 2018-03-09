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
          <button onClick={() => this.setState({ show: !this.state.show })}>toggle</button>
          {this.props.children}
        </div>
      );
    }

    return <button onClick={() => this.setState({ show: !this.state.show })}>toggle</button>;
  }
}

storiesOf('Form', module)
  .add('default', () => (
    <Form onSubmit={action('onSubmit')}>
      {({
        inputProps,
      }) => [
        <TextInput
          {...inputProps}
          id="firstName"
          name="firstName"
          key="firstName"
          label="First name"
          required
        />,
        <TextInput
          {...inputProps}
          id="lastName"
          name="lastName"
          key="lastName"
          label="Last name"
          required
        />,
        <PasswordInput
          {...inputProps}
          id="password"
          name="password"
          key="password"
          label="Password"
          required
        />,
        <SelectInput
          {...inputProps}
          id="country"
          name="country"
          key="country"
          label="Country"
          required
          options={[
            { value: '', label: 'Select country' },
            { value: 'PL', label: 'Polska' },
            { value: 'EN', label: 'England' },
          ]}
        />,
        <RadioInput
          {...inputProps}
          id="language"
          name="language"
          key="language"
          label="Language"
          required
          options={[
            { value: 'JP', label: 'JP' },
            { value: 'PL', label: 'PL', disabled: true },
            { value: 'EN', label: 'EN' },
          ]}
        />,
      ]}
    </Form>
  ))
  .add('with toggle', () => (
    <Form onSubmit={action('onSubmit')}>
      {({
        inputProps,
      }) => [
        <TextInput
          {...inputProps}
          id="firstName"
          name="firstName"
          key="firstName"
          value="preadded values"
          required
          requiredMessage="TEST"
        />,
        <Toggle key="lastName">
          <TextInput
            {...inputProps}
            id="lastName"
            name="lastName"
            required
          />
        </Toggle>,
        <PasswordInput
          {...inputProps}
          id="password"
          name="password"
          key="password"
          required
        />,
        <InputWithoutHOC id="test" key="test" name="test" onChange={() => {}} />,
      ]}
    </Form>
  ));

