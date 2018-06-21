import * as React from 'react';
import FormService from '../services/FormService';
import FormEventEmitter from '../services/FormEventEmitter';

const FormContext = React.createContext({
  formService: new FormService(),
  formEventEmitter: new FormEventEmitter(),
});

export default FormContext;
