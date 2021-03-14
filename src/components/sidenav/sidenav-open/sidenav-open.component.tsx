import React, { FC, HTMLProps, useContext } from 'react';

import { classnames } from '@bem-react/classnames';

import SidenavContext from '../sidenav.context';

import { cnSidenav } from '../sidenav.component';

export type TSidenavOpenProps = Omit<HTMLProps<HTMLAnchorElement>, 'id'>;

const SidenavOpen: FC<TSidenavOpenProps> = ({
    children,
    className,
    ...props
}) => {
    const { id, openLabel } = useContext(SidenavContext);

    return (
        <a
            className={classnames(cnSidenav('open'), className)}
            title={openLabel}
            aria-label={openLabel}
            id={`${id}-button`}
            href={`#${id}-open`}
            {...props}
        >
            {children || openLabel}
        </a>
    );
};

export default SidenavOpen;
