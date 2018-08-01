import * as React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import FormEventEmitter from '../../services/FormEventEmitter';
import { FormService } from '../../services';
import { InputDescriptor } from '../../types';

describe('Form', () => {
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
