import React, { FC, HTMLProps } from 'react';

import { classnames } from '@bem-react/classnames';
import { cn } from 'utils/cn';

import styles from './input.module.css';

export const cnInput = cn('input', styles);

export type TInputProps = HTMLProps<HTMLInputElement>;

const Input: FC<TInputProps> = ({ className, ...props }) => {
    return (
        <input
            {...props}
            className={classnames(cnInput({ view: 'primary' }), className)}
        />
    );
};

export default Input;
