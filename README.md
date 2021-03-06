# loform

loform is light, easy to use and extendable form validation library written in TypeScript. Currently available for React.

See **Examples** in Storybook [here](https://awinogrodzki.github.io/loform/)

### Why not Redux-Form?

Below is a quote from the authors of [Formik](https://github.com/jaredpalmer/formik)

> By now, you might be thinking, "Why didn't you just use
> [Redux-Form](https://github.com/erikras/redux-form)?" Good question.
>
> 1.  According to our prophet Dan Abramov,
>     [**form state is inherently ephemeral and local**, so tracking it in Redux (or any kind of Flux library) is unnecessary](https://github.com/reactjs/redux/issues/1287#issuecomment-175351978)
> 2.  Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY
>     SINGLE KEYSTROKE. This is fine for small apps, but as your Redux app grows,
>     input latency will continue to increase if you use Redux-Form.
> 3.  Redux-Form is 22.5 kB minified gzipped (Formik is 7.8 kB)

"Why should you choose loform over Formik then?", you may ask.

1.  Sometimes size matter, and loform is lighter than Formik.
2.  Less mess. In loform, validation is sole responsibility of an input. If you delete an input, you don't need to worry about updating your form.
3.  More complex forms, easier to maintain. You can create and manage state of only one form in Formik, while loform allows you to control multiple forms by sharing same instance of [FormService](#formservice)
4.  With loform you can submit your Form outside of Form component. Actually, you can do it anywhere in the application using [FormEventEmitter](#formeventemitter). You cannot do that with Formik.

## Table of Contents

- [React](#react)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Basic form](#basic-form)
    - [Custom input](#custom-input)
    - [The checkbox input problem](#the-checkbox-input-problem)
    - [Advanced form](#advanced-form)
  - [Components](#components)
  - [Inputs](#inputs)
    - [Input](#input)
    - [TextInput](#textinput)
    - [PasswordInput](#passwordinput)
    - [TextAreaInput](#textareainput)
    - [CheckboxInput](#checkboxinput)
    - [SelectInput](#selectinput)
    - [RadioInput](#radioinput)
  - [Types](#types)
    - [Async validators](#async-validators)
  - [Services](#services)
  - [Validation Strategies](#validation-strategies)
- [Development](#development)
- [Contributing](#contributing)

It can be used with TypeScript (definition files included) and pure JavaScript.

## React

### Module size

**23kb minified (5kb gzipped)**

loform for React was inspired by Render Props concept. [Here's why to use Render Props](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

### Requirements

---

- **React** and **React DOM** version **^16.5.0**

Go straight to [Docs](#components)

### Installation

---

#### npm

```
npm install @loform/react --save
```

#### yarn

```
yarn add @loform/react
```

### Usage

---

_All examples are in JavaScript_

#### Basic form

```javascript
import React from 'react';
import { Form, TextInput, PasswordInput, emailValidator } from '@loform/react';

const renderErrors = (errors, inputName) =>
  errors[inputName] &&
  errors[inputName].length && // Since version 4.0 you will always receive array for a given field. If the field is valid, array of errors should be empty.
  errors[inputName].map((error, index) => (
    <span key={index} className="error">
      {error}
    </span>
  ));

const LoginForm = () => (
  <Form className="form" onSubmit={values => console.log(values)}>
    {({ submit, errors }) => (
      <>
        {/* Since version 3.0 you control styles and rendering order of errors */}
        {renderErrors(errors, 'email')}
        <TextInput
          className="emailInput"
          name="email"
          value="example@email.com"
          placeholder="Enter email address"
          validators={[emailValidator('Value is not a valid email address')]}
          required
          requiredMessage="Email is required."
        />
        {renderErrors(errors, 'password')}
        <PasswordInput
          name="password"
          required
          requiredMessage="Password is required."
        />
        <button onClick={() => submit()}>Submit form</button>
      </>
    )}
  </Form>
);
```

#### Custom input

In order for input to work, you need to wrap it with **FormInputDecorator** HOC

##### Props passed by FormInputDecorator HOC

- id: string
- name: string
- value: any
- onChange: (value?: any) => any
- onBlur: (event: React.FocusEvent<any>) => any
- disabled?: boolean
- placeholder?: string
- ...rest _all other props given to the HOC will be passed down to your component (eg. options in SelectInput)_

```javascript
import React from 'react';
import classnames from 'classnames';
import { FormInputDecorator } from '@loform/react';

const ON = 'on';
const OFF = 'off';

export const SwitchInput = ({ onChange, onBlur, hasErrors, value }) => (
  <div
    className={classnames('switchInput', { switchInput__hasErrors: hasErrors })}
  >
    SWITCH ME ON
    <input
      type="radio"
      value={ON}
      checked={value === ON}
      onChange={() => onChange(ON)}
      onBlur={onBlur} // You need to pass onBlur function, in order for onInputBlur validation to work
    />
    <input
      type="radio"
      value={OFF}
      checked={value === OFF}
      onChange={() => onChange(OFF)}
      onBlur={onBlur} // As above
    />
  </div>
);

export default FormInputDecorator(SwitchInput);
```

Usage:

```javascript
const LoginForm = () => (
  <Form className="form" onSubmit={values => console.log(values)}>
    {({ submit, errors }) => (
      <>
        {errors.switch &&
          errors.switch.map((error, index) => (
            <span className="error">{error}</span>
          ))}
        <SwitchInput
          name="switch"
          hasErrors={!!errors.switch}
          validators={[
            {
              errorMessage: 'Switch should be on to submit',
              validate: value => value === 'on',
            },
          ]}
          value="off"
        />
        <button onClick={() => submit()}>Submit form</button>
      </>
    )}
  </Form>
);
```

#### The checkbox input problem

Consider you have a standard html form with `<input name="agreement" value="accepted" checked="checked" />` element.
On it's submission you'll probably expect a data structure equal to the following json:

```json
{ "agreement": "accepted" }
```

And if the input wasn't checked, you wouldn't get any data.

This means, that marked checkbox has a value of `accepted` and `checked attribute` set to `true`, while unmarked checkbox has a value of `undefined` and `checked attribute` set to `false`. This logic is unnecessarily complicated and neglects the existence of a boolean type. Infact, you can recreate this logic in loform with the following ComplicatedCheckbox component:

```javascript
import React from 'react';
import { FormInputDecorator } from '@loform/react';

class ComplicatedCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked: this.props.checked || false,
      initialValue: this.props.value || '',
    };
  }

  handleChange(event) {
    const isChecked = event.target.checked;

    if (isChecked) {
      this.props.onChange(this.state.initialValue);
    } else {
      this.props.onChange(undefined);
    }

    this.setState({
      checked: isChecked,
    });
  }

  render() {
    const { id, name, disabled } = this.props;

    return (
      <input
        id={id}
        name={name}
        disabled={disabled}
        value={this.state.initialValue}
        checked={this.state.checked}
        onChange={this.handleChange}
        onBlur={this.props.onBlur}
        type="checkbox"
      />
    );
  }
}

export default FormInputDecorator(ComplicatedCheckbox);
```

Core concept of loform is that an input can have a single value identified by it's name. The following component is available by importing [CheckboxInput](#checkboxinput):

```javascript
import * as React from 'react';
import { FormInputDecorator } from '@loform/react';

const CheckboxInput = ({
  id,
  name,
  value = false, // We expect a boolean type as a value
  disabled,
  onChange = () => {},
  onBlur,
  ...rest
}) => {
  return (
    <input
      {...rest}
      id={id}
      name={name}
      checked={value}
      disabled={disabled}
      type="checkbox"
      onChange={e => onChange(e.target.checked)}
      onBlur={onBlur}
    />
  );
};

export default FormInputDecorator(CheckboxInput);
```

It's simply using native input's `checked` attribute to pass as a value. You can use it as shown below:

```javascript
<CheckboxInput name="hasAgreed" value={true} />
```

If it is checked, the form values will be equal

```javascript
{
  hasAgreed: true,
}
```

and

```javascript
{
  hasAgreed: false,
}
```

if otherwise.

#### Advanced form

```javascript
import { Form, TextInput, FormEventEmitter, FormService } from '@loform/react';

const formEventEmitter = new FormEventEmitter();
const formService = new FormService();

const renderErrors = (errors, inputName) =>
  errors[inputName] &&
  errors[inputName].map((error, index) => (
    <span key={index} className="error">
      {error}
    </span>
  ));

const AddressForm = () => (
  <Form
    formEventEmitter={formEventEmitter}
    formService={formService}
    onSubmit={values => console.log(values)}
  >
    {({ errors }) => (
      <>
        {renderErrors(errors, 'name')}
        <TextInput name="name" placeholder="Name" required />
        {renderErrors(errors, 'street')}
        <TextInput name="street" placeholder="Street" required />
        {renderErrors(errors, 'city')}
        <TextInput name="city" placeholder="City" required />
      </>
    )}
  </Form>
);

const OtherComponent = () => (
  <div>
    <AddressForm />
    <button onClick={() => formEventEmitter.submit()}>Submit outside</button>
  </div>
);
```

Later in code

```javascript
const formValues = formService.getValuesFromInputs();
```

### Components

---

#### Form

##### Props

| Name               | Type                                             | Required | Description                                                                                                                                                                                                         |
| :----------------- | :----------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| onSubmit           | `Function`                                       | `true`   | Callback called with [FormValues](#formvalues) on successful form submit                                                                                                                                            |
| className          | `String`                                         | `false`  | Class name added to form element                                                                                                                                                                                    |
| onError            | `Function`                                       | `false`  | Callback called with [FormErrors](#formerrors) on unsuccessful form submit                                                                                                                                          |
| clearOnSubmit      | `Boolean`                                        | `false`  | Tells the form to clear inputs upon successful submission                                                                                                                                                           |
| formService        | [FormService](#formservice)                      | `false`  | Service that handles input registration and validation                                                                                                                                                              |
| formEventEmitter   | [FormEventEmitter](#formeventemitter)            | `false`  | Service that handles submit and update events                                                                                                                                                                       |
| validationStrategy | [FormValidationStrategy](#validation-strategies) | `false`  | Default value: `onInputBlur`. There are more strategies you can use: `onlyOnSubmit`, `onInputChange`. You can easily write one yourself. See [Validation Strategies](#validation-strategies) section for more info. |

**Form requires it's children to be a render function. What it means is that instead of strings, components or array of them you pass a function that returns them:**

```javascript
<Form onSubmit={values => console.log(values)}>
  {(form) => (
    {/* You can access invidual input errors by form.errors object as follows: */}
    {form.errors.username && <span>form.errors.username</span>}
    {/* You must remember that form.errors.username is either undefined or an array */}
    <TextInput name="username" placeholder="Enter username" required />

    {/* You can submit form by calling form.submit() */}
    <button onClick={() => form.submit()}>Submit</button>
    {/* Clear form by calling form.clear() */}
    <button onClick={() => form.clear()}>Clear</button>
  )}
</Form>
```

Our render function argument consists of following properties:

| Name         | Description                                                                                                                      |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------- |
| clear        | A function that clears form inputs                                                                                               |
| submit       | A function that submits our form                                                                                                 |
| errors       | [FormErrors](#formerrors) object                                                                                                 |
| isValidating | A boolean indicating that form is being validated. Useful with async validators. You can read about it [here](#async-validators) |

### Inputs

---

#### FormInput

All inputs extend functionality provided by FormInput component. Checkout [here](#custom-input) how to create custom input with [FormInputDecorator](#custom-input).

##### Props

| Name             | Type       | Required | Description                                                                                                             |
| :--------------- | :--------- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| controlled       | `Boolean`  | `false`  | If true, the input value is controlled by the user                                                                      |
| required         | `Boolean`  | `false`  | If true, displays error when user is trying to submit form with empty input                                             |
| requiredMessage  | `String`   | `false`  | Replaces default required error message                                                                                 |
| validators       | `Array`    | `false`  | Array of [InputValidator](#inputvalidator) that input should be validated against upon form submission                  |
| onChange         | `Function` | `false`  | Function called on input value change with it's value                                                                   |
| onBlur           | `Function` | `false`  | Function called on input blur                                                                                           |
| debounce         | `Number`   | `false`  | Debounce input value (default: 0). Used primarily with async validators                                                 |
| validateOnChange | `Boolean`  | `false`  | Tells input if should validate on change. Default value is `true`. Can be set to `false` to optimize number of requests |

#### Input

##### Props

| Name                               | Type      | Required | Description                                                                                                  |
| :--------------------------------- | :-------- | :------- | :----------------------------------------------------------------------------------------------------------- |
| id                                 | `String`  | `false`  | Id of an input. Must be unique. Used internally to identify input in FormService. Generated uuid by default. |
| name                               | `String`  | `true`   | Name of an input. Used to generate [FormValues](#formvalues) on form submission.                             |
| value                              | `String`  | `false`  | Can be used to set initial value of an input or to control input's value during it's lifecycle               |
| disabled                           | `Boolean` | `false`  | Can be set to true in order to disable input                                                                 |
| placeholder                        | `String`  | `false`  | If set, displayed as placeholder of an input                                                                 |
| className                          | `String`  | `false`  | Class name added to input element                                                                            |
| type                               | `String`  | `false`  | The type of an input. Default value is `text`                                                                |
| ...rest                            | `any[]`   | `false`  | Any other value you pass as a prop is passed down to the native input (e.g. pattern)                         |
| [Props from FormInput](#forminput) | -         | -        | -                                                                                                            |

Example:

```javascript
<Form onSubmit={onSubmit}>
  {({ submit }) => (
    <>
      <Input
        placeholder="Enter quantity"
        name="quantity"
        type="number"
        min={10}
        max={100}
      />
      <button onClick={() => submit()} />
    </>
  )}
</Form>
```

#### TextInput

##### Props

| Name                               | Type      | Required | Description                                                                                                  |
| :--------------------------------- | :-------- | :------- | :----------------------------------------------------------------------------------------------------------- |
| id                                 | `String`  | `false`  | Id of an input. Must be unique. Used internally to identify input in FormService. Generated uuid by default. |
| name                               | `String`  | `true`   | Name of an input. Used to generate [FormValues](#formvalues) on form submission.                             |
| value                              | `String`  | `false`  | Can be used to set initial value of an input or to control input's value during it's lifecycle               |
| disabled                           | `Boolean` | `false`  | Can be set to true in order to disable input                                                                 |
| placeholder                        | `String`  | `false`  | If set, displayed as placeholder of an input                                                                 |
| className                          | `String`  | `false`  | Class name added to input element                                                                            |
| [Props from FormInput](#forminput) | -         | -        | -                                                                                                            |

#### PasswordInput

##### Props

| Name                               | Type      | Required | Description                                                                                                  |
| :--------------------------------- | :-------- | :------- | :----------------------------------------------------------------------------------------------------------- |
| id                                 | `String`  | `false`  | Id of an input. Must be unique. Used internally to identify input in FormService. Generated uuid by default. |
| name                               | `String`  | `true`   | Name of an input. Used to generate [FormValues](#formvalues) on form submission.                             |
| value                              | `String`  | `false`  | Can be used to set initial value of an input or to control input's value during it's lifecycle               |
| disabled                           | `Boolean` | `false`  | Can be set to true in order to disable input                                                                 |
| placeholder                        | `String`  | `false`  | If set, displayed as placeholder of an input                                                                 |
| className                          | `String`  | `false`  | Class name added to input element                                                                            |
| [Props from FormInput](#forminput) | -         | -        | -                                                                                                            |

#### TextAreaInput

##### Props

| Name                               | Type      | Required | Description                                                                                                  |
| :--------------------------------- | :-------- | :------- | :----------------------------------------------------------------------------------------------------------- |
| id                                 | `String`  | `false`  | Id of an input. Must be unique. Used internally to identify input in FormService. Generated uuid by default. |
| name                               | `String`  | `true`   | Name of an input. Used to generate [FormValues](#formvalues) on form submission.                             |
| value                              | `String`  | `false`  | Can be used to set initial value of an input or to control input's value during it's lifecycle               |
| disabled                           | `Boolean` | `false`  | Can be set to true in order to disable input                                                                 |
| className                          | `String`  | `false`  | Class name added to input element                                                                            |
| [Props from FormInput](#forminput) | -         | -        | -                                                                                                            |

#### CheckboxInput

##### Props

| Name                               | Type      | Required | Description                                                                                                  |
| :--------------------------------- | :-------- | :------- | :----------------------------------------------------------------------------------------------------------- |
| id                                 | `String`  | `false`  | Id of an input. Must be unique. Used internally to identify input in FormService. Generated uuid by default. |
| name                               | `String`  | `true`   | Name of an input. Used to generate [FormValues](#formvalues) on form submission.                             |
| value                              | `Boolean` | `false`  | Can be used to set initial value of an input or to control input's value during it's lifecycle               |
| disabled                           | `Boolean` | `false`  | Can be set to true in order to disable input                                                                 |
| className                          | `String`  | `false`  | Class name added to input element                                                                            |
| [Props from FormInput](#forminput) | -         | -        | -                                                                                                            |

#### SelectInput

##### Props

| Name                               | Type      | Required | Description                                                                                                  |
| :--------------------------------- | :-------- | :------- | :----------------------------------------------------------------------------------------------------------- |
| id                                 | `String`  | `false`  | Id of an input. Must be unique. Used internally to identify input in FormService. Generated uuid by default. |
| name                               | `String`  | `true`   | Name of an input. Used to generate [FormValues](#formvalues) on form submission.                             |
| value                              | `String`  | `false`  | Can be used to set initial value of an input or to control input's value during it's lifecycle               |
| options                            | `Array`   | `false`  | Array of [Options](#option)                                                                                  |
| disabled                           | `Boolean` | `false`  | Can be set to true in order to disable input                                                                 |
| className                          | `String`  | `false`  | Class name added to input element                                                                            |
| [Props from FormInput](#forminput) | -         | -        | -                                                                                                            |

#### RadioInput

##### Props

| Name                               | Type     | Required | Description                                                                                                  |
| :--------------------------------- | :------- | :------- | :----------------------------------------------------------------------------------------------------------- |
| id                                 | `String` | `false`  | Id of an input. Must be unique. Used internally to identify input in FormService. Generated uuid by default. |
| name                               | `String` | `true`   | Name of an input. Used to generate [FormValues](#formvalues) on form submission.                             |
| value                              | `String` | `false`  | Can be used to set initial value of an input or to control input's value during it's lifecycle               |
| options                            | `Array`  | `false`  | Array of [Options](#option)                                                                                  |
| className                          | `String` | `false`  | Class name added to input element                                                                            |
| [Props from FormInput](#forminput) | -        | -        | -                                                                                                            |

### Types

---

#### Option

```
{
  label: string;
  value: string;
  disabled?: boolean;
}
```

#### InputValidator

InputValidator is an object which contains errorMessage as a string and a validation function. Validate function takes validated field value as the first parameter and FormValues object as the second parameter. It must return `true` if input is successfully validated and `false` if otherwise.

```
{
  errorMessage: string;
  validate: (value: string, formValues: FormValues) => Promise<boolean> | boolean;
}
```

##### Async validators

Since version 4.0 you can return a promise in `validate` function. Promise should resolve to a `boolean` value, indicating successful or unsuccessful validation.

Example:

```javascript
const usernameAvailabilityValidator = {
  errorMessage: 'Username is not available',
  validate: value =>
    new Promise(resolve => {
      axios.get(someUrl, { params: { username: value } }).then(({ data }) => {
        resolve(data.is_available);
      });
    }),
};
```

If you want to inform users that your form is being validated, you can use `isValidating` boolean render function param. Example:

```javascript
<Form onSubmit={onSubmit}>
  {({ submit, errors, isValidating }) => (
    <>
      {isValidating && 'Form is being validated...'}
      <TextInput
        name="username"
        validators={[usernameAvailabilityValidator]}
        required
        validateOnChange={false} // You can disable validation on change to optimize number of requests to a server
        debounce={1000} // Or you can debounce input change by number of miliseconds. Remember that this won't take effect if you set validateOnChange prop to false
      />
      <button onClick={() => submit()} />
    </>
  )}
</Form>
```

You can see example of async validation [here](https://awinogrodzki.github.io/loform/)

#### FormValues

FormValues is an object representing all of the current form values. Example:

```
{
  firstName: 'John',
  lastName: 'Doe',
  userName: 'john.doe',
  languages: ['PL', 'EN', 'DE'],
  street: {
    name: 'Corner Street',
    number: '180F2'
  }
}
```

#### FormErrors

FormErrors is an object representing invalid inputs with error messages. Error messages are identified by input `name` prop.

For example, for a form below:

```javascript
<Form onSubmit={onSubmit}>
  {({ submit, errors }) => (
    <>
      <TextInput
        name="email"
        validators={[emailValidator('Invalid email address')]}
        required
      />
      <TextInput
        name="phone"
        validators={[phoneValidator('Incorrect phone format')]}
      />
      <TextInput name="description" />
      <TextInput name="language[]" value="en" />
      <TextInput
        name="language[]"
        validators={[customLanguageValidator('Incorrect language')]}
      />
      <button onClick={() => submit()} />
    </>
  )}
</Form>
```

we can receive error structure like this:

```javascript
{
  email: [
    'Input email is required',
    'Invalid email address'
  ],
  description: [],
  phone: [
    'Incorrect phone format'
  ],
  language: [
    [],
    ['Incorrect language']
  ]
}
```

**Note that valid fields are identified by empty array of errors**

#### InputDescriptor

InputDescriptor is a representation of an input used by FormService and FormEventEmitter

```
{
  id: string;
  name: string;
  value?: any;
  required: boolean;
  requiredMessage?: string;
  validators?: InputValidator[];
  validateOnChange?: boolean;
}
```

#### FormEvent

FormEvent is an enum that can contain following values: `"submit"`, `"update"`, `"blur"`, `"clear"`.

If you are using TypeScript, you will need to use `FormEvent.Submit`, `FormEvent.Update`, `FormEvent.Clear` or `FormEvent.Blur` enum value.

Please note that `Form.Update` and `Form.Blur` event handlers receive [InputDescriptor](#inputdescriptor) as an argument.

```javascript
import { FormEvent } from '@loform/react';
```

and later in code:

```javascript
const onUpdate = inputDescriptor => console.log(inputDescriptor);

formEventEmitter.addListener(FormEvent.Update, onUpdate);
```

### Services

---

#### FormService

FormService is used internally in order to handle inputs, validation and other tasks.
For more advanced use can be injected to [Form](#form) through formService prop.

##### Methods

Documentation is in development. For FormService methods reference use TypeScript declaration files.

#### FormEventEmitter

FormEventEmitter is used internally to handle submit and update events.
For more advanced use can be injected to [Form](#form) through formEventEmitter prop.

See example usage of [FormEventEmitter](#advanced-form)

##### Methods

Documentation is in development and incomplete. For all FormEventEmitter methods reference use TypeScript declaration files.

- clear()
- submit()
- update(input: [InputDescriptor](#inputdescriptor))
- blur(input: [InputDescriptor](#inputdescriptor))
- addListener(event: FormEvent, callback: (...args: any[]) => any)
  - callback for FormEvent.Update and FormEvent.Blur event receives [InputDescriptor](#inputdescriptor) as a parameter
- removeListener(event: FormEvent, callback: (...args: any[]) => any)

Check [FormEvent](#formevent) type

### Validation Strategies

---

Form can use different validation strategies. Validation Strategies are used to tell the form how to update `errors` that you receive as a parameter in render function, on form mount, input change and input blur events.

You can see an example of different validation strategies for a registration form on [Storybook](https://awinogrodzki.github.io/loform/)

There are three strategies available, but you can easily create your own strategy by implementing **FormValidationStrategy** interface:

```typescript
type FormErrorsMap = Map<string, string[]>;

interface FormValidationStrategy {
  getErrorsOnFormMount?: (
    errors: FormErrorsMap,
    prevErrors: FormErrorsMap,
  ) => FormErrorsMap;
  getErrorsOnInputBlur?: (
    input: InputDescriptor,
    errors: FormErrorsMap,
    prevErrors: FormErrorsMap,
  ) => FormErrorsMap;
  getErrorsOnInputUpdate?: (
    input: InputDescriptor,
    errors: FormErrorsMap,
    prevErrors: FormErrorsMap,
  ) => FormErrorsMap;
}
```

`FormErrorsMap` is a javascript `Map` object, that contains array of errors as `strings` identified by input id as `string`. Input id is accessible using [InputDescriptor](#inputdescriptor)'s `id` property.

The following is an implementation of `onlyOnSubmit` strategy, which, on input update, removes errors that were corrected since last submit:

```javascript
const onlyOnSubmit = {
  getErrorsOnInputUpdate: (input, errors, prevErrors) => {
    const newErrors = new Map();

    for (const [inputId, inputErrors] of Array.from(errors.entries())) {
      newErrors.set(
        inputId,
        inputErrors.filter(error =>
          (prevErrors.get(inputId) || []).includes(error),
        ),
      );
    }

    return newErrors;
  },
};
```

**Note that if you don't define a specific method, errors won't be updated.**

Example usage:

```javascript
import { Form, onlyOnSubmit } from '@loform/react';

const RegistrationForm = () => (
  <Form
    className={styles.form}
    onSubmit={values => console.log(values)}
    onError={errors => console.log(errors)}
    validationStrategy={onlyOnSubmit}
  >
    {({ submit, errors }) => (
      // ...
    )}
  </Form>
);
```

## Development

Project is written in TypeScript and compiled to JavaScript using Webpack.

In order to develop this application you need to install dependencies using yarn:

```
yarn install
```

Exemplary components are rendered during development using [Storybook](https://github.com/storybooks/storybook):

```
npm run storybook
```

## Contributing

In order to contribute to loform you need to use [conventional commits](https://conventionalcommits.org/).

You can freely issue a pull request to the master branch. Mention author for code review before any merges.

If there is a problem issuing a pull request, contact author.
