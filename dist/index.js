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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
var Form_1 = __webpack_require__(12);
exports.Form = Form_1.default;
var Label_1 = __webpack_require__(8);
exports.Label = Label_1.default;
var FormInput_1 = __webpack_require__(23);
exports.FormInput = FormInput_1.default;
exports.FormInputDecorator = FormInput_1.FormInputDecorator;
__export(__webpack_require__(26));


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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var FormEventEmitter_1 = __webpack_require__(4);
exports.FormEventEmitter = FormEventEmitter_1.default;
__export(__webpack_require__(4));
var FormService_1 = __webpack_require__(6);
exports.FormService = FormService_1.default;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = __webpack_require__(14);
var FormEvent;
(function (FormEvent) {
    FormEvent["Update"] = "update";
    FormEvent["Submit"] = "submit";
})(FormEvent = exports.FormEvent || (exports.FormEvent = {}));
var FormEventEmitter = /** @class */ (function () {
    function FormEventEmitter(_a) {
        var _b = (_a === void 0 ? {} : _a).maxListeners, maxListeners = _b === void 0 ? 100 : _b;
        this.emitter = new EventEmitter();
        this.emitter.setMaxListeners(maxListeners);
    }
    FormEventEmitter.prototype.addListener = function (event, callback) {
        this.emitter.addListener(event, callback);
    };
    FormEventEmitter.prototype.removeListener = function (event, callback) {
        this.emitter.removeListener(event, callback);
    };
    FormEventEmitter.prototype.update = function () {
        this.emitter.emit(FormEvent.Update);
    };
    FormEventEmitter.prototype.submit = function () {
        this.emitter.emit(FormEvent.Submit);
    };
    /**
     * @deprecated
     */
    FormEventEmitter.prototype.addSubmitListener = function (callback) {
        // tslint:disable-next-line
        console.warn('FormEventListener addSubmitListener() method is deprecated. Use addListener() method with FormEvent.Submit as the first argument.');
        this.addListener(FormEvent.Submit, callback);
    };
    /**
     * @deprecated
     */
    FormEventEmitter.prototype.addUpdateListener = function (callback) {
        // tslint:disable-next-line
        console.warn('FormEventListener addUpdateListener() method is deprecated. Use addListener() method with FormEvent.Update as the first argument.');
        this.addListener(FormEvent.Update, callback);
    };
    /**
     * @deprecated
     */
    FormEventEmitter.prototype.removeSubmitListener = function (callback) {
        // tslint:disable-next-line
        console.warn('FormEventListener removeSubmitListener() method is deprecated. Use removeListener() method with FormEvent.Submit as the first argument.');
        this.addListener(FormEvent.Submit, callback);
    };
    /**
     * @deprecated
     */
    FormEventEmitter.prototype.removeUpdateListener = function (callback) {
        // tslint:disable-next-line
        console.warn('FormEventListener removeUpdateListener() method is deprecated. Use removeListener() method with FormEvent.Update as the first argument.');
        this.addListener(FormEvent.Update, callback);
    };
    /**
     * @deprecated
     */
    FormEventEmitter.prototype.triggerUpdate = function () {
        // tslint:disable-next-line
        console.warn('FormEventEmitter triggerUpdate() method is deprecated. Use update() method instead.');
        this.update();
    };
    /**
     * @deprecated
     */
    FormEventEmitter.prototype.triggerSubmit = function () {
        // tslint:disable-next-line
        console.warn('FormEventEmitter triggerSubmit() method is deprecated. Use submit() method instead.');
        this.submit();
    };
    return FormEventEmitter;
}());
exports.default = FormEventEmitter;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(15);
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FormContext_1 = __webpack_require__(19);
exports.FormContext = FormContext_1.default;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Label_1 = __webpack_require__(21);
exports.default = Label_1.default;


/***/ }),
/* 9 */
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
var PropTypes = __webpack_require__(5);
var classNames = __webpack_require__(2);
var uuid = __webpack_require__(24);
var Label_1 = __webpack_require__(8);
var services_1 = __webpack_require__(3);
var context_1 = __webpack_require__(7);
var styles = __webpack_require__(25);
var FormInput = /** @class */ (function (_super) {
    __extends(FormInput, _super);
    function FormInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: _this.props.value || '',
            prevValueProp: _this.props.value,
            hasErrors: false,
            errors: [],
        };
        _this.id = props.id || uuid();
        _this.onInputChange = _this.onInputChange.bind(_this);
        _this.onFormSubmit = _this.onFormSubmit.bind(_this);
        return _this;
    }
    FormInput.getDerivedStateFromProps = function (props, state) {
        if (props.value === undefined) {
            return null;
        }
        if (props.value === state.prevValueProp) {
            return null;
        }
        return {
            value: props.value,
            prevValueProp: props.value,
        };
    };
    FormInput.prototype.getDescriptorFromProps = function (value) {
        return {
            value: value,
            id: this.id,
            label: this.props.label,
            name: this.props.name,
            required: this.props.required || false,
            requiredMessage: this.props.requiredMessage,
            validators: this.props.validators,
        };
    };
    FormInput.prototype.componentDidMount = function () {
        this.props.formService.registerInput(this.getDescriptorFromProps(this.state.value));
        this.props.formEventEmitter.addListener(services_1.FormEvent.Submit, this.onFormSubmit);
    };
    FormInput.prototype.componentWillUnmount = function () {
        this.props.formService.unregisterInputById(this.id);
        this.props.formEventEmitter.removeListener(services_1.FormEvent.Submit, this.onFormSubmit);
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
        this.props.formEventEmitter.update();
        this.validate(descriptor);
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };
    FormInput.prototype.renderErrors = function (errors) {
        var _this = this;
        return (React.createElement("div", { className: classNames(styles.errors, this.props.errorContainerClass) }, errors.map(function (error, index) { return (React.createElement("div", { title: error, key: index, className: classNames(styles.error, _this.props.errorClass) },
            React.createElement("span", null, error))); })));
    };
    FormInput.prototype.render = function () {
        var _a;
        var _b = this.props, notUsedId = _b.id, containerClass = _b.containerClass, inputContainerClass = _b.inputContainerClass, inputWrapperClass = _b.inputWrapperClass, errorContainerClass = _b.errorContainerClass, errorClass = _b.errorClass, formService = _b.formService, formEventEmitter = _b.formEventEmitter, className = _b.className, placeholder = _b.placeholder, name = _b.name, value = _b.value, disabled = _b.disabled, validators = _b.validators, required = _b.required, requiredMessage = _b.requiredMessage, label = _b.label, onChange = _b.onChange, children = _b.children, hasErrorsFromProps = _b.hasErrors, rest = __rest(_b, ["id", "containerClass", "inputContainerClass", "inputWrapperClass", "errorContainerClass", "errorClass", "formService", "formEventEmitter", "className", "placeholder", "name", "value", "disabled", "validators", "required", "requiredMessage", "label", "onChange", "children", "hasErrors"]);
        var hasErrors = hasErrorsFromProps !== undefined
            ? hasErrorsFromProps
            : this.state.hasErrors;
        return (React.createElement("div", { className: classNames(styles.container, containerClass) },
            React.createElement("div", { className: classNames(styles.inputContainer, inputContainerClass) },
                label && (React.createElement(Label_1.default, { htmlFor: this.id, className: styles.label, required: required }, label)),
                React.createElement("div", { className: classNames(styles.inputWrapper, inputWrapperClass) },
                    this.props.children(__assign({ name: name,
                        disabled: disabled,
                        placeholder: placeholder,
                        hasErrors: hasErrors, id: this.id, className: classNames(className, styles.input, (_a = {},
                            _a[styles.hasErrors] = hasErrors,
                            _a)), value: this.state.value, onChange: this.onInputChange }, rest)),
                    this.renderErrors(this.state.errors)))));
    };
    FormInput.defaultProps = {
        value: '',
        validators: [],
    };
    return FormInput;
}(React.Component));
exports.FormInput = FormInput;
exports.FormInputDecorator = function (Component) {
    var DecoratedInput = function (props) { return (React.createElement(context_1.FormContext.Consumer, null, function (_a) {
        var formService = _a.formService, formEventEmitter = _a.formEventEmitter;
        return (React.createElement(FormInput, __assign({ formService: formService, formEventEmitter: formEventEmitter }, props), function (inputProps) { return React.createElement(Component, __assign({}, inputProps)); }));
    })); };
    DecoratedInput.propTypes = {
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        value: PropTypes.string,
        onChange: PropTypes.func,
        hasErrors: PropTypes.bool,
        containerClass: PropTypes.string,
        inputContainerClass: PropTypes.string,
        inputWrapperClass: PropTypes.string,
        errorContainerClass: PropTypes.string,
        errorClass: PropTypes.string,
        validators: PropTypes.arrayOf(PropTypes.shape({
            errorMessage: PropTypes.string.isRequired,
            validate: PropTypes.func.isRequired,
        })),
        required: PropTypes.bool,
        requiredMessage: PropTypes.string,
    };
    return DecoratedInput;
};
exports.default = FormInput;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
__export(__webpack_require__(3));
__export(__webpack_require__(36));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Form_1 = __webpack_require__(13);
exports.default = Form_1.default;


/***/ }),
/* 13 */
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
var PropTypes = __webpack_require__(5);
var classNames = __webpack_require__(2);
var services_1 = __webpack_require__(3);
var context_1 = __webpack_require__(7);
var styles = __webpack_require__(20);
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.formEventEmitter = props.formEventEmitter
            ? props.formEventEmitter : (new services_1.FormEventEmitter());
        _this.formService = props.formService
            ? props.formService : (new services_1.FormService());
        _this.renderProps = {
            submit: _this.formEventEmitter.submit.bind(_this.formEventEmitter),
        };
        _this.onFormSubmit = _this.onFormSubmit.bind(_this);
        _this.onSubmitEvent = _this.onSubmitEvent.bind(_this);
        _this.formEventEmitter.addListener(services_1.FormEvent.Submit, _this.onSubmitEvent);
        return _this;
    }
    Form.prototype.componentWillUnmount = function () {
        this.formEventEmitter.removeListener(services_1.FormEvent.Submit, this.onSubmitEvent);
    };
    Form.prototype.submit = function () {
        var values = this.formService.getValuesFromInputs();
        var errors = this.formService.getErrors();
        var isValid = Object.keys(errors).length === 0;
        if (!isValid) {
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
        return (React.createElement("form", { onSubmit: this.onFormSubmit, className: classNames(styles.container, this.props.className) },
            React.createElement(context_1.FormContext.Provider, { value: {
                    formEventEmitter: this.formEventEmitter,
                    formService: this.formService,
                } }, this.props.children(this.renderProps))));
    };
    Form.propTypes = {
        className: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        onError: PropTypes.func,
        children: PropTypes.func.isRequired,
        formService: PropTypes.instanceOf(services_1.FormService),
        formEventEmitter: PropTypes.instanceOf(services_1.FormEventEmitter),
    };
    return Form;
}(React.Component));
exports.default = Form;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mergeWith_1 = __webpack_require__(16);
exports.mergeWith = mergeWith_1.default;
var isArray_1 = __webpack_require__(17);
exports.isArray = isArray_1.default;
var isObject_1 = __webpack_require__(18);
exports.isObject = isObject_1.default;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("lodash-es/mergeWith");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("lodash-es/isArray");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("lodash-es/isObject");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var FormService_1 = __webpack_require__(6);
var FormEventEmitter_1 = __webpack_require__(4);
var FormContext = React.createContext({
    formService: new FormService_1.default(),
    formEventEmitter: new FormEventEmitter_1.default(),
});
exports.default = FormContext;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"Form__container___2HdoZ"};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var classNames = __webpack_require__(2);
var styles = __webpack_require__(22);
var Label = function (_a) {
    var className = _a.className, htmlFor = _a.htmlFor, _b = _a.required, required = _b === void 0 ? false : _b, children = _a.children;
    var _c;
    return (React.createElement("label", { className: classNames(styles.container, className, (_c = {}, _c[styles.isRequired] = required, _c)), htmlFor: htmlFor }, children));
};
exports.default = Label;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"Label__container___17ngH","isRequired":"Label__isRequired___3UvHi"};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var FormInput_1 = __webpack_require__(9);
exports.default = FormInput_1.default;
__export(__webpack_require__(9));


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"errors":"FormInput__errors___3rzp-","error":"FormInput__error___J8Z5G","container":"FormInput__container___1Mxjs","inputContainer":"FormInput__inputContainer___ek65X","inputWrapper":"FormInput__inputWrapper___2EtKH","input":"FormInput__input___eComQ","hasErrors":"FormInput__hasErrors___1z0sr","label":"FormInput__label___3uEO7"};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TextInput_1 = __webpack_require__(27);
exports.TextInput = TextInput_1.default;
var PasswordInput_1 = __webpack_require__(28);
exports.PasswordInput = PasswordInput_1.default;
var SelectInput_1 = __webpack_require__(29);
exports.SelectInput = SelectInput_1.default;
var TextAreaInput_1 = __webpack_require__(32);
exports.TextAreaInput = TextAreaInput_1.default;
var RadioInput_1 = __webpack_require__(33);
exports.RadioInput = RadioInput_1.default;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var components_1 = __webpack_require__(1);
exports.TextInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, disabled = _a.disabled, placeholder = _a.placeholder, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, value = _a.value;
    return (React.createElement("input", { id: id, disabled: disabled, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, type: "text", value: value, placeholder: placeholder }));
};
exports.default = components_1.FormInputDecorator(exports.TextInput);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var components_1 = __webpack_require__(1);
exports.PasswordInput = function (_a) {
    var id = _a.id, disabled = _a.disabled, className = _a.className, name = _a.name, placeholder = _a.placeholder, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, _c = _a.value, value = _c === void 0 ? undefined : _c;
    return (React.createElement("input", { id: id, disabled: disabled, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, placeholder: placeholder, type: "password", value: value }));
};
exports.default = components_1.FormInputDecorator(exports.PasswordInput);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SelectInput_1 = __webpack_require__(30);
exports.default = SelectInput_1.default;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var classNames = __webpack_require__(2);
var components_1 = __webpack_require__(1);
var styles = __webpack_require__(31);
var SelectInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, value = _a.value, disabled = _a.disabled, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, _c = _a.options, options = _c === void 0 ? [] : _c;
    return (React.createElement("select", { id: id, name: name, disabled: disabled, className: classNames(className, styles.input), value: value, onChange: function (e) { return onChange(e.target.value); } }, options.map(function (option) { return (React.createElement("option", { key: option.value, value: option.value }, option.label)); })));
};
exports.default = components_1.FormInputDecorator(SelectInput);


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"input":"SelectInput__input___1rkJ2"};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var components_1 = __webpack_require__(1);
exports.TextAreaInput = function (_a) {
    var id = _a.id, className = _a.className, name = _a.name, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, value = _a.value, disabled = _a.disabled;
    return (React.createElement("textarea", { id: id, onChange: function (e) { return onChange(e.target.value); }, className: className, name: name, value: value, disabled: disabled }));
};
exports.default = components_1.FormInputDecorator(exports.TextAreaInput);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RadioInput_1 = __webpack_require__(34);
exports.default = RadioInput_1.default;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var classNames = __webpack_require__(2);
var components_1 = __webpack_require__(1);
var styles = __webpack_require__(35);
var RadioInput = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, className = _a.className, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b, hasErrors = _a.hasErrors, _c = _a.options, options = _c === void 0 ? [] : _c;
    return (React.createElement("div", null, options.map(function (option, index) {
        var _a;
        var inputId = id + "_" + index;
        var inputName = "" + name;
        var checked = value !== undefined && value === option.value;
        return (React.createElement("div", { className: classNames(styles.container, className, (_a = {}, _a[styles.hasErrors] = hasErrors, _a)), key: inputId },
            React.createElement("input", { id: inputId, disabled: option.disabled, type: "radio", name: inputName, className: styles.input, value: option.value, checked: checked, onClick: function () { return !option.disabled && onChange(option.value); } }),
            React.createElement("label", { onClick: function () { return !option.disabled && onChange(option.value); }, htmlFor: inputId }, option.label)));
    })));
};
exports.default = components_1.FormInputDecorator(RadioInput);


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"RadioInput__container___13O58","hasErrors":"RadioInput__hasErrors___2cgEp","input":"RadioInput__input___3TDud"};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var emailValidator_1 = __webpack_require__(37);
exports.emailValidator = emailValidator_1.default;
var phoneNumberValidator_1 = __webpack_require__(38);
exports.phoneNumberValidator = phoneNumberValidator_1.default;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 38 */
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