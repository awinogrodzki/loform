# loform #

loform is light, easy to use and extendable form validation library written in TypeScript. Currently available for React, but planned to support other popular UI libraries/frameworks (most of the logic is library-agnostic).


It can be used with TypeScript (definition files included) and pure JavaScript.


## React

  Formula for React was inspired by Render Props concept. [Here's why to use Render Props](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

  Go straight to [Examples](#examples)




  ### Components
  #### Form
  ##### Props
  * className?: string
  * onSubmit: (formValues: [FormValues](#formvalues)) => any
  * onError?: (errors: [FormErrors](#formerrors)) => any
  * formService?: [FormService](#formservice)
  * formEventEmitter?: [FormEventEmitter](#formeventemitter)

  ### Inputs
  #### TextInput
  ##### Props
  * id: string
  * name: string
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


  ### Examples

  #### Basic form (JavaScript)
  ```
  import React from 'react';
  import
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
