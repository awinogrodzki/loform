import * as React from 'react';
import { FormInputDecorator } from '../../components';
export var PasswordInput = function (_a) {
    var id = _a.id, disabled = _a.disabled, className = _a.className, name = _a.name, placeholder = _a.placeholder, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, _c = _a.value, value = _c === void 0 ? undefined : _c;
    return (React.createElement("input", { id: id, disabled: disabled, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, placeholder: placeholder, type: "password", value: value }));
};
export default FormInputDecorator(PasswordInput);
//# sourceMappingURL=PasswordInput.js.map