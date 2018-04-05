import * as React from 'react';
import * as classNames from 'classnames';
import { FormInputDecorator } from '../../../components';
var styles = require('./RadioInput.css');
var RadioInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, radioInputContainerClass = _a.radioInputContainerClass, className = _a.className, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, hasErrors = _a.hasErrors, _c = _a.options, options = _c === void 0 ? [] : _c;
    return (React.createElement("div", null, options.map(function (option, index) {
        var inputId = id + "_" + index;
        var inputName = "" + name;
        var checked = value !== undefined && value === option.value;
        return (React.createElement("div", { className: classNames(styles.container, radioInputContainerClass, (_a = {}, _a[styles.hasErrors] = hasErrors, _a)), key: inputId },
            React.createElement("input", { id: inputId, disabled: option.disabled, type: "radio", className: classNames(styles.input, className), name: inputName, value: option.value, checked: checked, onClick: function () { return !option.disabled && onChange(option.value); } }),
            React.createElement("label", { onClick: function () { return !option.disabled && onChange(option.value); }, htmlFor: inputId }, option.label)));
        var _a;
    })));
};
export default FormInputDecorator(RadioInput);
//# sourceMappingURL=RadioInput.js.map