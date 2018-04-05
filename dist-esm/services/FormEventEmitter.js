import * as EventEmitter from 'events';
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
export default FormEventEmitter;
//# sourceMappingURL=FormEventEmitter.js.map