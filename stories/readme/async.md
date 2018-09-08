## With async username validator

```javascript
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
```
