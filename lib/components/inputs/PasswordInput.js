"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var components_1 = require("../../components");
exports.PasswordInput = function (_a) {
    var id = _a.id, disabled = _a.disabled, className = _a.className, name = _a.name, placeholder = _a.placeholder, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, _c = _a.value, value = _c === void 0 ? undefined : _c;
    return (React.createElement("input", { id: id, disabled: disabled, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, placeholder: placeholder, type: "password", value: value }));
};
exports.default = components_1.FormInputDecorator(exports.PasswordInput);
//# sourceMappingURL=PasswordInput.js.map