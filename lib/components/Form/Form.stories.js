"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("@storybook/react");
var addon_actions_1 = require("@storybook/addon-actions");
var components_1 = require("../../components");
var __1 = require("../..");
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
        return (React.createElement("button", { onClick: function () { return _this.setState({ show: !_this.state.show }); } }, "I have pin"));
    };
    return Toggle;
}(React.Component));
react_1.storiesOf('Form', module)
    .add('default', function () { return (React.createElement(components_1.Form, { onSubmit: addon_actions_1.action('onSubmit'), onError: addon_actions_1.action('onError') }, function (_a) {
    var submit = _a.submit;
    return (React.createElement(React.Fragment, null,
        React.createElement(components_1.TextInput, { id: "firstName", name: "firstName", key: "firstName", label: "First name", required: true }),
        React.createElement(components_1.TextInput, { name: "lastName", key: "lastName", label: "Last name", required: true }),
        React.createElement(components_1.PasswordInput, { name: "password", key: "password", label: "Password", required: true }),
        React.createElement(components_1.SelectInput, { name: "country", key: "country", label: "Country", required: true, options: [
                { value: '', label: 'Select country' },
                { value: 'PL', label: 'Polska' },
                { value: 'EN', label: 'England' },
            ] }),
        React.createElement(components_1.RadioInput, { name: "language", key: "language", label: "Language", required: true, options: [
                { value: 'JP', label: 'jp' },
                { value: 'PL', label: 'pl', disabled: true },
                { value: 'EN', label: 'en' },
            ] }),
        React.createElement("button", { onClick: function () { return submit(); } }, "Submit")));
})); })
    .add('with toggle', function () { return (React.createElement(components_1.Form, { onSubmit: addon_actions_1.action('onSubmit'), onError: addon_actions_1.action('onError') }, function (_a) {
    var submit = _a.submit;
    return (React.createElement(React.Fragment, null,
        React.createElement(components_1.TextInput, { name: "username", placeholder: "Enter username", required: true, requiredMessage: "Username is required." }),
        React.createElement(Toggle, null,
            React.createElement(components_1.TextInput, { name: "pin", placeholder: "Pin code", required: true })),
        React.createElement(components_1.PasswordInput, { name: "password", placeholder: "Enter password", required: true }),
        React.createElement("button", { onClick: function () { return submit(); } }, "Login")));
})); })
    .add('login form', function () { return (React.createElement(components_1.Form, { onSubmit: addon_actions_1.action('onSubmit'), onError: addon_actions_1.action('onError') }, function (_a) {
    var submit = _a.submit;
    return (React.createElement(React.Fragment, null,
        React.createElement(components_1.TextInput, { name: "email", placeholder: "Enter email address", required: true, requiredMessage: "Email is required.", validators: [__1.emailValidator('Email address is incorrect.')] }),
        React.createElement(components_1.PasswordInput, { name: "password", placeholder: "Enter password", required: true }),
        React.createElement("button", { onClick: function () { return submit(); } }, "Login")));
})); });
//# sourceMappingURL=Form.stories.js.map