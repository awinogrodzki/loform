import * as React from 'react';
import { shallow } from 'enzyme';
import { FormInput } from './FormInput';
import {
  FormService,
  FormEventEmitter,
} from 'services';
import { InputPropsInterface } from 'types';

jest.mock('services');

const mockValidators = [
  { errorMessage: 'mock error message', validate: () => true },
];

const mockDescriptor = {
  id: 'testId',
  name: 'testName',
  value: 'testValue',
  required: false,
  requiredMessage: 'required message',
  validators: mockValidators,
};

describe('FormInput', () => {
  let formService: FormService;
  let formEventEmitter: FormEventEmitter;

  beforeEach(() => {
    formService = new FormService();
    formEventEmitter = new FormEventEmitter();
    (formService.getErrorsFromInput as jest.Mock)
      .mockImplementation(() => []);
  });

  it('should update input descriptor on change', () => {
    let change: (values: string) => any;

    const wrapper = shallow(
      <FormInput
        {...mockDescriptor}
        formService={formService}
        formEventEmitter={formEventEmitter}
      >
        {({
          onChange,
        }) => {
          change = onChange;

          return <div/>;
        }}
      </FormInput>,
    );

    change('newValue');
    expect(formService.updateInput).toHaveBeenCalledWith({
      ...mockDescriptor,
      value: 'newValue',
    });
  });
});
