# loform #

loform is light, easy to use and extendable form validation library written in TypeScript. Currently available for React, but planned to support other popular UI libraries/frameworks (most of the logic is library-agnostic).

#### Module size
**16.8kb minified (4.4kb gzipped)**

## Table of Contents ##
* [React](#react)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Basic form](#basic-form)
    - [Custom input](#custom-input)
    - [Advanced form](#advanced-form)
  - [Components](#components)
  - [Inputs](#inputs)
    - [TextInput](#textinput)
    - [PasswordInput](#passwordinput)
    - [TextAreaInput](#textareainput)
    - [SelectInput](#selectinput)
    - [RadioInput](#radioinput)
  - [Types](#types)
  - [Services](#services)
* [Development](#development)
* [Contributing](#contributing)


It can be used with TypeScript (definition files included) and pure JavaScript.


## React ##

  loform for React was inspired by Render Props concept. [Here's why to use Render Props](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

  ### Requirements ###
  --------------------

  * **React** and **React DOM** version **^16.3.0** (due to new React Context)
  * If your project is written in **TypeScript**, make sure you have installed version **^2.9.0** (due to type compatibility)

  See **Examples** in Storybook [here](https://awinogrodzki.github.io/loform/)


  Go straight to [Docs](#components)


  ### Installation ###
  --------------------


  #### npm ####
  ```
  npm install @loform/react --save
  ```
  #### yarn ####
  ```
  yarn add @loform/react
  ```


  ### Usage ###
  -------------


  *All examples are in JavaScript*

  #### Basic form ####

  *Note that in order to import styles from javascript you need to have appropriate loader (eg. [postcss-loader for Webpack](https://github.com/postcss/postcss-loader))*

  ```javascript
  import React from 'react';
  import {
    Form,
    TextInput,
    PasswordInput,
    emailValidator,
  } from '@loform/react';
  import '@loform/react/dist/styles.css';

  const LoginForm = () => (
    <Form
      className="form"
      onSubmit={values => console.log(values)}
    >
      {({
        submit,
      }) => (
        <>
          <TextInput
            className="emailInput"
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

  #### Custom input ####
  In order for input to work, you need to wrap it with **FormInputDecorator** HOC

  ##### Props passed by FormInputDecorator HOC #####
  * id: string
  * name: string
  * hasErrors: boolean
  * value: string
  * onChange: (value: string) => any
  * disabled?: boolean
  * placeholder?: string
  * ...rest *all other props given to the HOC will be passed down to your component (eg. options in SelectInput)*

  ```javascript
  import React from 'react';
  import classnames from 'classnames';
  import { FormInputDecorator } from '@loform/react';

  const ON = 'on';
  const OFF = 'off';

  export const SwitchInput = ({
    onChange,
    hasErrors,
    value,
  }) => (
    <div
      className={classnames(
        'switchInput',
        { 'switchInput__hasErrors': hasErrors },
      )}
    >
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
        submit,
      }) => (
        <>
          <SwitchInput
            name="switch"
            validators={[
              {
                errorMessage: 'Switch should be off to submit',
                validate: value => value === 'off',
              },
            ]}
            value="on"
          />
          <button onClick={() => submit()}>Submit form</button>
        </>
      )}
    </Form>
  );
  ```


  #### Advanced form ####
  ```javascript
  import {
    Form,
    TextInput,
    FormEventEmitter,
    FormService,
  } from '@loform/react';
  import '@loform/react/dist/styles.css';

  const formEventEmitter = new FormEventEmitter();
  const formService = new FormService();

  const AddressForm = () => (
    <Form
      formEventEmitter={formEventEmitter}
      formService={formService}
      onSubmit={values => console.log(values)}
    >
      {() => (
        <>
          <TextInput name="name" label="Name" required />
          <TextInput name="street" label="Street" required />
          <TextInput name="city" label="City" required />
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

  ### Components ###
  ------------------


  #### Form ####
  ##### Props #####
  | Name | Type | Required | Description |
  |:---|:---|:---|:---|
  | onSubmit | `Function` | `true` | Callback called with [FormValues](#formvalues) on successful form submit |
  | className | `String` | `false` | Class name added to form element |
  | onError | `Function` | `false` | Callback called with [FormErrors](#formerrors) on unsuccessful form submit |
  | formService | [FormService](#formservice) | `false` | Service that handles input registration and validation |
  | formEventListener | [FormEventEmitter](#formeventemitter) | `false` | Service that handles submit and update events  |


  ### Inputs ###
  --------------

  #### FormInput ####
  All inputs extend functionality provided by FormInput component. Checkout [here](#custom-input) how to create custom input with [FormInputDecorator](#custom-input).

  ##### Props #####
  | Name | Type | Required | Description |
  |:---|:---|:---|:---|
  | containerClass | `String` | `false` | Class name added to component's root element |
  | inputContainerClass | `String` | `false` | Class name added to element that contains input wrapper, label and error list elements |
  | inputWrapperClass | `String` | `false` | Class name added to element that contains input component |
  | errorContainerClass | `String` | `false` | Class name added to element containing list of errors |
  | errorClass | `String` | `false` | Class name added to error element |
  | label | `String` | `false` | If provided, displays label above input |
  | required | `Boolean` | `false` | If true, displays error when user is trying to submit form with empty input |
  | requiredMessage | `String` | `false` | Replaces default required error message |
  | validators | `Array` | `false` | Array of [InputValidator](#inputvalidator) that input should be validated against upon form submission |

  #### TextInput ####
  ##### Props #####
  | Name | Type | Required | Description |
  |:---|:---|:---|:---|
  | id | `String` | `false` | Id of an input. Must be unique. Used internally to identify input in FormService. Generated uuid by default. |
  | name | `String` | `true` | Name of an input. Used to generate [FormValues](#formvalues) on form submission. |
  | value | `String` | `false` | Can be used to set initial value of an input or to control input's value during it's lifecycle |
  | disabled | `Boolean` | `false` | Can be set to true in order to disable input |
  | placeholder | `String` | `false` | If set, displayed as placeholder of an input |
  | className | `String` | `false` | Class name added to input element |
  | onChange | `Function` | `false` | Function called on input's value change with it's value as a `String` |
  | [Props from FormInput component](#forminput) | - | - | - |

  #### PasswordInput ####
  ##### Props #####
  * id?: string
  * name: string
  * value?: string
  * disabled?: boolean
  * placeholder?: string
  * className?: string
  * onChange?: (value: string) => any
  * [Props from FormInput component](#forminput)

  #### TextAreaInput ####
  ##### Props #####
  * id?: string
  * name: string
  * value?: string
  * disabled?: boolean
  * className?: string
  * onChange?: (value: string) => any
  * [Props from FormInput component](#forminput)

  #### SelectInput ####
  ##### Props #####
  * id?: string
  * name: string
  * value?: string
  * disabled?: boolean
  * options?: [Option](#option)[]
  * className?: string
  * onChange?: (value: string) => any
  * [Props from FormInput component](#forminput)

  #### RadioInput ####
  ##### Props #####
  * id?: string
  * name: string
  * value?: string
  * options?: [Option](#option)[]
  * className?: string
  * onChange?: (value: string) => any
  * [Props from FormInput component](#forminput)

  ### Types ###
  -------------


  #### Option ####
  ```
  {
    label: string;
    value: string;
    disabled?: boolean;
  }
  ```

  #### InputValidator ####
  InputValidator is an object which contains errorMessage as a string and a validation function. Validate function takes validated field value as the first argument and FormValues object as the second argument. It must return *true* if input is successfully validated and *false* if otherwise.
  ```
  {
    errorMessage: string;
    validate: (value: string, formValues: FormValues) => boolean;
  }
  ```

  #### FormValues ####
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

  #### FormErrors ####
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

  #### FormEvent ####
  FormEvent is an enum that can contain two values: "submit" or "update".

  If you are using TypeScript, you will need to use FormEvent.Submit or FormEvent.Update enum value.
  ```javascript
  import { FormEvent } from '@loform/react';
  ```
  and later in code:
  ```javascript
  formEventEmitter.addListener(FormEvent.Submit, callback);
  ```

  ### Services ###
  ----------------


  #### FormService ####
  FormService is used internally in order to handle inputs, validation and other tasks.
  For more advanced use can be injected to [Form](#form) through formService prop.

  ##### Methods #####
  Documentation is in development. For FormService methods reference use TypeScript declaration files.


  #### FormEventEmitter ####
  FormEventEmitter is used internally to handle submit and update events.
  For more advanced use can be injected to [Form](#form) through formEventEmitter prop.

  See example usage of [FormEventEmitter](#advanced-form)

  ##### Methods #####
  Documentation is in development and incomplete. For all FormEventEmitter methods reference use TypeScript declaration files.

  * submit()
  * update()
  * addListener(event: FormEvent, callback: () => any)
  * removeListener(event: FormEvent, callback: () => any)

  Check [FormEvent](#formevent) type


## Development ##

Project is written in TypeScript and compiled to JavaScript using Webpack.

In order to develop this application you need to install dependencies using yarn:
```
yarn install
```

Exemplary components are rendered during development using [Storybook](https://github.com/storybooks/storybook):
```
npm run storybook
```

## Contributing ##

In order to contribute to loform you need to use [conventional commits](https://conventionalcommits.org/).

You can freely issue a pull request to the master branch. Mention author for code review before any merges.

If there is a problem issuing a pull request, contact author.

