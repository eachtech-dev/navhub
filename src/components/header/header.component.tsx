import React, { FC, HTMLProps, useLayoutEffect, useState } from 'react';
import { classnames } from '@bem-react/classnames';

import { cn } from 'utils/cn';

import styles from './header.module.css';

export const cnHeader = cn('header', styles);

export type THeaderProps = { offset?: number } & HTMLProps<HTMLDivElement>;

const Header: FC<THeaderProps> = ({ className, offset = 100, ...props }) => {
    const [sticky, setSticky] = useState<boolean>(false);

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (!sticky && window.pageYOffset > offset) {
                setSticky(true);
            } else if (window.pageYOffset < offset) {
                setSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setSticky, offset, sticky]);

    return (
        <header
            {...props}
            className={classnames(cnHeader({ sticky }), className)}
        />
    );
};

export default Header;
