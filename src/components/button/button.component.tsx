import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { classnames } from '@bem-react/classnames';
import { cn } from 'utils/cn';

import styles from './button.module.css';

export const cnButton = cn('button', styles);

export type TButtonProps = {
    view?: 'primary' | 'secondary';
    size?: 's' | 'm' | 'l';
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = React.forwardRef<HTMLButtonElement, TButtonProps>(
    ({ view = 'secondary', size = 'm', className, ...props }, ref) => {
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
