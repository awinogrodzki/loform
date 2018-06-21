"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = require("events");
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
//# sourceMappingURL=FormEventEmitter.js.map