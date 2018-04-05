var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { shallow } from 'enzyme';
import { FormInput } from './FormInput';
import { FormService, FormEventEmitter, } from '../../services';
jest.mock('../../services');
var mockValidators = [
    { errorMessage: 'mock error message', validate: function () { return true; } },
];
var mockDescriptor = {
    id: 'testId',
    name: 'testName',
    value: 'testValue',
    required: false,
    requiredMessage: 'required message',
    validators: mockValidators,
};
describe('FormInput', function () {
    var formService;
    var formEventEmitter;
    beforeEach(function () {
        formService = new FormService();
        formEventEmitter = new FormEventEmitter();
        formService.getErrorsFromInput
            .mockImplementation(function () { return []; });
    });
    it('should update input descriptor on change', function () {
        var change;
        var wrapper = shallow(React.createElement(FormInput, __assign({}, mockDescriptor, { formService: formService, formEventEmitter: formEventEmitter }), function (_a) {
            var onChange = _a.onChange;
            change = onChange;
            return React.createElement("div", null);
        }));
        change('newValue');
        expect(formService.updateInput).toHaveBeenCalledWith(__assign({}, mockDescriptor, { value: 'newValue' }));
    });
    it('should display label if provided', function () {
        var wrapper = shallow(React.createElement(FormInput, __assign({}, mockDescriptor, { label: "Test field", formService: formService, formEventEmitter: formEventEmitter }), function (_a) {
            var onChange = _a.onChange;
            return React.createElement("div", null);
        }));
        expect(wrapper.find('Label')).toHaveLength(1);
        wrapper.setProps({ label: undefined });
        expect(wrapper.find('Label')).toHaveLength(0);
    });
    it('should display errors if input is invalid', function () {
        var change;
        formService.getErrorsFromInput
            .mockImplementation(function () { return [
            'Message 1',
            'Message 2',
            'Message 3',
        ]; });
        var wrapper = shallow(React.createElement(FormInput, __assign({}, mockDescriptor, { label: "Test field", formService: formService, formEventEmitter: formEventEmitter }), function (_a) {
            var onChange = _a.onChange;
            change = onChange;
            return React.createElement("div", null);
        }));
        change('any value');
        expect(wrapper.update().find('.error')).toHaveLength(3);
    });
    it('should pass has errors flag from props to input', function () {
        var renderProps = jest.fn(function () { return React.createElement("div", null); });
        var wrapper = shallow(React.createElement(FormInput, __assign({}, mockDescriptor, { formService: formService, formEventEmitter: formEventEmitter }), renderProps));
        expect(renderProps).toHaveBeenLastCalledWith(expect.objectContaining({ hasErrors: false }));
        wrapper.setProps({ hasErrors: true });
        expect(renderProps).toHaveBeenLastCalledWith(expect.objectContaining({ hasErrors: true }));
    });
    it('should give has errors prop a higher priority', function () {
        var change;
        formService.getErrorsFromInput
            .mockImplementation(function () { return [
            'Message 1',
            'Message 2',
            'Message 3',
        ]; });
        var renderProps = jest.fn(function (_a) {
            var onChange = _a.onChange;
            change = onChange;
            return React.createElement("div", null);
        });
        var wrapper = shallow(React.createElement(FormInput, __assign({}, mockDescriptor, { formService: formService, formEventEmitter: formEventEmitter, hasErrors: false }), renderProps));
        change('any value');
        expect(renderProps).toHaveBeenLastCalledWith(expect.objectContaining({ hasErrors: false }));
    });
    it('should tell if input has errors', function () {
        var change;
        formService.getErrorsFromInput
            .mockImplementation(function () { return [
            'Message 1',
            'Message 2',
            'Message 3',
        ]; });
        var renderProps = jest.fn(function (_a) {
            var onChange = _a.onChange;
            change = onChange;
            return React.createElement("div", null);
        });
        var wrapper = shallow(React.createElement(FormInput, __assign({}, mockDescriptor, { formService: formService, formEventEmitter: formEventEmitter }), renderProps));
        change('any value');
        expect(renderProps).toHaveBeenLastCalledWith(expect.objectContaining({ hasErrors: true }));
    });
});
//# sourceMappingURL=FormInput.test.js.map