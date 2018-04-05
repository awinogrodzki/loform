import * as React from 'react';
import * as classNames from 'classnames';
import { FormInputDecorator } from '../../../components';
var styles = require('./SelectInput.css');
var SelectInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, value = _a.value, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, _c = _a.options, options = _c === void 0 ? [] : _c;
    return (React.createElement("select", { id: id, name: name, className: classNames(className, styles.input), value: value, onChange: function (e) { return onChange(e.target.value); } }, options.map(function (option) { return (React.createElement("option", { key: option.value, value: option.value }, option.label)); })));
};
export default FormInputDecorator(SelectInput);
//# sourceMappingURL=SelectInput.js.map