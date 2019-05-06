import { InputDescriptor } from '../types';
export interface FormEventEmitterOptions {
    maxListeners?: number;
}
export declare enum FormEvent {
    Update = "update",
    Submit = "submit",
    Blur = "blur",
    Clear = "clear"
}
declare class FormEventEmitter {
    private emitter;
    constructor({ maxListeners }?: FormEventEmitterOptions);
    addListener(event: FormEvent, callback: (...args: any[]) => any): void;
    removeListener(event: FormEvent, callback: (...args: any[]) => any): void;
    update(descriptor: InputDescriptor): void;
    blur(descriptor: InputDescriptor): void;
    submit(): void;
    clear(): void;
}
export default FormEventEmitter;
