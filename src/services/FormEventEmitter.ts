import * as EventEmitter from 'events';
import { InputDescriptor } from '../types';

export interface FormEventEmitterOptions {
  maxListeners?: number;
}

export enum FormEvent {
  Update = 'update',
  Submit = 'submit',
}

class FormEventEmitter {
  private emitter: EventEmitter = new EventEmitter();

  constructor({ maxListeners = 100 }: FormEventEmitterOptions = {}) {
    this.emitter.setMaxListeners(maxListeners);
  }

  addListener(event: FormEvent, callback: (...args: any[]) => any) {
    this.emitter.addListener(event, callback);
  }

  removeListener(event: FormEvent, callback: (...args: any[]) => any) {
    this.emitter.removeListener(event, callback);
  }

  update(descriptor: InputDescriptor) {
    this.emitter.emit(FormEvent.Update, descriptor);
  }

  submit() {
    this.emitter.emit(FormEvent.Submit);
  }
}

export default FormEventEmitter;
