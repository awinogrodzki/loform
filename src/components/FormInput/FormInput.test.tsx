import * as React from 'react';
import { shallow } from 'enzyme';
import { FormInput } from './FormInput';
import {
  FormService,
  FormEventEmitter,
} from '../../services';
import { InputPropsInterface } from '../../types';

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

  it('should display label if provided', () => {
    const wrapper = shallow(
      <FormInput
        {...mockDescriptor}
        label="Test field"
        formService={formService}
        formEventEmitter={formEventEmitter}
      >
        {({
          onChange,
        }) => <div/>}
      </FormInput>,
    );

    expect(wrapper.find('Label')).toHaveLength(1);

    wrapper.setProps({ label: undefined });

    expect(wrapper.find('Label')).toHaveLength(0);
  });

  it('should display errors if input is invalid', () => {
    let change: (value: string) => any;
    (formService.getErrorsFromInput as jest.Mock)
      .mockImplementation(() => [
        'Message 1',
        'Message 2',
        'Message 3',
      ]);
    const wrapper = shallow(
      <FormInput
        {...mockDescriptor}
        label="Test field"
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

    change('any value');
    expect(wrapper.update().find('.error')).toHaveLength(3);
  });

  it('should pass has errors flag from props to input', () => {
    const renderProps = jest.fn(() => <div/>);

    const wrapper = shallow(
      <FormInput
        {...mockDescriptor}
        formService={formService}
        formEventEmitter={formEventEmitter}
      >
        {renderProps}
      </FormInput>,
    );

    expect(renderProps).toHaveBeenLastCalledWith(expect.objectContaining({ hasErrors: false }));

    wrapper.setProps({ hasErrors: true });

    expect(renderProps).toHaveBeenLastCalledWith(expect.objectContaining({ hasErrors: true }));
  });

  it('should give has errors prop a higher priority', () => {
    let change: (value: string) => any;
    (formService.getErrorsFromInput as jest.Mock)
      .mockImplementation(() => [
        'Message 1',
        'Message 2',
        'Message 3',
      ]);
    const renderProps = jest.fn(({
      onChange,
    }) => {
      change = onChange;
      return <div/>;
    });

    const wrapper = shallow(
      <FormInput
        {...mockDescriptor}
        formService={formService}
        formEventEmitter={formEventEmitter}
        hasErrors={false}
      >
        {renderProps}
      </FormInput>,
    );

    change('any value');

    expect(renderProps).toHaveBeenLastCalledWith(expect.objectContaining({ hasErrors: false }));
  });

  it('should tell if input has errors', () => {
    let change: (value: string) => any;
    (formService.getErrorsFromInput as jest.Mock)
      .mockImplementation(() => [
        'Message 1',
        'Message 2',
        'Message 3',
      ]);
    const renderProps = jest.fn(({
      onChange,
    }) => {
      change = onChange;
      return <div/>;
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

    change('any value');
    expect(renderProps).toHaveBeenLastCalledWith(expect.objectContaining({ hasErrors: true }));
  });
});
