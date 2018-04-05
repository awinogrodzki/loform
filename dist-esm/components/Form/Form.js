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
import * as React from 'react';
import * as classNames from 'classnames';
import FormService from '../../services/FormService';
import FormEventEmitter from '../../services/FormEventEmitter';
var styles = require('./Form.css');
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.formEventEmitter = props.formEventEmitter
            ? props.formEventEmitter : (new FormEventEmitter());
        _this.formService = props.formService
            ? props.formService : (new FormService());
        _this.renderProps = {
            inputProps: {
                containerClass: styles.input,
                formService: _this.formService,
                formEventEmitter: _this.formEventEmitter,
            },
            submit: _this.formEventEmitter.triggerSubmit.bind(_this.formEventEmitter),
        };
        _this.onFormSubmit = _this.onFormSubmit.bind(_this);
        _this.onSubmitEvent = _this.onSubmitEvent.bind(_this);
        _this.formEventEmitter.addSubmitListener(_this.onSubmitEvent);
        return _this;
    }
    Form.prototype.componentWillUnmount = function () {
        this.formEventEmitter.removeSubmitListener(this.onSubmitEvent);
    };
    Form.prototype.submit = function () {
        var values = this.formService.getValuesFromInputs();
        if (!this.formService.validateInputs()) {
            var errors = this.formService.getErrors();
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
        return (React.createElement("form", { onSubmit: this.onFormSubmit, className: classNames(styles.container, this.props.className) }, this.props.children(this.renderProps)));
    };
    return Form;
}(React.Component));
export default Form;
//# sourceMappingURL=Form.js.map