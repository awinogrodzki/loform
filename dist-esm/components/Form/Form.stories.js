var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TextInput, PasswordInput, SelectInput, RadioInput, Form, } from '../../components';
var Toggle = /** @class */ (function (_super) {
    __extends(Toggle, _super);
    function Toggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            show: true,
        };
        return _this;
    }
    Toggle.prototype.render = function () {
        var _this = this;
        if (this.state.show) {
            return (React.createElement("div", null,
                React.createElement("button", { onClick: function () { return _this.setState({ show: !_this.state.show }); } }, "I don't have pin"),
                this.props.children));
        }
        return React.createElement("button", { onClick: function () { return _this.setState({ show: !_this.state.show }); } }, "I have pin");
    };
    return Toggle;
}(React.Component));
storiesOf('Form', module)
    .add('default', function () { return (React.createElement(Form, { onSubmit: action('onSubmit') }, function (_a) {
    var inputProps = _a.inputProps, submit = _a.submit;
    return React.createElement(React.Fragment, null,
        React.createElement(TextInput, __assign({}, inputProps, { id: "firstName", name: "firstName", key: "firstName", label: "First name", required: true })),
        React.createElement(TextInput, __assign({}, inputProps, { name: "lastName", key: "lastName", label: "Last name", required: true })),
        React.createElement(PasswordInput, __assign({}, inputProps, { name: "password", key: "password", label: "Password", required: true })),
        React.createElement(SelectInput, __assign({}, inputProps, { name: "country", key: "country", label: "Country", required: true, options: [
                { value: '', label: 'Select country' },
                { value: 'PL', label: 'Polska' },
                { value: 'EN', label: 'England' },
            ] })),
        React.createElement(RadioInput, __assign({}, inputProps, { name: "language", key: "language", label: "Language", required: true, options: [
                { value: 'JP', label: 'jp' },
                { value: 'PL', label: 'pl', disabled: true },
                { value: 'EN', label: 'en' },
            ] })),
        React.createElement("button", { onClick: function () { return submit(); } }, "Submit"));
})); })
    .add('with toggle', function () { return (React.createElement(Form, { onSubmit: action('onSubmit') }, function (_a) {
    var inputProps = _a.inputProps, submit = _a.submit;
    return React.createElement(React.Fragment, null,
        React.createElement(TextInput, __assign({}, inputProps, { name: "username", placeholder: "Enter username", required: true, requiredMessage: "Username is required." })),
        React.createElement(Toggle, null,
            React.createElement(TextInput, __assign({}, inputProps, { name: "pin", placeholder: "Pin code", required: true }))),
        React.createElement(PasswordInput, __assign({}, inputProps, { name: "password", placeholder: "Enter password", required: true })),
        React.createElement("button", { onClick: function () { return submit(); } }, "Login"));
})); });
//# sourceMappingURL=Form.stories.js.map