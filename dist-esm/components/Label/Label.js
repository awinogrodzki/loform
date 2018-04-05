import * as React from 'react';
import * as classNames from 'classnames';
var styles = require('./Label.css');
var Label = function (_a) {
    var className = _a.className, htmlFor = _a.htmlFor, _b = _a.required, required = _b === void 0 ? false : _b, children = _a.children;
    return (React.createElement("label", { className: classNames(styles.container, className, (_c = {}, _c[styles.isRequired] = required, _c)), htmlFor: htmlFor }, children));
    var _c;
};
export default Label;
//# sourceMappingURL=Label.js.map