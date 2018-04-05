var phoneNumberValidator = function (message) { return ({
    errorMessage: message,
    validate: function (value) {
        if (!value) {
            return true;
        }
        // tslint:disable-next-line
        var regex = /^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\/\s.]|\d)+$/;
        return regex.test(value);
    },
}); };
export default phoneNumberValidator;
//# sourceMappingURL=phoneNumberValidator.js.map