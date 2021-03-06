import * as React from 'react';
import { Form, TextInput, emailValidator, Input } from '../../dist';
import { mount } from 'enzyme';

const event = (value: any) => ({ target: { value } });
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

describe('Form', () => {
  it('should submit form', async () => {
    const onSubmit = jest.fn();
    const wrapper = mount(
      <Form onSubmit={onSubmit}>
        {({ submit }) => (
          <>
            <TextInput name="input" />
            <button onClick={() => submit()} />
          </>
        )}
      </Form>,
    );

    wrapper
      .find('[name="input"] input')
      .simulate('change', event('test value'));

    await tick();

    wrapper.find('button').simulate('click');

    await tick();

    expect(onSubmit).toHaveBeenCalledWith({
      input: 'test value',
    });
  });

  it('should show form errors', async () => {
    const onSubmit = jest.fn();
    const onError = jest.fn();
    const wrapper = mount(
      <Form onSubmit={onSubmit} onError={onError}>
        {({ submit }) => (
          <>
            <TextInput name="input" required />
            <button onClick={() => submit()} />
          </>
        )}
      </Form>,
    );

    wrapper.find('button').simulate('click');

    await tick();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith({
      input: [expect.any(String)],
    });
  });

  it('should work with validators', async () => {
    const onSubmit = jest.fn();
    const onError = jest.fn();
    const wrapper = mount(
      <Form onSubmit={onSubmit} onError={onError}>
        {({ submit }) => (
          <>
            <TextInput
              name="email"
              validators={[emailValidator('Error message')]}
            />
            <button onClick={() => submit()} />
          </>
        )}
      </Form>,
    );

    wrapper
      .find('[name="email"] input')
      .simulate('change', { target: { value: 'notValidEmailAddress' } });

    await tick();

    wrapper.find('button').simulate('click');

    await tick();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith({
      email: ['Error message'],
    });
  });

  it('should return correct values from inputs with nested names on submit', async () => {
    const onSubmit = jest.fn();
    const wrapper = mount(
      <Form onSubmit={onSubmit}>
        {({ submit }) => (
          <>
            <TextInput data-test="firstInput" name="arrayInput[]" />
            <TextInput data-test="secondInput" name="arrayInput[]" />
            <TextInput data-test="thirdInput" name="arrayInput[]" />
            <TextInput name="nestedInput[firstKey]" />
            <TextInput name="nestedInput[secondKey]" />
            <TextInput name="nestedInput[thirdKey][]" />
            <button onClick={() => submit()} />
          </>
        )}
      </Form>,
    );

    wrapper
      .find('[data-test="firstInput"] input')
      .simulate('change', event('firstValue'));
    await tick();
    wrapper
      .find('[data-test="secondInput"] input')
      .simulate('change', event('secondValue'));
    await tick();
    wrapper
      .find('[data-test="thirdInput"] input')
      .simulate('change', event('thirdValue'));
    await tick();
    wrapper
      .find('[name="nestedInput[firstKey]"] input')
      .simulate('change', event('fourthValue'));
    await tick();
    wrapper
      .find('[name="nestedInput[secondKey]"] input')
      .simulate('change', event('fifthValue'));
    await tick();
    wrapper
      .find('[name="nestedInput[thirdKey][]"] input')
      .simulate('change', event('sixthValue'));
    await tick();

    wrapper.find('button').simulate('click');
    await tick();

    expect(onSubmit).toHaveBeenCalledWith({
      arrayInput: ['firstValue', 'secondValue', 'thirdValue'],
      nestedInput: {
        firstKey: 'fourthValue',
        secondKey: 'fifthValue',
        thirdKey: ['sixthValue'],
      },
    });
  });

  it('should return correct values from inputs with nested names on error', async () => {
    const onSubmit = jest.fn();
    const onError = jest.fn();
    const wrapper = mount(
      <Form onSubmit={onSubmit} onError={onError}>
        {({ submit }) => (
          <>
            <TextInput
              data-test="firstInput"
              name="arrayInput[]"
              required
              requiredMessage="message1"
            />
            <TextInput
              data-test="secondInput"
              name="arrayInput[]"
              required
              requiredMessage="message2"
            />
            <TextInput
              data-test="thirdInput"
              name="arrayInput[]"
              required
              requiredMessage="message3"
            />
            <TextInput
              name="nestedInput[firstKey]"
              required
              requiredMessage="message4"
            />
            <TextInput
              name="nestedInput[secondKey]"
              required
              requiredMessage="message5"
            />
            <TextInput
              name="nestedInput[thirdKey][]"
              required
              requiredMessage="message6"
            />
            <TextInput name="nestedInput[thirdKey][]" />
            <button onClick={() => submit()} />
          </>
        )}
      </Form>,
    );

    wrapper.find('button').simulate('click');

    await tick();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith({
      arrayInput: [['message1'], ['message2'], ['message3']],
      nestedInput: {
        firstKey: ['message4'],
        secondKey: ['message5'],
        thirdKey: [['message6'], []],
      },
    });
  });

  it("should allow to control input value during it's lifecycle", async () => {
    const onSubmit = jest.fn();
    const SimpleForm = ({ testValue }: { testValue?: string }) => (
      <Form onSubmit={onSubmit}>
        {({ submit }) => (
          <>
            <TextInput value={testValue} name="input" />
            <button onClick={() => submit()} />
          </>
        )}
      </Form>
    );
    const wrapper = mount(<SimpleForm />);

    wrapper
      .find('[name="input"] input')
      .simulate('change', event('test value'));

    await tick();

    wrapper.find('button').simulate('click');

    await tick();

    expect(onSubmit).toHaveBeenCalledWith({
      input: 'test value',
    });

    wrapper.setProps({ testValue: 'controlled value' });

    await tick();

    wrapper.find('button').simulate('click');

    await tick();

    expect(onSubmit).toHaveBeenLastCalledWith({
      input: 'controlled value',
    });
  });

  it('should render basic input component', async () => {
    const onSubmit = jest.fn();
    const SimpleForm = ({ testValue }: { testValue?: string }) => (
      <Form onSubmit={onSubmit}>
        {({ submit }) => (
          <>
            <Input
              value={testValue}
              name="input"
              type="customType"
              pattern="test"
            />
            <button onClick={() => submit()} />
          </>
        )}
      </Form>
    );
    const wrapper = mount(<SimpleForm />);

    const input = wrapper.find('[name="input"] input');
    const inputType = input.props().type;
    const inputPattern = input.props().pattern;

    expect(inputType).toBe('customType');
    expect(inputPattern).toBe('test');

    input.simulate('change', event('test value'));

    await tick();

    wrapper.find('button').simulate('click');

    await tick();

    expect(onSubmit).toHaveBeenCalledWith({
      input: 'test value',
    });
  });
});
