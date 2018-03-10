# loform #

**alpha version**

loform is light, easy to use and extendable form validation library written in TypeScript. Currently available for React, but planned to support other popular UI libraries/frameworks (most of the logic is library-agnostic).


It can be used with TypeScript (definition files included) and pure JavaScript.


## React

  *Project requires React and ReactDOM in version 16.2.0 and up*

  loform for React was inspired by Render Props concept. [Here's why to use Render Props](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

  Go straight to [Examples](#examples)


  ### Instalation
  #### npm
  ```
  npm install @loform/react --save
  ```
  #### yarn
  ```
  yarn add @loform/react
  ```

  ### Components
  #### Form
  ##### Props
  * className?: string
  * onSubmit: (formValues: [FormValues](#formvalues)) => any
  * onError?: (errors: [FormErrors](#formerrors)) => any
  * formService?: [FormService](#formservice)
  * formEventEmitter?: [FormEventEmitter](#formeventemitter)

  ### Inputs

  *Note that in each input id and name props are required and need to be unique in order to properly identify inputs and map them to values*

  #### TextInput
  ##### Props
  * id: string
  * name: string
  * value?: string
  * placeholder?: string
  * className?: string
  * onChange?: (value: string) => any
  * label?: string
  * required?: boolean
  * requiredMessage?: string
  * validators?: [Validator](#validator)[]

  #### PasswordInput
  ##### Props
  * id: string
  * name: string
  * value?: string
  * placeholder?: string
  * className?: string
  * onChange?: (value: string) => any
  * label?: string
  * required?: boolean
  * requiredMessage?: string
  * validators?: [Validator](#validator)[]

  #### TextAreaInput
  ##### Props
  * id: string
  * name: string
  * value?: string
  * className?: string
  * onChange?: (value: string) => any
  * label?: string
  * required?: boolean
  * requiredMessage?: string
  * validators?: [Validator](#validator)[]

  #### SelectInput
  ##### Props
  * id: string
  * name: string
  * value?: string
  * options?: [Option](#option)[]
  * className?: string
  * onChange?: (value: string) => any
  * label?: string
  * required?: boolean
  * requiredMessage?: string
  * validators?: [Validator](#validator)[]

  #### RadioInput
  ##### Props
  * id: string
  * name: string
  * value?: string
  * options?: [Option](#option)[]
  * className?: string
  * onChange?: (value: string) => any
  * label?: string
  * required?: boolean
  * requiredMessage?: string
  * validators?: [Validator](#validator)[]

  ### Types
  #### Option
  ```
  {
    label: string;
    value: string;
    disabled?: boolean;
  }
  ```

  #### Validator
  ```
  {
    errorMessage: string;
    validate: (value: string, formValues: FormValues);
  }
  ```

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
  FormErrors is an object representing invalid inputs with error messages. Example:
  ```
  {
    email: [
      'Invalid email address'
    ],
    phone: [
      'Phone number too long',
      'Incorrect phone format'
    ]
  }
  ```

  ### Services
  #### FormService
  FormService is used internally in order to handle inputs, validation and other tasks.
  For more advanced use can be injected to [Form](#form) through formService prop.

  ##### Methods
  Documentation is in development. For FormService methods reference use TypeScript declaration files.


  #### FormEventEmitter
  FormEventEmitter is used internally to handle submit and update events.
  For more advanced use can be injected to [Form](#form) through formEventEmitter prop.

  ##### Methods
  Documentation is in development and incomplete. For all FormEventEmitter methods reference use TypeScript declaration files.

  * triggerSubmit(callback: () => any)
  * triggerUpdate(callback: () => any)
  * addSubmitListener(callback: () => any)
  * removeSubmitListener(callback: () => any)
  * addUpdateListener(callback: () => any)
  * removeUpdateListener(callback: () => any)


  ### Examples (JSX)

  #### Basic form

  *Note that in order to import styles from javascript you need to have appropriate loader (eg. [postcss-loader for Webpack](https://github.com/postcss/postcss-loader))*

  ```javascript
  import React from 'react';
  import {
    Form,
    TextInput,
    PasswordInput,
    emailValidator,
  } from '@loform/react';
  import '@loform/react/dist/style.css';

  const LoginForm = () => (
    <Form
      className="form"
      onSubmit={values => console.log(values)}
    >
      {({
        inputProps,
        submit,
      }) => (
        <>
          <TextInput
            {...inputProps}
            className="emailInput"
            id="email"
            name="email"
            value="example@email.com"
            placeholder="Enter email address"
            validators={[
              emailValidator('Value is not a valid email address'),
            ]}
            required
            requiredMessage="Email is required."
          />
          <PasswordInput
            {...inputProps}
            id="password"
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

  ### Custom input
  ```javascript
  import React from 'react';
  import { FormInputDecorator } from 'components';

  const ON = 'on';
  const OFF = 'off';

  export const SwitchInput = ({
    onChange,
    value,
  }) => (
    <div className="switchInput">
      <input
        type="radio"
        value={ON}
        checked={value === ON}
        onChange={() => onChange(ON)}
      />
      <input
        type="radio"
        value={OFF}
        checked={value === OFF}
        onChange={() => onChange(OFF)}
      />
    </div>
  );

  export default FormInputDecorator(SwitchInput);
  ```

  Usage:

  ```javascript
  const LoginForm = () => (
    <Form
      className="form"
      onSubmit={values => console.log(values)}
    >
      {({
        inputProps,
        submit,
      }) => (
        <>
          <SwitchInput
            {...inputProps}
            id="switch" // id prop is required and should be unique value.
            name="switch" // name prop is required and should be unique value.
            value="on"
          />
          <button onClick={() => submit()}>Submit form</button>
        </>
      )}
    </Form>
  );
  ```

## Development ###
-------------------

Project is written in TypeScript and compiled to JavaScript using Webpack.

In order to develop this application you need to install dependencies using yarn:
```
yarn install
```

Exemplary components are rendered during development using [Storybook](https://github.com/storybooks/storybook):
```
npm run storybook
```
