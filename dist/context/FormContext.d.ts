import * as React from 'react';
import FormService from '../services/FormService';
import FormEventEmitter from '../services/FormEventEmitter';
declare const FormContext: React.Context<{
    formService: FormService;
    formEventEmitter: FormEventEmitter;
}>;
export default FormContext;
