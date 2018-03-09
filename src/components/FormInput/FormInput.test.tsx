import * as React from 'react';
import { mount, shallow } from 'enzyme';
import FormInput, { FormInputDecorator } from './FormInput';
import { InputInterface } from 'types';
import FormService from 'services/FormService';
import FormEventEmitter from 'services/FormEventEmitter';

const MockInput: React.SFC<InputInterface> = ({
  className,
  name,
  onChange,
  value = undefined,
}) => (
  <input
    onChange={e => onChange(e.target.value)}
    className={className}
    name={name}
    type="text"
    value={value}
  />
);

const DecoratedInput = FormInputDecorator<InputInterface>(MockInput);

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

jest.mock('services/FormService');
jest.mock('services/FormEventEmitter');

describe('InputHOC', () => {
  let mockFormEventEmitter: FormEventEmitter;
  let mockFormService: FormService;

  beforeEach(() => {
    mockFormEventEmitter = new FormEventEmitter();
    mockFormService = new FormService();
    (mockFormService.getErrorsFromInput as jest.Mock).mockReturnValue([]);
  });

  it('should pass input descriptors on init', () => {
    const wrapper = mount(
      <DecoratedInput
        {...mockDescriptor}
        formService={mockFormService}
        formEventEmitter={mockFormEventEmitter}
      />,
    );

    expect(mockFormService.registerInput).toHaveBeenCalledWith(mockDescriptor);
  });

  it('should pass descriptor on change', () => {
    const wrapper = shallow(
      <DecoratedInput
        {...mockDescriptor}
        formService={mockFormService}
        formEventEmitter={mockFormEventEmitter}
      />,
    );

    wrapper.find('MockInput').simulate('change', 'newValue');

    expect(mockFormService.updateInput)
      .toHaveBeenCalledWith({ ...mockDescriptor, value: 'newValue' });
  });

  it('should validate descriptor on change', () => {
    (mockFormService.getErrorsFromInput as jest.Mock).mockReturnValueOnce(['errors']);
    const wrapper = shallow(
      <DecoratedInput
        {...mockDescriptor}
        formService={mockFormService}
        formEventEmitter={mockFormEventEmitter}
      />,
    );
    wrapper.find('MockInput').simulate('change', mockDescriptor.value);

    expect(mockFormService.getErrorsFromInput).toHaveBeenLastCalledWith(mockDescriptor);
    expect(wrapper.state('errors')).toEqual(['errors']);
    expect(wrapper.state('hasErrors')).toBe(true);
  });

  it('should display all received errors', () => {
    (mockFormService.getErrorsFromInput as jest.Mock)
      .mockReturnValueOnce(['error1', 'error2', 'error3']);
    const wrapper = shallow(
      <DecoratedInput
        {...mockDescriptor}
        formService={mockFormService}
        formEventEmitter={mockFormEventEmitter}
      />,
    );
    wrapper.find('MockInput').simulate('change', mockDescriptor.value);
    const errors = wrapper.find('.error');

    expect(errors).toHaveLength(3);
    expect(errors.at(0).text()).toBe('error1');
    expect(errors.at(1).text()).toBe('error2');
    expect(errors.at(2).text()).toBe('error3');
  });

  it('should update value if external component updated it', () => {
    const wrapper = shallow(
      <DecoratedInput
        {...mockDescriptor}
        value={'firstValue'}
        formService={mockFormService}
        formEventEmitter={mockFormEventEmitter}
      />,
    );

    expect(wrapper.find('MockInput').props().value).toBe('firstValue');
    wrapper.find('MockInput').simulate('change', mockDescriptor.value);
    expect(wrapper.update().find('MockInput').props().value).toBe(mockDescriptor.value);

    wrapper.setProps({ value: 'secondValue' });
    expect(wrapper.update().find('MockInput').props().value).toBe('secondValue');
  });

  it('should not update value if external component sent props but not updated it', () => {
    const wrapper = shallow(
      <DecoratedInput
        {...mockDescriptor}
        value={'firstValue'}
        formService={mockFormService}
        formEventEmitter={mockFormEventEmitter}
      />,
    );

    expect(wrapper.find('MockInput').props().value).toBe('firstValue');
    wrapper.find('MockInput').simulate('change', mockDescriptor.value);
    expect(wrapper.update().find('MockInput').props().value).toBe(mockDescriptor.value);

    wrapper.setProps({ value: 'firstValue' });
    expect(wrapper.update().find('MockInput').props().value).toBe(mockDescriptor.value);
  });

  it('should send input descriptor if component is about to be removed', () => {
    const wrapper = mount(
      <DecoratedInput
        {...mockDescriptor}
        formService={mockFormService}
        formEventEmitter={mockFormEventEmitter}
      />,
    );

    wrapper.unmount();
    expect(mockFormService.unregisterInputById).toHaveBeenCalledWith(mockDescriptor.id);
  });
});
