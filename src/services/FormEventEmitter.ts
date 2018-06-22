import * as EventEmitter from 'events';

export interface FormEventEmitterOptions {
  maxListeners?: number;
}

export enum FormEvent {
  Update = 'update',
  Submit = 'submit',
}

class FormEventEmitter {
  private emitter: EventEmitter = new EventEmitter();

  constructor({
    maxListeners = 100,
  }: FormEventEmitterOptions = {}) {
    this.emitter.setMaxListeners(maxListeners);
  }

  addListener(event: FormEvent, callback: () => any) {
    this.emitter.addListener(event, callback);
  }

  removeListener(event: FormEvent, callback: () => any) {
    this.emitter.removeListener(event, callback);
  }

  update() {
    this.emitter.emit(FormEvent.Update);
  }

  submit() {
    this.emitter.emit(FormEvent.Submit);
  }
}

export default FormEventEmitter;
