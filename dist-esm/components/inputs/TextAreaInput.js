import * as React from 'react';
import { FormInputDecorator } from '../../components';
export var TextAreaInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, value = _a.value;
    return (React.createElement("textarea", { id: id, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, value: value }));
};
export default FormInputDecorator(TextAreaInput);
//# sourceMappingURL=TextAreaInput.js.map