import * as React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import FormEventEmitter from '../../services/FormEventEmitter';
import { FormService } from '../../services';
import { InputDescriptor } from '../../types';

describe('Form', () => {
  it('should show errors only for input updated by user', () => {
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

    formService.updateInput(firstInput);
    eventEmitter.update(firstInput);

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {
          name1: ['Nothing personal'],
        },
      }),
    );
  });

  it('should remove input key from errors if it is no longer invalid', () => {
    const render = jest.fn(() => <div />);
    const eventEmitter = new FormEventEmitter();

    shallow(
      <Form formEventEmitter={eventEmitter} onSubmit={jest.fn()}>
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

    eventEmitter.update(firstInput);

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {
          name1: ['error'],
        },
      }),
    );

    const updatedInput = { ...firstInput, value: 'test' };

    eventEmitter.update(updatedInput);

    expect(render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: {},
      }),
    );
  });
});
