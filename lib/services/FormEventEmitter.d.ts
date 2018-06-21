export interface FormEventEmitterOptions {
    maxListeners?: number;
}
export declare enum FormEvent {
    Update = "update",
    Submit = "submit"
}
declare class FormEventEmitter {
    private emitter;
    constructor({ maxListeners, }?: FormEventEmitterOptions);
    addListener(event: FormEvent, callback: () => any): void;
    removeListener(event: FormEvent, callback: () => any): void;
    update(): void;
    submit(): void;
    /**
     * @deprecated
     */
    addSubmitListener(callback: () => any): void;
    /**
     * @deprecated
     */
    addUpdateListener(callback: () => any): void;
    /**
     * @deprecated
     */
    removeSubmitListener(callback: () => any): void;
    /**
     * @deprecated
     */
    removeUpdateListener(callback: () => any): void;
    /**
     * @deprecated
     */
    triggerUpdate(): void;
    /**
     * @deprecated
     */
    triggerSubmit(): void;
}
export default FormEventEmitter;
