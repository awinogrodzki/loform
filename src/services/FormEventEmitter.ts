import * as EventEmitter from 'events';

import {
  FormValuesInterface,
  InputDescriptorInterface,
  FormValueType,
} from '../types';

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

  /**
   * @deprecated
   */
  addSubmitListener(callback: () => any) {
    // tslint:disable-next-line
    console.warn('FormEventListener addSubmitListener() method is deprecated. Use addListener() method with FormEvent.Submit as the first argument.');

    this.addListener(FormEvent.Submit, callback);
  }

  /**
   * @deprecated
   */
  addUpdateListener(callback: () => any) {
    // tslint:disable-next-line
    console.warn('FormEventListener addUpdateListener() method is deprecated. Use addListener() method with FormEvent.Update as the first argument.');

    this.addListener(FormEvent.Update, callback);
  }

  /**
   * @deprecated
   */
  removeSubmitListener(callback: () => any) {
    // tslint:disable-next-line
    console.warn('FormEventListener removeSubmitListener() method is deprecated. Use removeListener() method with FormEvent.Submit as the first argument.');

    this.addListener(FormEvent.Submit, callback);
  }

  /**
   * @deprecated
   */
  removeUpdateListener(callback: () => any) {
    // tslint:disable-next-line
    console.warn('FormEventListener removeUpdateListener() method is deprecated. Use removeListener() method with FormEvent.Update as the first argument.');

    this.addListener(FormEvent.Update, callback);
  }

  /**
   * @deprecated
   */
  triggerUpdate() {
    // tslint:disable-next-line
    console.warn('FormEventEmitter triggerUpdate() method is deprecated. Use update() method instead.');

    this.update();
  }

  /**
   * @deprecated
   */
  triggerSubmit() {
    // tslint:disable-next-line
    console.warn('FormEventEmitter triggerSubmit() method is deprecated. Use submit() method instead.');

    this.submit();
  }
}

export default FormEventEmitter;
