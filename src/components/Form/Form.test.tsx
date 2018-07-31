import * as React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import FormEventEmitter from '../../services/FormEventEmitter';
import { FormService } from '../../services';
import { InputDescriptor } from '../../types';

describe('Form', () => {
  it('should show errors only after submit', () => {
    const render = jest.fn(() => <div />);
    const eventEmitter = new FormEventEmitter();
    const formService = new FormService();

    shallow(
      <Form
        formEventEmitter={eventEmitter}
        formService={formService}
        onSubmit={jest.fn()}
      >
        {render}
      </Form>,
    );

    const alwaysFailing = [
      {
        errorMessage: 'Nothing personal',
        validate: () => false,
      },
    ];

    const firstInput: InputDescriptor = {
      id: 'test1',
      name: 'name1',
      value: 'any1',
      required: false,
      validators: alwaysFailing,
    };

    const secondInput: InputDescriptor = {
      id: 'test2',
      name: 'name2',
      value: 'any2',
      required: false,
      validators: alwaysFailing,
    };

    formService.registerInput(firstInput);
    formService.registerInput(secondInput);

    eventEmitter.update(firstInput);
    eventEmitter.update(secondInput);

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {},
      }),
    );

    eventEmitter.submit();

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {
          name1: ['Nothing personal'],
          name2: ['Nothing personal'],
        },
      }),
    );
  });

  it('should remove only corrected errors on update', () => {
    const render = jest.fn(() => <div />);
    const eventEmitter = new FormEventEmitter();
    const formService = new FormService();

    shallow(
      <Form
        formEventEmitter={eventEmitter}
        formService={formService}
        onSubmit={jest.fn()}
      >
        {render}
      </Form>,
    );

    const input: InputDescriptor = {
      id: 'test1',
      name: 'name1',
      value: '',
      required: false,
      validators: [
        { errorMessage: 'error1', validate: value => value === 'value1' },
        { errorMessage: 'error2', validate: value => false },
        { errorMessage: 'error3', validate: value => false },
      ],
    };

    formService.registerInput(input);
    eventEmitter.submit();

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {
          name1: [
            'error1',
            'error2',
            'error3',
          ],
        },
      }),
    );

    formService.updateInput({ ...input, value: 'value1' });
    eventEmitter.update({ ...input, value: 'value1' });

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {
          name1: [
            'error2',
            'error3',
          ],
        },
      }),
    );

    formService.updateInput({ ...input, value: 'value1', required: true });
    eventEmitter.update({ ...input, value: 'value1' });

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {
          name1: [
            'error2',
            'error3',
          ],
        },
      }),
    );
  });

  it('should not return empty array of errors for valid inputs', () => {
    const render = jest.fn(() => <div />);
    const eventEmitter = new FormEventEmitter();
    const formService = new FormService();

    shallow(
      <Form
        formEventEmitter={eventEmitter}
        formService={formService}
        onSubmit={jest.fn()}
      >
        {render}
      </Form>,
    );

    const input: InputDescriptor = {
      id: 'test1',
      name: 'name1',
      value: '',
      required: false,
      validators: [
        { errorMessage: 'error1', validate: value => value === 'value1' },
        { errorMessage: 'error2', validate: value => value !== 'value1' },
      ],
    };

    formService.registerInput(input);
    eventEmitter.submit();

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {
          name1: [
            'error1',
          ],
        },
      }),
    );

    formService.updateInput({ ...input, value: 'value1' });
    eventEmitter.update({ ...input, value: 'value1' });

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {},
      }),
    );
  });

  it('should remove input key from errors if it is no longer invalid', () => {
    const render = jest.fn(() => <div />);
    const formService = new FormService();
    const eventEmitter = new FormEventEmitter();

    shallow(
      <Form
        formService={formService}
        formEventEmitter={eventEmitter}
        onSubmit={jest.fn()}
      >
        {render}
      </Form>,
    );

    const firstInput: InputDescriptor = {
      id: 'test1',
      name: 'name1',
      value: '',
      required: true,
      requiredMessage: 'error',
    };

    formService.registerInput(firstInput);
    eventEmitter.submit();

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {
          name1: ['error'],
        },
      }),
    );

    const updatedInput = { ...firstInput, value: 'test' };

    formService.updateInput(updatedInput);
    eventEmitter.update(updatedInput);

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {},
      }),
    );
  });
});
