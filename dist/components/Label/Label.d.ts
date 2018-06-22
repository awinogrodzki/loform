import * as React from 'react';
export interface LabelInterface {
    className?: string;
    required?: boolean;
    htmlFor?: string;
    children?: React.ReactNode;
}
declare const Label: React.SFC<LabelInterface>;
export default Label;
