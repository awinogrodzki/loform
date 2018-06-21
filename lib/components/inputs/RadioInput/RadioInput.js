"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classNames = require("classnames");
var components_1 = require("../../../components");
var styles = require('./RadioInput.css');
var RadioInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, className = _a.className, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, hasErrors = _a.hasErrors, _c = _a.options, options = _c === void 0 ? [] : _c;
    return (React.createElement("div", null, options.map(function (option, index) {
        var _a;
        var inputId = id + "_" + index;
        var inputName = "" + name;
        var checked = value !== undefined && value === option.value;
        return (React.createElement("div", { className: classNames(styles.container, className, (_a = {}, _a[styles.hasErrors] = hasErrors, _a)), key: inputId },
            React.createElement("input", { id: inputId, disabled: option.disabled, type: "radio", name: inputName, className: styles.input, value: option.value, checked: checked, onClick: function () { return !option.disabled && onChange(option.value); } }),
            React.createElement("label", { onClick: function () { return !option.disabled && onChange(option.value); }, htmlFor: inputId }, option.label)));
    })));
};
exports.default = components_1.FormInputDecorator(RadioInput);
//# sourceMappingURL=RadioInput.js.map