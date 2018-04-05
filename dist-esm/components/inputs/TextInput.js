import * as React from 'react';
import { FormInputDecorator } from '../../components';
export var TextInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, disabled = _a.disabled, placeholder = _a.placeholder, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, value = _a.value;
    return (React.createElement("input", { id: id, disabled: disabled, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, type: "text", value: value, placeholder: placeholder }));
};
export default FormInputDecorator(TextInput);
//# sourceMappingURL=TextInput.js.map