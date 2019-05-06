import * as React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import { FormService, FormEventEmitter } from '../../services';
import { FormValidationStrategy, InputDescriptor } from '../../types';

jest.mock('../../services');

const inputFactory = (
  id: string,
  name: string,
  value: string = '',
  validateOnChange: boolean = true,
): InputDescriptor => ({
  id,
  name,
  value,
  validateOnChange,
  required: false,
});

describe('Form', () => {
  let service: jest.Mocked<FormService>;
  let emitter: jest.Mocked<FormEventEmitter>;

  beforeEach(() => {
    service = new FormService() as jest.Mocked<FormService>;
    emitter = new FormEventEmitter() as jest.Mocked<FormEventEmitter>;

    service.getErrors.mockImplementation(() => new Map());
    service.mapToFormErrors.mockImplementation(() => ({}));
    service.getValuesFromInputs.mockImplementation(() => ({}));
    service.getErrorsFromInput.mockImplementation(() => []);
  });

  it('should submit form', async () => {
    const submit = jest.fn();
    const wrapper = shallow(
      <Form formService={service} onSubmit={submit}>
        {() => <div />}
      </Form>,
    );

    service.getValuesFromInputs.mockImplementationOnce(() => ({
      name: 'value',
    }));
    await (wrapper.instance() as Form).onSubmitEvent();

    expect(submit).toHaveBeenCalledWith({
      name: 'value',
    });
  });

  it('should apply error validation strategy on mount', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const errors = new Map([['input-id', ['error']]]);
    const errorsFromStrategy = new Map([['input-id', ['modified errors']]]);
    const strategy: FormValidationStrategy = {
      getErrorsOnFormMount: jest.fn(() => errorsFromStrategy),
    };
    const wrapper = shallow<Form>(
      <Form
        validationStrategy={strategy}
        formService={service}
        onSubmit={submit}
      >
        {render}
      </Form>,
      {
        disableLifecycleMethods: true,
      },
    );

    service.getErrors.mockImplementationOnce(() => errors);
    service.mapToFormErrors.mockImplementationOnce(() => ({
      name: ['modified errors'],
    }));
    await wrapper.instance().updateErrorsOnMount();

    expect(strategy.getErrorsOnFormMount).toHaveBeenCalledWith(
      errors,
      new Map(),
    );
    expect(service.mapToFormErrors).toHaveBeenCalledWith(errorsFromStrategy);
    expect(render).toHaveBeenCalledWith(
      expect.objectContaining({ errors: { name: ['modified errors'] } }),
    );
  });

  it('should not update errors on mount if strategy is not defined', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const strategy: FormValidationStrategy = {};
    const wrapper = shallow<Form>(
      <Form
        validationStrategy={strategy}
        formService={service}
        onSubmit={submit}
      >
        {render}
      </Form>,
      {
        disableLifecycleMethods: true,
      },
    );

    await wrapper.instance().updateErrorsOnMount();

    expect(render).toHaveBeenCalledTimes(1);
  });

  it('should apply error validation strategy on input update', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const errorsFromStrategy = new Map([['input-id', ['modified errors']]]);
    const strategy: FormValidationStrategy = {
      getErrorsOnFormMount: jest.fn(e => e),
      getErrorsOnInputUpdate: jest.fn(() => errorsFromStrategy),
    };
    const wrapper = shallow<Form>(
      <Form
        validationStrategy={strategy}
        formService={service}
        onSubmit={submit}
      >
        {render}
      </Form>,
      {
        disableLifecycleMethods: true,
      },
    );
    const input = inputFactory('input-id', 'name');
    const errors = new Map([['input-id', ['error2']]]);
    const prevErrors = new Map([['input-id', ['error']]]);
    service.getErrors.mockImplementationOnce(() => prevErrors);
    service.mapToFormErrors.mockImplementationOnce(() => ({
      name: ['error'],
    }));
    await wrapper.instance().updateErrorsOnMount();
    service.getErrors.mockImplementationOnce(() => errors);
    service.mapToFormErrors.mockImplementationOnce(() => ({
      name: ['error2', 'error'],
    }));

    await wrapper.instance().onUpdateEvent(input);

    expect(strategy.getErrorsOnInputUpdate).toHaveBeenCalledWith(
      input,
      errors,
      prevErrors,
    );
    expect(service.mapToFormErrors).toHaveBeenCalledWith(errorsFromStrategy);
    expect(render).toHaveBeenCalledWith(
      expect.objectContaining({ errors: { name: ['error2', 'error'] } }),
    );
  });

  it('should not update errors on input update if strategy is not defined', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const strategy: FormValidationStrategy = {};
    const wrapper = shallow<Form>(
      <Form
        validationStrategy={strategy}
        formService={service}
        onSubmit={submit}
      >
        {render}
      </Form>,
      {
        disableLifecycleMethods: true,
      },
    );

    await wrapper.instance().onUpdateEvent(inputFactory('input-id', 'name'));

    expect(render).toHaveBeenCalledTimes(1);
  });

  it('should apply error validation strategy on input blur', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const errors = new Map([['input-id', ['error2']]]);
    const errorsFromStrategy = new Map([['input-id', ['modified errors']]]);
    const strategy: FormValidationStrategy = {
      getErrorsOnFormMount: jest.fn(e => e),
      getErrorsOnInputBlur: jest.fn(() => errorsFromStrategy),
    };
    const prevErrors = new Map([['input-id', ['error']]]);
    const input = inputFactory('input-id', 'name');
    const wrapper = shallow<Form>(
      <Form
        validationStrategy={strategy}
        formService={service}
        onSubmit={submit}
      >
        {render}
      </Form>,
      {
        disableLifecycleMethods: true,
      },
    );

    service.getErrors.mockImplementationOnce(() => prevErrors);
    service.mapToFormErrors.mockImplementationOnce(() => ({
      name: ['error'],
    }));
    await wrapper.instance().updateErrorsOnMount();

    service.getErrors.mockImplementationOnce(() => errors);
    service.mapToFormErrors.mockImplementationOnce(() => ({
      name: ['error2', 'error'],
    }));
    await wrapper.instance().onBlurEvent(input);

    expect(strategy.getErrorsOnInputBlur).toHaveBeenCalledWith(
      input,
      errors,
      prevErrors,
    );
    expect(service.mapToFormErrors).toHaveBeenCalledWith(errorsFromStrategy);
    expect(render).toHaveBeenCalledWith(
      expect.objectContaining({ errors: { name: ['error2', 'error'] } }),
    );
  });

  it('should not update errors on input blur if strategy is not defined', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const strategy: FormValidationStrategy = {};
    const wrapper = shallow<Form>(
      <Form
        validationStrategy={strategy}
        formService={service}
        onSubmit={submit}
      >
        {render}
      </Form>,
      {
        disableLifecycleMethods: true,
      },
    );

    await wrapper.instance().onBlurEvent(inputFactory('input-id', 'name'));

    expect(render).toHaveBeenCalledTimes(1);
  });

  it("should not update errors on input update if input's validation on change is disabled", async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const strategy: FormValidationStrategy = {
      getErrorsOnInputUpdate: (_, e) => e,
    };
    const wrapper = shallow<Form>(
      <Form
        validationStrategy={strategy}
        formService={service}
        onSubmit={submit}
      >
        {render}
      </Form>,
      {
        disableLifecycleMethods: true,
      },
    );

    await wrapper
      .instance()
      .onUpdateEvent(inputFactory('input-id', 'name', 'value', false));

    expect(render).toHaveBeenCalledTimes(1);
  });

  it('should not submit form and inform about errors instead, if there are errors', async () => {
    const submit = jest.fn();
    const error = jest.fn();

    const wrapper = shallow<Form>(
      <Form formService={service} onSubmit={submit} onError={error}>
        {jest.fn()}
      </Form>,
      {
        disableLifecycleMethods: true,
      },
    );

    service.getErrors.mockImplementationOnce(
      () => new Map([['input-id', ['error']]]),
    );
    service.mapToFormErrors.mockImplementationOnce(() => ({
      name1: ['error1'],
      name2: ['error2'],
    }));
    await wrapper.instance().onSubmitEvent();

    expect(submit).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith({
      name1: ['error1'],
      name2: ['error2'],
    });
  });

  it('should tell render function if validators are pending upon submit', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const wrapper = shallow<Form>(
      <Form formService={service} onSubmit={submit}>
        {render}
      </Form>,
    );

    await wrapper.instance().onSubmitEvent();

    expect(render.mock.calls[1][0]).toEqual(
      expect.objectContaining({ isValidating: true }),
    );
    expect(render.mock.calls[2][0]).toEqual(
      expect.objectContaining({ isValidating: false }),
    );
  });

  it('should tell render function that validators are not pending if there was error upon validation', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const wrapper = shallow<Form>(
      <Form formService={service} onSubmit={submit}>
        {render}
      </Form>,
    );

    service.getErrors.mockImplementationOnce(() => Promise.reject(new Error()));

    await expect(wrapper.instance().onSubmitEvent()).rejects.toBeInstanceOf(
      Error,
    );
    wrapper.update();

    expect(render.mock.calls[1][0]).toEqual(
      expect.objectContaining({ isValidating: true }),
    );
    expect(render.mock.calls[2][0]).toEqual(
      expect.objectContaining({ isValidating: false }),
    );
  });

  it('should tell render function if validators are pending upon errors update', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const wrapper = shallow<Form>(
      <Form formService={service} onSubmit={submit}>
        {render}
      </Form>,
    );

    await wrapper.instance().updateErrorsWithStrategy(errors => errors);

    expect(render.mock.calls[1][0]).toEqual(
      expect.objectContaining({ isValidating: true }),
    );
    expect(render.mock.calls[2][0]).toEqual(
      expect.objectContaining({ isValidating: false }),
    );
  });

  it('should tell render function that validators are not pending if there was error upon errors update', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const wrapper = shallow<Form>(
      <Form formService={service} onSubmit={submit}>
        {render}
      </Form>,
    );

    service.getErrors.mockImplementationOnce(() => Promise.reject(new Error()));

    await expect(
      wrapper.instance().updateErrorsWithStrategy(errors => errors),
    ).rejects.toBeInstanceOf(Error);
    wrapper.update();

    expect(render.mock.calls[1][0]).toEqual(
      expect.objectContaining({ isValidating: true }),
    );
    expect(render.mock.calls[2][0]).toEqual(
      expect.objectContaining({ isValidating: false }),
    );
  });

  it('should clear inputs on submit if clearOnSubmit prop is true', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const wrapper = shallow<Form>(
      <Form
        formService={service}
        clearOnSubmit={true}
        formEventEmitter={emitter}
        onSubmit={submit}
      >
        {render}
      </Form>,
    );

    await wrapper.instance().onSubmitEvent();

    expect(emitter.clear).toHaveBeenCalled();
  });

  it('should clear inputs on clear event', async () => {
    const submit = jest.fn();
    const render = jest.fn();
    const wrapper = shallow<Form>(
      <Form
        formService={service}
        clearOnSubmit={true}
        formEventEmitter={emitter}
        onSubmit={submit}
      >
        {render}
      </Form>,
    );

    await wrapper.instance().onClearEvent();

    expect(service.clearInputs).toHaveBeenCalled();
  });
});
