import * as React from 'react';
import { InputProps as ParentInputProps } from '../../types';
export interface InputProps extends ParentInputProps {
    type?: string;
}
export declare const Input: React.SFC<InputProps & React.InputHTMLAttributes<HTMLInputElement>>;
declare const _default: React.StatelessComponent<import("../../types").GenericInputProps<InputProps & React.InputHTMLAttributes<HTMLInputElement>>>;
export default _default;
