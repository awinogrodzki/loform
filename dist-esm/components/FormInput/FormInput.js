var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import * as classNames from 'classnames';
import * as uuid from 'uuid/v4';
import Label from '../Label';
var styles = require('./FormInput.css');
var FormInput = /** @class */ (function (_super) {
    __extends(FormInput, _super);
    function FormInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: _this.props.value || '',
            hasErrors: false,
            errors: [],
        };
        _this.id = props.id || uuid();
        _this.onInputChange = _this.onInputChange.bind(_this);
        _this.onFormSubmit = _this.onFormSubmit.bind(_this);
        return _this;
    }
    FormInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.value !== undefined && this.props.value !== nextProps.value) {
            this.setState({ value: nextProps.value });
        }
    };
    FormInput.prototype.getDescriptorFromProps = function (value) {
        return {
            value: value,
            id: this.id,
            label: this.props.label,
            name: this.props.name,
            required: this.props.required || false,
            requiredMessage: this.props.requiredMessage,
            validators: this.props.validators,
        };
    };
    FormInput.prototype.componentDidMount = function () {
        this.props.formService.registerInput(this.getDescriptorFromProps(this.state.value));
        this.props.formEventEmitter.addSubmitListener(this.onFormSubmit);
    };
    FormInput.prototype.componentWillUnmount = function () {
        this.props.formService.unregisterInputById(this.id);
        this.props.formEventEmitter.removeSubmitListener(this.onFormSubmit);
    };
    FormInput.prototype.onFormSubmit = function () {
        this.validate(this.getDescriptorFromProps(this.state.value));
    };
    FormInput.prototype.validate = function (descriptor) {
        var errors = this.props.formService.getErrorsFromInput(descriptor);
        var hasErrors = !!errors.length;
        this.setState({
            errors: errors,
            hasErrors: hasErrors,
            value: descriptor.value,
        });
        return !hasErrors;
    };
    FormInput.prototype.onInputChange = function (value) {
        var descriptor = this.getDescriptorFromProps(value);
        this.props.formService.updateInput(descriptor);
        this.props.formEventEmitter.triggerUpdate();
        this.validate(descriptor);
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };
    FormInput.prototype.renderErrors = function (errors) {
        var _this = this;
        return (React.createElement("div", { className: classNames(styles.errors, this.props.errorContainerClass) }, errors.map(function (error, index) { return (React.createElement("div", { title: error, key: index, className: classNames(styles.error, _this.props.errorClass) },
            React.createElement("span", null, error))); })));
    };
    FormInput.prototype.render = function () {
        var _a = this.props, notUsedId = _a.id, containerClass = _a.containerClass, inputContainerClass = _a.inputContainerClass, inputWrapperClass = _a.inputWrapperClass, errorContainerClass = _a.errorContainerClass, errorClass = _a.errorClass, formService = _a.formService, formEventEmitter = _a.formEventEmitter, className = _a.className, placeholder = _a.placeholder, name = _a.name, value = _a.value, disabled = _a.disabled, validators = _a.validators, required = _a.required, requiredMessage = _a.requiredMessage, label = _a.label, onChange = _a.onChange, children = _a.children, hasErrorsFromProps = _a.hasErrors, rest = __rest(_a, ["id", "containerClass", "inputContainerClass", "inputWrapperClass", "errorContainerClass", "errorClass", "formService", "formEventEmitter", "className", "placeholder", "name", "value", "disabled", "validators", "required", "requiredMessage", "label", "onChange", "children", "hasErrors"]);
        var hasErrors = hasErrorsFromProps !== undefined
            ? hasErrorsFromProps : this.state.hasErrors;
        return (React.createElement("div", { className: classNames(styles.container, containerClass) },
            React.createElement("div", { className: classNames(styles.inputContainer, inputContainerClass) },
                label &&
                    React.createElement(Label, { htmlFor: this.id, className: styles.label, required: required }, label),
                React.createElement("div", { className: classNames(styles.inputWrapper, inputWrapperClass) },
                    this.renderErrors(this.state.errors),
                    this.props.children(__assign({ name: name,
                        disabled: disabled,
                        placeholder: placeholder,
                        hasErrors: hasErrors, id: this.id, className: classNames(className, styles.input, (_b = {}, _b[styles.hasErrors] = hasErrors, _b)), value: this.state.value, onChange: this.onInputChange }, rest))))));
        var _b;
    };
    FormInput.defaultProps = {
        value: '',
        validators: [],
    };
    return FormInput;
}(React.Component));
export { FormInput };
export var FormInputDecorator = function (Component) {
    return function (props) { return (React.createElement(FormInput, __assign({}, props), function (inputProps) { return React.createElement(Component, __assign({}, inputProps)); })); };
};
export default FormInput;
//# sourceMappingURL=FormInput.js.map