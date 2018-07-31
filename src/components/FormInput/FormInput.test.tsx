import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { FormInput } from './FormInput';
import { FormService, FormEventEmitter } from '../../services';

jest.mock('../../services');

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
    (formService.getErrorsFromInput as jest.Mock).mockImplementation(() => []);
  });

  it('should update input descriptor on change', () => {
    let change: (values: string) => any;
    (formService.getInput as jest.Mock).mockReturnValueOnce(mockDescriptor);
    mount(
      <FormInput
        {...mockDescriptor}
        formService={formService}
        formEventEmitter={formEventEmitter}
      >
        {({ onChange }) => {
          change = onChange!;

          return <div />;
        }}
      </FormInput>,
    );

    change!('newValue');
    expect(formService.updateInput).toHaveBeenCalledWith({
      ...mockDescriptor,
      value: 'newValue',
    });
  });

  it('should update state value if prop value has changed', () => {
    let change: (value: string) => any;
    const renderProps = jest.fn(({ onChange }) => {
      change = onChange;
      return <div />;
    });

    const wrapper = shallow(
      <FormInput
        {...mockDescriptor}
        formService={formService}
        formEventEmitter={formEventEmitter}
      >
        {renderProps}
      </FormInput>,
    );

    change!('any value');
    expect(wrapper.state('value')).toBe('any value');

    wrapper.setProps({ value: 'value from props' });
    expect(wrapper.state('value')).toBe('value from props');
  });

  it('should update state value if prop value has changed with undefined', () => {
    let change: (value: string) => any;
    const renderProps = jest.fn(({ onChange }) => {
      change = onChange;
      return <div />;
    });

    const wrapper = shallow(
      <FormInput
        {...mockDescriptor}
        formService={formService}
        formEventEmitter={formEventEmitter}
      >
        {renderProps}
      </FormInput>,
    );

    change!('any value');
    expect(wrapper.state('value')).toBe('any value');

    wrapper.setProps({ value: undefined });
    expect(wrapper.state('value')).toBe(undefined);
  });
});
