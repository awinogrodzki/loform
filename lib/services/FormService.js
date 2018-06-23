"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var mergeArrays = function (objValue, srcValue) {
    if (!objValue) {
        return;
    }
    if (utils_1.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
};
var FormService = /** @class */ (function () {
    function FormService() {
        this.inputs = new Map();
    }
    FormService.prototype.getInput = function (id) {
        return this.inputs.get(id);
    };
    FormService.prototype.registerInput = function (input) {
        this.inputs.set(input.id, input);
    };
    FormService.prototype.updateInput = function (input) {
        this.inputs.set(input.id, input);
    };
    FormService.prototype.unregisterInputById = function (id) {
        this.inputs.delete(id);
    };
    FormService.prototype.getInputs = function () {
        return this.inputs;
    };
    FormService.prototype.validateInputs = function () {
        var _this = this;
        var isValid = true;
        this.inputs.forEach(function (input) {
            var errors = _this.getErrorsFromInput(input);
            if (errors.length) {
                isValid = false;
            }
        });
        return isValid;
    };
    FormService.prototype.getErrorsFromInput = function (_a) {
        var _this = this;
        var label = _a.label, name = _a.name, value = _a.value, required = _a.required, _b = _a.requiredMessage, requiredMessage = _b === void 0 ? null : _b, _c = _a.validators, validators = _c === void 0 ? [] : _c;
        var errors = [];
        if (required && !value) {
            errors = [requiredMessage || "Input " + (label || name) + " is required"];
        }
        validators.forEach(function (validator) {
            if (!validator.validate(value, _this.getValuesFromInputs())) {
                errors = errors.concat([validator.errorMessage]);
            }
        });
        return errors;
    };
    FormService.prototype.getErrors = function () {
        var _this = this;
        var errors = {};
        this.inputs.forEach(function (input) {
            var inputErrors = _this.getErrorsFromInput(input);
            if (inputErrors.length > 0) {
                var rootName = input.name;
                try {
                    rootName = _this.getInputRootName(input.name);
                }
                catch (e) { }
                errors[rootName] = (errors[rootName] || []).concat(inputErrors);
            }
        });
        return errors;
    };
    FormService.prototype.getValuesFromInputs = function () {
        var _this = this;
        var values = {};
        this.inputs.forEach(function (input) {
            values = utils_1.mergeWith(values, _this.getInputValue(input), mergeArrays);
        });
        return values;
    };
    FormService.prototype.getInputValue = function (input) {
        var _a, _b;
        var regex = /\[(.*?)\]/g;
        var match = input.name.match(regex);
        if (!match || match.length === 0) {
            return _a = {}, _a[input.name] = input.value, _a;
        }
        var rootName = this.getInputRootName(input.name);
        var value = (_b = {},
            _b[rootName] = this.getValueByMatch(match, input, match.length - 1, null),
            _b);
        return value;
    };
    FormService.prototype.getInputRootName = function (name) {
        var regex = /^(.+?)\[/;
        var match = regex.exec(name);
        if (!match) {
            throw new Error('Input name needs a key in front of array or object');
        }
        return match[1];
    };
    FormService.prototype.getValueByMatch = function (match, input, index, currentValue) {
        var _a, _b;
        if (index < 0) {
            return currentValue;
        }
        var regex = /\[(.*?)\]/;
        var matchString = match[index];
        var isLastKey = match.length - 1 === index;
        var keyMatch = regex.exec(matchString);
        var key = (keyMatch && keyMatch[1]) || null;
        var nextIndex = index - 1;
        if (isLastKey && key) {
            return this.getValueByMatch(match, input, nextIndex, (_a = {},
                _a[key] = input.value,
                _a));
        }
        if (isLastKey && !key) {
            return this.getValueByMatch(match, input, nextIndex, [input.value]);
        }
        if (key) {
            return this.getValueByMatch(match, input, nextIndex, (_b = {},
                _b[key] = currentValue,
                _b));
        }
        return this.getValueByMatch(match, input, nextIndex, [currentValue]);
    };
    return FormService;
}());
exports.default = FormService;
//# sourceMappingURL=FormService.js.map