import React, { FC, HTMLProps, useCallback, useState } from 'react';

import { classnames } from '@bem-react/classnames';
import { cn } from 'utils/cn';

import SidenavOpen from './__open';
import SidenavAside from './__aside';

import SidenavContext from './sidenav.context';

import styles from './sidenav.module.css';

export const cnSidenav = cn('sidenav', styles);

export type TSidenavProps = {
    openLabel?: string;
    closeLabel?: string;
} & HTMLProps<HTMLDivElement>;

export type TSidenavStaticProps = {
    Open: typeof SidenavOpen;
    Aside: typeof SidenavAside;
};

const Sidenav: TSidenavStaticProps & FC<TSidenavProps> = ({
    id = 'sidenav',
    openLabel = 'Open menu',
    closeLabel = 'Close menu',
    children,
    className,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    const close = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <div
            {...props}
            className={classnames(cnSidenav({ open: isOpen }), className)}
        >
            <SidenavContext.Provider
                value={{ id, open, close, openLabel, closeLabel }}
            >
                {children}
            </SidenavContext.Provider>
        </div>
    );
};

Sidenav.Open = SidenavOpen;
Sidenav.Aside = SidenavAside;

export default Sidenav;
