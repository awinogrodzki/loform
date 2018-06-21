"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emailValidator = function (message) { return ({
    errorMessage: message,
    validate: function (value, formValues) {
        if (!value) {
            return true;
        }
        // tslint:disable-next-line
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value);
    },
}); };
exports.default = emailValidator;
//# sourceMappingURL=emailValidator.js.map