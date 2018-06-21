"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FormService_1 = require("../services/FormService");
var FormEventEmitter_1 = require("../services/FormEventEmitter");
var FormContext = React.createContext({
    formService: new FormService_1.default(),
    formEventEmitter: new FormEventEmitter_1.default(),
});
exports.default = FormContext;
//# sourceMappingURL=FormContext.js.map