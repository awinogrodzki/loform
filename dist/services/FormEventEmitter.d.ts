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
}
export default FormEventEmitter;
