(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Form_1 = __webpack_require__(9);
exports.Form = Form_1.default;
var Label_1 = __webpack_require__(5);
exports.Label = Label_1.default;
var FormInput_1 = __webpack_require__(17);
exports.FormInput = FormInput_1.default;
exports.FormInputDecorator = FormInput_1.FormInputDecorator;
__export(__webpack_require__(20));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(11);
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
        var label = _a.label, name = _a.name, value = _a.value, required = _a.required, _b = _a.requiredMessage, requiredMessage = _b === void 0 ? null : _b, _c = _a.validators, validators = _c === void 0 ? [] : _c;
        var errors = [];
        if (required && !value) {
            errors = [requiredMessage || "Input " + (label || name) + " is required"];
        }
        validators.forEach(function (validator) {
            if (!validator.validate(value, {})) {
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
                errors[rootName] = inputErrors;
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
        var _a, _b;
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
        if (index < 0) {
            return currentValue;
        }
        var regex = /\[(.*?)\]/;
        var matchString = match[index];
        var isLastKey = match.length - 1 === index;
        var keyMatch = regex.exec(matchString);
        var key = keyMatch && keyMatch[1] || null;
        var nextIndex = index - 1;
        if (isLastKey && key) {
            return this.getValueByMatch(match, input, nextIndex, (_a = {}, _a[key] = input.value, _a));
        }
        if (isLastKey && !key) {
            return this.getValueByMatch(match, input, nextIndex, [input.value]);
        }
        if (key) {
            return this.getValueByMatch(match, input, nextIndex, (_b = {}, _b[key] = currentValue, _b));
        }
        return this.getValueByMatch(match, input, nextIndex, [currentValue]);
        var _a, _b;
    };
    return FormService;
}());
exports.default = FormService;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = __webpack_require__(13);
var FormEventEmitter = /** @class */ (function () {
    function FormEventEmitter(_a) {
        var _b = (_a === void 0 ? {} : _a).maxListeners, maxListeners = _b === void 0 ? 100 : _b;
        this.emitter = new EventEmitter();
        this.emitter.setMaxListeners(maxListeners);
    }
    FormEventEmitter.prototype.addSubmitListener = function (callback) {
        this.emitter.addListener(FormEventEmitter.submitEvent, callback);
    };
    FormEventEmitter.prototype.removeSubmitListener = function (callback) {
        this.emitter.removeListener(FormEventEmitter.submitEvent, callback);
    };
    FormEventEmitter.prototype.addUpdateListener = function (callback) {
        this.emitter.addListener(FormEventEmitter.updateEvent, callback);
    };
    FormEventEmitter.prototype.removeUpdateListener = function (callback) {
        this.emitter.removeListener(FormEventEmitter.updateEvent, callback);
    };
    FormEventEmitter.prototype.triggerUpdate = function () {
        this.emitter.emit(FormEventEmitter.updateEvent);
    };
    FormEventEmitter.prototype.triggerSubmit = function () {
        this.emitter.emit(FormEventEmitter.submitEvent);
    };
    FormEventEmitter.submitEvent = 'submit';
    FormEventEmitter.updateEvent = 'update';
    return FormEventEmitter;
}());
exports.default = FormEventEmitter;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Label_1 = __webpack_require__(15);
exports.default = Label_1.default;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var classNames = __webpack_require__(2);
var uuid = __webpack_require__(18);
var Label_1 = __webpack_require__(5);
var styles = __webpack_require__(19);
var FormInput = /** @class */ (function (_super) {
    __extends(FormInput, _super);
    function FormInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: _this.props.value,
            hasErrors: false,
            errors: [],
        };
        _this.id = props.id || uuid();
        _this.onInputChange = _this.onInputChange.bind(_this);
        _this.onFormSubmit = _this.onFormSubmit.bind(_this);
        return _this;
    }
    FormInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.value !== undefined && this.props.value !== nextProps.value) {
            this.setState({ value: nextProps.value });
        }
    };
    FormInput.prototype.getDescriptorFromProps = function (value) {
        return {
            value: value,
            id: this.id,
            label: this.props.label,
            name: this.props.name,
            required: this.props.required,
            requiredMessage: this.props.requiredMessage,
            validators: this.props.validators,
        };
    };
    FormInput.prototype.componentDidMount = function () {
        this.props.formService.registerInput(this.getDescriptorFromProps(this.state.value));
        this.props.formEventEmitter.addSubmitListener(this.onFormSubmit);
    };
    FormInput.prototype.componentWillUnmount = function () {
        this.props.formService.unregisterInputById(this.id);
        this.props.formEventEmitter.removeSubmitListener(this.onFormSubmit);
    };
    FormInput.prototype.onFormSubmit = function () {
        this.validate(this.getDescriptorFromProps(this.state.value));
    };
    FormInput.prototype.validate = function (descriptor) {
        var errors = this.props.formService.getErrorsFromInput(descriptor);
        var hasErrors = !!errors.length;
        this.setState({
            errors: errors,
            hasErrors: hasErrors,
            value: descriptor.value,
        });
        return !hasErrors;
    };
    FormInput.prototype.onInputChange = function (value) {
        var descriptor = this.getDescriptorFromProps(value);
        this.props.formService.updateInput(descriptor);
        this.props.formEventEmitter.triggerUpdate();
        this.validate(descriptor);
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };
    FormInput.prototype.renderErrors = function (errors) {
        return (React.createElement("div", { className: styles.errors }, errors.map(function (error, index) { return (React.createElement("div", { title: error, key: index, className: styles.error },
            React.createElement("span", null, error))); })));
    };
    FormInput.prototype.render = function () {
        var _a = this.props, id = _a.id, containerClass = _a.containerClass, formService = _a.formService, formEventEmitter = _a.formEventEmitter, className = _a.className, placeholder = _a.placeholder, name = _a.name, value = _a.value, disabled = _a.disabled, validators = _a.validators, required = _a.required, requiredMessage = _a.requiredMessage, label = _a.label, onChange = _a.onChange, children = _a.children, rest = __rest(_a, ["id", "containerClass", "formService", "formEventEmitter", "className", "placeholder", "name", "value", "disabled", "validators", "required", "requiredMessage", "label", "onChange", "children"]);
        return (React.createElement("div", { className: classNames(styles.container, containerClass) },
            React.createElement("div", { className: styles.inputContainer },
                label &&
                    React.createElement(Label_1.default, { htmlFor: id, className: styles.label, required: required }, label),
                React.createElement("div", { className: styles.inputWrapper },
                    this.renderErrors(this.state.errors),
                    this.props.children(__assign({ id: id,
                        name: name,
                        disabled: disabled,
                        placeholder: placeholder, className: classNames(className, styles.input, (_b = {}, _b[styles.hasErrors] = this.state.hasErrors, _b)), value: this.state.value, onChange: this.onInputChange }, rest))))));
        var _b;
    };
    FormInput.defaultProps = {
        value: '',
        validators: [],
    };
    return FormInput;
}(React.Component));
exports.FormInput = FormInput;
exports.FormInputDecorator = function (Component) {
    return function (props) { return (React.createElement(FormInput, __assign({}, props), function (inputProps) { return React.createElement(Component, __assign({}, inputProps)); })); };
};
exports.default = FormInput;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
__export(__webpack_require__(30));
__export(__webpack_require__(31));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Form_1 = __webpack_require__(10);
exports.default = Form_1.default;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var classNames = __webpack_require__(2);
var FormService_1 = __webpack_require__(3);
var FormEventEmitter_1 = __webpack_require__(4);
var styles = __webpack_require__(14);
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.formEventEmitter = props.formEventEmitter
            ? props.formEventEmitter : (new FormEventEmitter_1.default());
        _this.formService = props.formService
            ? props.formService : (new FormService_1.default());
        _this.renderProps = {
            inputProps: {
                containerClass: styles.input,
                formService: _this.formService,
                formEventEmitter: _this.formEventEmitter,
            },
            submit: _this.formEventEmitter.triggerSubmit.bind(_this.formEventEmitter),
        };
        _this.onFormSubmit = _this.onFormSubmit.bind(_this);
        _this.onSubmitEvent = _this.onSubmitEvent.bind(_this);
        _this.formEventEmitter.addSubmitListener(_this.onSubmitEvent);
        return _this;
    }
    Form.prototype.componentWillUnmount = function () {
        this.formEventEmitter.removeSubmitListener(this.onSubmitEvent);
    };
    Form.prototype.submit = function () {
        var values = this.formService.getValuesFromInputs();
        if (!this.formService.validateInputs()) {
            var errors = this.formService.getErrors();
            this.props.onError && this.props.onError(errors);
            return;
        }
        this.props.onSubmit(values);
    };
    Form.prototype.onSubmitEvent = function () {
        this.submit();
    };
    Form.prototype.onFormSubmit = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    Form.prototype.render = function () {
        return (React.createElement("form", { onSubmit: this.onFormSubmit, className: classNames(styles.container, this.props.className) }, this.props.children(this.renderProps)));
    };
    return Form;
}(React.Component));
exports.default = Form;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __webpack_require__(12);
exports.mergeWith = lodash_1.mergeWith;
exports.isArray = lodash_1.isArray;
exports.isObject = lodash_1.isObject;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"Form__container___2HdoZ","input":"Form__input___1Gcer"};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var classNames = __webpack_require__(2);
var styles = __webpack_require__(16);
var Label = function (_a) {
    var className = _a.className, htmlFor = _a.htmlFor, _b = _a.required, required = _b === void 0 ? false : _b, children = _a.children;
    return (React.createElement("label", { className: classNames(styles.container, className, (_c = {}, _c[styles.isRequired] = required, _c)), htmlFor: htmlFor }, children));
    var _c;
};
exports.default = Label;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"Label__container___17ngH","isRequired":"Label__isRequired___3UvHi"};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var FormInput_1 = __webpack_require__(6);
exports.default = FormInput_1.default;
__export(__webpack_require__(6));


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"errors":"FormInput__errors___3rzp-","error":"FormInput__error___J8Z5G","container":"FormInput__container___1Mxjs","inputContainer":"FormInput__inputContainer___ek65X","inputWrapper":"FormInput__inputWrapper___2EtKH","input":"FormInput__input___eComQ","hasErrors":"FormInput__hasErrors___1z0sr","label":"FormInput__label___3uEO7"};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TextInput_1 = __webpack_require__(21);
exports.TextInput = TextInput_1.default;
var PasswordInput_1 = __webpack_require__(22);
exports.PasswordInput = PasswordInput_1.default;
var SelectInput_1 = __webpack_require__(23);
exports.SelectInput = SelectInput_1.default;
var TextAreaInput_1 = __webpack_require__(26);
exports.TextAreaInput = TextAreaInput_1.default;
var RadioInput_1 = __webpack_require__(27);
exports.RadioInput = RadioInput_1.default;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var components_1 = __webpack_require__(1);
exports.TextInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, placeholder = _a.placeholder, onChange = _a.onChange, _b = _a.value, value = _b === void 0 ? undefined : _b;
    return (React.createElement("input", { id: id, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, type: "text", value: value, placeholder: placeholder }));
};
exports.default = components_1.FormInputDecorator(exports.TextInput);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var components_1 = __webpack_require__(1);
exports.PasswordInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, placeholder = _a.placeholder, onChange = _a.onChange, _b = _a.value, value = _b === void 0 ? undefined : _b;
    return (React.createElement("input", { id: id, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, placeholder: placeholder, type: "password", value: value }));
};
exports.default = components_1.FormInputDecorator(exports.PasswordInput);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SelectInput_1 = __webpack_require__(24);
exports.default = SelectInput_1.default;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var classNames = __webpack_require__(2);
var components_1 = __webpack_require__(1);
var styles = __webpack_require__(25);
var SelectInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, value = _a.value, onChange = _a.onChange, _b = _a.options, options = _b === void 0 ? [] : _b;
    return (React.createElement("select", { id: id, name: name, className: classNames(className, styles.input), value: value, onChange: function (e) { return onChange(e.target.value); } }, options.map(function (option) { return (React.createElement("option", { key: option.value, value: option.value }, option.label)); })));
};
exports.default = components_1.FormInputDecorator(SelectInput);


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"input":"SelectInput__input___1rkJ2"};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var components_1 = __webpack_require__(1);
exports.TextAreaInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, onChange = _a.onChange, _b = _a.value, value = _b === void 0 ? undefined : _b;
    return (React.createElement("textarea", { id: id, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, value: value }));
};
exports.default = components_1.FormInputDecorator(exports.TextAreaInput);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RadioInput_1 = __webpack_require__(28);
exports.default = RadioInput_1.default;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var components_1 = __webpack_require__(1);
var styles = __webpack_require__(29);
var RadioInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, onChange = _a.onChange, options = _a.options;
    return (React.createElement("div", null, options.map(function (option, index) {
        var inputId = id + "_" + index;
        var inputName = "" + name;
        var checked = value !== undefined && value === option.value;
        return (React.createElement("div", { className: styles.container, key: inputId },
            React.createElement("input", { id: inputId, disabled: option.disabled, type: "radio", className: styles.input, name: inputName, value: option.value, checked: checked, onClick: function () { return !option.disabled && onChange(option.value); } }),
            React.createElement("label", { onClick: function () { return !option.disabled && onChange(option.value); }, htmlFor: inputId }, option.label)));
    })));
};
exports.default = components_1.FormInputDecorator(RadioInput);


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"RadioInput__container___13O58","input":"RadioInput__input___3TDud"};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FormEventEmitter_1 = __webpack_require__(4);
exports.FormEventEmitter = FormEventEmitter_1.default;
var FormService_1 = __webpack_require__(3);
exports.FormService = FormService_1.default;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var emailValidator_1 = __webpack_require__(32);
exports.emailValidator = emailValidator_1.default;
var phoneNumberValidator_1 = __webpack_require__(33);
exports.phoneNumberValidator = phoneNumberValidator_1.default;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var emailValidator = function (message) { return ({
    errorMessage: message,
    validate: function (value) {
        if (!value) {
            return true;
        }
        // tslint:disable-next-line
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value);
    },
}); };
exports.default = emailValidator;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = phoneNumberValidator;


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map