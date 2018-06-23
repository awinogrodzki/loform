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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var classNames = require("classnames");
var services_1 = require("../../services");
var context_1 = require("../../context");
var styles = require('./Form.css');
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.formEventEmitter = props.formEventEmitter
            ? props.formEventEmitter
            : new services_1.FormEventEmitter();
        _this.formService = props.formService
            ? props.formService
            : new services_1.FormService();
        _this.renderProps = {
            submit: _this.formEventEmitter.submit.bind(_this.formEventEmitter),
        };
        _this.onFormSubmit = _this.onFormSubmit.bind(_this);
        _this.onSubmitEvent = _this.onSubmitEvent.bind(_this);
        _this.formEventEmitter.addListener(services_1.FormEvent.Submit, _this.onSubmitEvent);
        return _this;
    }
    Form.prototype.componentWillUnmount = function () {
        this.formEventEmitter.removeListener(services_1.FormEvent.Submit, this.onSubmitEvent);
    };
    Form.prototype.submit = function () {
        var values = this.formService.getValuesFromInputs();
        var errors = this.formService.getErrors();
        var isValid = Object.keys(errors).length === 0;
        if (!isValid) {
            this.props.onError && this.props.onError(errors);
            return;
        }
        this.props.onSubmit(values);
    };
    Form.prototype.onSubmitEvent = function () {
        this.submit();
    };
    Form.prototype.onFormSubmit = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    Form.prototype.render = function () {
        return (React.createElement("form", { onSubmit: this.onFormSubmit, className: classNames(styles.container, this.props.className) },
            React.createElement(context_1.FormContext.Provider, { value: {
                    formEventEmitter: this.formEventEmitter,
                    formService: this.formService,
                } }, this.props.children(this.renderProps))));
    };
    Form.propTypes = {
        className: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        onError: PropTypes.func,
        children: PropTypes.func.isRequired,
        formService: PropTypes.instanceOf(services_1.FormService),
        formEventEmitter: PropTypes.instanceOf(services_1.FormEventEmitter),
    };
    return Form;
}(React.Component));
exports.default = Form;
//# sourceMappingURL=Form.js.map