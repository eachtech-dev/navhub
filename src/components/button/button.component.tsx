import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { classnames } from '@bem-react/classnames';
import { cn } from 'utils/cn';

import styles from './button.module.css';

export const cnButton = cn('button', styles);

export type TButtonProps = {
    view?: 'primary' | 'secondary' | 'play';
    size?: 's' | 'm' | 'l';
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = React.forwardRef<HTMLButtonElement, TButtonProps>(
    ({ view = 'secondary', size = 'm', className, ...props }, ref) => {
        if (view === 'play') {
            props.children = (
                <svg width="22" height="23" viewBox="-5 -3 30 30">
                    <path d="M19.1765 9.03586C21.8431 10.5755 21.8431 14.4245 19.1765 15.9641L6.16176 23.4781C3.49509 25.0177 0.161762 23.0932 0.161762 20.014V4.98591C0.161762 1.9067 3.4951 -0.0177894 6.16176 1.52181L19.1765 9.03586Z" />
                </svg>
            );
            size = 'l';
        }
        return (
            <button
                {...props}
                ref={ref}
                className={classnames(cnButton({ view, size }), className)}
            />
        );
    },
);

Button.displayName = 'Button';

export default Button;
