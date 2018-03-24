export interface FormEventEmitterOptions {
    maxListeners?: number;
}
declare class FormEventEmitter {
    private emitter;
    private static submitEvent;
    private static updateEvent;
    constructor({maxListeners}?: FormEventEmitterOptions);
    addSubmitListener(callback: () => any): void;
    removeSubmitListener(callback: () => any): void;
    addUpdateListener(callback: () => any): void;
    removeUpdateListener(callback: () => any): void;
    triggerUpdate(): void;
    triggerSubmit(): void;
}
export default FormEventEmitter;
