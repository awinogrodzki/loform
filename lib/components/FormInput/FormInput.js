"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var classNames = require("classnames");
var uuid = require("uuid/v4");
var Label_1 = require("../Label");
var services_1 = require("../../services");
var context_1 = require("../../context");
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
        this.props.formEventEmitter.addListener(services_1.FormEvent.Submit, this.onFormSubmit);
    };
    FormInput.prototype.componentWillUnmount = function () {
        this.props.formService.unregisterInputById(this.id);
        this.props.formEventEmitter.removeListener(services_1.FormEvent.Submit, this.onFormSubmit);
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
        this.props.formEventEmitter.update();
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
        var _a;
        var _b = this.props, notUsedId = _b.id, containerClass = _b.containerClass, inputContainerClass = _b.inputContainerClass, inputWrapperClass = _b.inputWrapperClass, errorContainerClass = _b.errorContainerClass, errorClass = _b.errorClass, formService = _b.formService, formEventEmitter = _b.formEventEmitter, className = _b.className, placeholder = _b.placeholder, name = _b.name, value = _b.value, disabled = _b.disabled, validators = _b.validators, required = _b.required, requiredMessage = _b.requiredMessage, label = _b.label, onChange = _b.onChange, children = _b.children, hasErrorsFromProps = _b.hasErrors, rest = __rest(_b, ["id", "containerClass", "inputContainerClass", "inputWrapperClass", "errorContainerClass", "errorClass", "formService", "formEventEmitter", "className", "placeholder", "name", "value", "disabled", "validators", "required", "requiredMessage", "label", "onChange", "children", "hasErrors"]);
        var hasErrors = hasErrorsFromProps !== undefined
            ? hasErrorsFromProps
            : this.state.hasErrors;
        return (React.createElement("div", { className: classNames(styles.container, containerClass) },
            React.createElement("div", { className: classNames(styles.inputContainer, inputContainerClass) },
                label && (React.createElement(Label_1.default, { htmlFor: this.id, className: styles.label, required: required }, label)),
                React.createElement("div", { className: classNames(styles.inputWrapper, inputWrapperClass) },
                    this.props.children(__assign({ name: name,
                        disabled: disabled,
                        placeholder: placeholder,
                        hasErrors: hasErrors, id: this.id, className: classNames(className, styles.input, (_a = {},
                            _a[styles.hasErrors] = hasErrors,
                            _a)), value: this.state.value, onChange: this.onInputChange }, rest)),
                    this.renderErrors(this.state.errors)))));
    };
    FormInput.defaultProps = {
        value: '',
        validators: [],
    };
    return FormInput;
}(React.Component));
exports.FormInput = FormInput;
exports.FormInputDecorator = function (Component) {
    var DecoratedInput = function (props) { return (React.createElement(context_1.FormContext.Consumer, null, function (_a) {
        var formService = _a.formService, formEventEmitter = _a.formEventEmitter;
        return (React.createElement(FormInput, __assign({ formService: formService, formEventEmitter: formEventEmitter }, props), function (inputProps) { return React.createElement(Component, __assign({}, inputProps)); }));
    })); };
    DecoratedInput.propTypes = {
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        value: PropTypes.string,
        onChange: PropTypes.func,
        hasErrors: PropTypes.bool,
        containerClass: PropTypes.string,
        inputContainerClass: PropTypes.string,
        inputWrapperClass: PropTypes.string,
        errorContainerClass: PropTypes.string,
        errorClass: PropTypes.string,
        validators: PropTypes.arrayOf(PropTypes.shape({
            errorMessage: PropTypes.string.isRequired,
            validate: PropTypes.func.isRequired,
        })),
        required: PropTypes.bool,
        requiredMessage: PropTypes.string,
    };
    return DecoratedInput;
};
exports.default = FormInput;
//# sourceMappingURL=FormInput.js.map