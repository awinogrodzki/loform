import * as EventEmitter from 'events';

import {
  FormValuesInterface,
  InputDescriptorInterface,
  FormValueType,
} from '../types';

export interface FormEventEmitterOptions {
  maxListeners?: number;
}

class FormEventEmitter {
  private emitter: EventEmitter = new EventEmitter();
  private static submitEvent = 'submit';
  private static updateEvent = 'update';

  constructor({
    maxListeners = 100,
  }: FormEventEmitterOptions = {}) {
    this.emitter.setMaxListeners(maxListeners);
  }

  addSubmitListener(callback: () => any) {
    this.emitter.addListener(FormEventEmitter.submitEvent, callback);
  }

  removeSubmitListener(callback: () => any) {
    this.emitter.removeListener(FormEventEmitter.submitEvent, callback);
  }

  addUpdateListener(callback: () => any) {
    this.emitter.addListener(FormEventEmitter.updateEvent, callback);
  }

  removeUpdateListener(callback: () => any) {
    this.emitter.removeListener(FormEventEmitter.updateEvent, callback);
  }

  triggerUpdate() {
    this.emitter.emit(FormEventEmitter.updateEvent);
  }

  triggerSubmit() {
    this.emitter.emit(FormEventEmitter.submitEvent);
  }
}

export default FormEventEmitter;
