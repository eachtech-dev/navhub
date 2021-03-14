import React, { FC, HTMLProps } from 'react';

import { classnames } from '@bem-react/classnames';
import { cn } from 'utils/cn';

import SidenavOpen from './sidenav-open';
import SidenavAside from './sidenav-aside';

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
    return (
        <div {...props} className={classnames(cnSidenav(), className)}>
            <SidenavContext.Provider value={{ id, openLabel, closeLabel }}>
                {children}
            </SidenavContext.Provider>
        </div>
    );
};

Sidenav.Open = SidenavOpen;
Sidenav.Aside = SidenavAside;

export default Sidenav;
