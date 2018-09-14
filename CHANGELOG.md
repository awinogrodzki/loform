# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="4.1.0"></a>
# [4.1.0](https://github.com/awinogrodzki/loform/compare/v4.0.2...v4.1.0) (2018-09-14)


### Features

* changed DecoratedInputProps type to GenericInputProps ([28959f7](https://github.com/awinogrodzki/loform/commit/28959f7))



<a name="4.0.2"></a>
## [4.0.2](https://github.com/awinogrodzki/loform/compare/v4.0.1...v4.0.2) (2018-09-14)



<a name="4.0.1"></a>
## [4.0.1](https://github.com/awinogrodzki/loform/compare/v4.0.0...v4.0.1) (2018-09-09)


### Bug Fixes

* **FormService:** removed async validator cache memory leak ([7c8b246](https://github.com/awinogrodzki/loform/commit/7c8b246))



<a name="4.0.0"></a>

# [4.0.0](https://github.com/awinogrodzki/loform/compare/v3.4.5...v4.0.0) (2018-09-08)

### Features

- **Form:** added async validation ([f0f5254](https://github.com/awinogrodzki/loform/commit/f0f5254))
- **Form:** added asynchronous validation ([c37a558](https://github.com/awinogrodzki/loform/commit/c37a558))
- **Form:** added validateOnChange prop that disables validation on input update if set to false ([aa8ea3a](https://github.com/awinogrodzki/loform/commit/aa8ea3a))
- **FormInput:** possibility to debounce input update event ([a394f3f](https://github.com/awinogrodzki/loform/commit/a394f3f))
- **FormValidationStrategy:** updated strategy interface ([0c646c1](https://github.com/awinogrodzki/loform/commit/0c646c1))

### BREAKING CHANGES

- **FormValidationStrategy:** form validation strategies are operating on FormErrorMap instead of FormErrors object
- **FormErrors:** empty arrays are now identifying valid fields

<a name="3.4.5"></a>

## [3.4.5](https://github.com/awinogrodzki/loform/compare/v3.4.4...v3.4.5) (2018-08-10)

<a name="3.4.4"></a>

## [3.4.4](https://github.com/awinogrodzki/loform/compare/v3.4.3...v3.4.4) (2018-08-10)

### Bug Fixes

- removed lodash-es from dependencies ([6baffd4](https://github.com/awinogrodzki/loform/commit/6baffd4))

<a name="3.4.3"></a>

## [3.4.3](https://github.com/awinogrodzki/loform/compare/v3.4.2...v3.4.3) (2018-08-05)

### Bug Fixes

- **FormService:** Errors are identified by input name ([f1310ac](https://github.com/awinogrodzki/loform/commit/f1310ac))

<a name="3.4.2"></a>

## [3.4.2](https://github.com/awinogrodzki/loform/compare/v3.4.1...v3.4.2) (2018-08-05)

### Bug Fixes

- fixed default form validator ([5490ca6](https://github.com/awinogrodzki/loform/commit/5490ca6))

<a name="3.4.1"></a>

## [3.4.1](https://github.com/awinogrodzki/loform/compare/v3.4.0...v3.4.1) (2018-08-05)

### Bug Fixes

- type fixes ([e0839af](https://github.com/awinogrodzki/loform/commit/e0839af))

<a name="3.4.0"></a>

# [3.4.0](https://github.com/awinogrodzki/loform/compare/v3.3.0...v3.4.0) (2018-08-04)

### Features

- added onInputBlur validation strategy and used it as default ([a83863c](https://github.com/awinogrodzki/loform/commit/a83863c))

<a name="3.3.1"></a>

## [3.3.1](https://github.com/awinogrodzki/loform/compare/v3.3.0...v3.3.1) (2018-08-01)

Types update

<a name="3.3.0"></a>

# [3.3.0](https://github.com/awinogrodzki/loform/compare/v3.2.0...v3.3.0) (2018-08-01)

### Features

- **Validation Strategies:** you can now pass different form validation strategies to Form component. See README for more info. ([721e291](https://github.com/awinogrodzki/loform/commit/721e291))

<a name="3.2.0"></a>

# [3.2.0](https://github.com/awinogrodzki/loform/compare/v3.1.1...v3.2.0) (2018-07-31)

### Features

- **CheckboxInput:** added checkbox input component ([05b8c58](https://github.com/awinogrodzki/loform/commit/05b8c58))

<a name="3.1.1"></a>

## [3.1.1](https://github.com/awinogrodzki/loform/compare/v3.1.0...v3.1.1) (2018-07-31)

### Bug Fixes

- **Input:** updated input type interface with html input attributes ([3887317](https://github.com/awinogrodzki/loform/commit/3887317))

<a name="3.1.0"></a>

# [3.1.0](https://github.com/awinogrodzki/loform/compare/v3.0.2...v3.1.0) (2018-07-30)

### Features

- **Input:** added generic input component ([3265d63](https://github.com/awinogrodzki/loform/commit/3265d63))

<a name="3.0.2"></a>

## [3.0.2](https://github.com/awinogrodzki/loform/compare/v3.0.1...v3.0.2) (2018-07-24)

### Bug Fixes

- fixed declaration files ([695dd7f](https://github.com/awinogrodzki/loform/commit/695dd7f))
- fixed type definitions ([8394223](https://github.com/awinogrodzki/loform/commit/8394223))

<a name="3.0.1"></a>

## [3.0.1](https://github.com/awinogrodzki/loform/compare/v3.0.0...v3.0.1) (2018-07-24)

### Bug Fixes

- **Form:** validate only updated inputs ([e71712d](https://github.com/awinogrodzki/loform/commit/e71712d))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/awinogrodzki/loform/compare/v2.0.1...v3.0.0) (2018-07-24)

### Features

- **FormInput:** removed label, errors and styles ([c8dfd49](https://github.com/awinogrodzki/loform/commit/c8dfd49))

### BREAKING CHANGES

- **FormInput:** From now on, user is responsible for styling inputs and displaying errors. Removed form styles and added errors (FormErrors) as Form render function parameter

<a name="2.0.1"></a>

## [2.0.1](https://github.com/awinogrodzki/loform/compare/v2.0.0...v2.0.1) (2018-06-23)

### Bug Fixes

- fixed derived state ([e71725b](https://github.com/awinogrodzki/loform/commit/e71725b))
- **FormInput:** changed componentWillReceiveProps to getDerivedStateFromProps ([268d058](https://github.com/awinogrodzki/loform/commit/268d058))

<a name="2.0.0"></a>

# [2.0.0](https://github.com/awinogrodzki/loform/compare/v1.1.0...v2.0.0) (2018-06-21)

### Features

- added functional tests ([638774b](https://github.com/awinogrodzki/loform/commit/638774b))
- implemented new context api ([8fbb889](https://github.com/awinogrodzki/loform/commit/8fbb889))

### BREAKING CHANGES

- renamed type export names
- input props are no longer passed as an argument to render function, instead they are passed by FormContext

<a name="1.1.0"></a>

# [1.1.0](https://github.com/awinogrodzki/loform/compare/v1.0.6...v1.1.0) (2018-05-08)

### Features

- **FormInput:** updated styles and moved error messages under the input ([175cd8d](https://github.com/awinogrodzki/loform/commit/175cd8d))

<a name="1.0.6"></a>

## [1.0.6](https://github.com/awinogrodzki/loform/compare/v1.0.5...v1.0.6) (2018-04-19)

### Bug Fixes

- **FormEventEmitter:** refactored form event emitter, added deprecation warning and updated docs ([745c0de](https://github.com/awinogrodzki/loform/commit/745c0de))

<a name="1.0.5"></a>

## [1.0.5](https://github.com/awinogrodzki/loform/compare/v1.0.4...v1.0.5) (2018-04-19)

### Bug Fixes

- **FormService:** passing FormValues as a second argument to validator functions ([24c5276](https://github.com/awinogrodzki/loform/commit/24c5276))

<a name="1.0.4"></a>

## [1.0.4](https://github.com/awinogrodzki/loform/compare/v1.0.3...v1.0.4) (2018-04-19)

<a name="1.0.3"></a>

## [1.0.3](https://github.com/awinogrodzki/loform/compare/v1.0.2...v1.0.3) (2018-04-19)

<a name="1.0.2"></a>

# [1.0.2](https://github.com/awinogrodzki/loform/compare/v0.5.2...v1.0.2) (2018-04-05)

### Chores

- updated readme ([50df02a](https://github.com/awinogrodzki/loform/commit/50df02a))

### BREAKING CHANGES

- removed containerClassName prop from RadioInput component

<a name="0.5.2"></a>

## [0.5.2](https://github.com/awinogrodzki/loform/compare/v0.5.1...v0.5.2) (2018-04-03)

### Bug Fixes

- optimized build by using lodash-es modules ([54cbacd](https://github.com/awinogrodzki/loform/commit/54cbacd))

<a name="0.5.1"></a>

## [0.5.1](https://github.com/awinogrodzki/loform/compare/v0.5.0...v0.5.1) (2018-04-03)

### Bug Fixes

- added inputContainerClass prop to FormInput component ([7a9eec5](https://github.com/awinogrodzki/loform/commit/7a9eec5))

<a name="0.5.0"></a>

# [0.5.0](https://github.com/awinogrodzki/loform/compare/v0.4.4...v0.5.0) (2018-04-03)

### Features

- **FormInputDecorator:** added hasError flag on custom input props ([db4e047](https://github.com/awinogrodzki/loform/commit/db4e047))

<a name="0.4.4"></a>

## [0.4.4](https://github.com/awinogrodzki/loform/compare/v0.4.3...v0.4.4) (2018-03-31)

_Readme updates_

<a name="0.4.3"></a>

## [0.4.3](https://github.com/awinogrodzki/loform/compare/v0.4.2...v0.4.3) (2018-03-31)

### Bug Fixes

- fixed declaration files and development support for typescript by removing absolute paths ([812a1ac](https://github.com/awinogrodzki/loform/commit/812a1ac))

<a name="0.4.2"></a>

## [0.4.2](https://github.com/awinogrodzki/loform/compare/v0.4.1...v0.4.2) (2018-03-30)

### Bug Fixes

- fixed input id ([c7c0db0](https://github.com/awinogrodzki/loform/commit/c7c0db0))

<a name="0.4.1"></a>

## [0.4.1](https://github.com/awinogrodzki/loform/compare/v0.4.0...v0.4.1) (2018-03-30)

### Bug Fixes

- release fix ([215c205](https://github.com/awinogrodzki/loform/commit/215c205))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/awinogrodzki/loform/compare/v0.3.0...v0.4.0) (2018-03-30)

### Features

- **RadioInput:** added containerClassName prop ([418be88](https://github.com/awinogrodzki/loform/commit/418be88))

<a name="0.3.0"></a>

# [0.3.0](https://github.com/awinogrodzki/loform/compare/v0.2.0...v0.3.0) (2018-03-24)

### Features

- changed input id prop to optional ([08761bb](https://github.com/awinogrodzki/loform/commit/08761bb))

<a name="0.2.0"></a>

## [0.2.0](https://github.com/awinogrodzki/loform/compare/v0.1.6...v0.2.0) (2018-03-18)

### Bug Fixes

- removed unused svg-react-loader ([0f36238](https://github.com/awinogrodzki/loform/commit/0f36238))

### Features

- updated error and label styles ([0115708](https://github.com/awinogrodzki/loform/commit/0115708))

<a name="0.1.6"></a>

## [0.1.6](https://github.com/awinogrodzki/loform/compare/v0.1.5...v0.1.6) (2018-03-10)

_Readme updates_

<a name="0.1.5"></a>

## [0.1.5](https://github.com/awinogrodzki/loform/compare/v0.1.4...v0.1.5) (2018-03-10)

_Readme updates_

<a name="0.1.4"></a>

## [0.1.4](https://github.com/awinogrodzki/loform/compare/v0.1.3...v0.1.4) (2018-03-10)

### Bug Fixes

- fixed tests ([008257b](https://github.com/awinogrodzki/loform/commit/008257b))
- stories ([8c50c1f](https://github.com/awinogrodzki/loform/commit/8c50c1f))

<a name="0.1.3"></a>

## [0.1.3](https://github.com/awinogrodzki/loform/compare/v0.1.2...v0.1.3) (2018-03-09)

### Bug Fixes

- export fix ([7300ed9](https://github.com/awinogrodzki/loform/commit/7300ed9))

<a name="0.1.2"></a>

## [0.1.2](https://github.com/awinogrodzki/loform/compare/v0.1.1...v0.1.2) (2018-03-09)

### Bug Fixes

- typescript definition files ([dd1a7a2](https://github.com/awinogrodzki/loform/commit/dd1a7a2))

<a name="0.1.1"></a>

## 0.1.1 (2018-03-09)

<a name="0.0.2"></a>

## 0.0.2 (2018-03-09)
