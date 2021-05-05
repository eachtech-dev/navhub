import React, { FC, HTMLProps, useCallback, useContext } from 'react';

import { classnames } from '@bem-react/classnames';

import SidenavContext from '../sidenav.context';

import { cnSidenav } from '../sidenav.component';

export type TSidenavOpenProps = Omit<HTMLProps<HTMLAnchorElement>, 'id'>;

const SidenavOpen: FC<TSidenavOpenProps> = ({
    onClick,
    children,
    className,
    ...props
}) => {
    const { id, open, openLabel } = useContext(SidenavContext);

    const handleClick = useCallback(
        (e) => {
            onClick && onClick(e);

            if (!open) {
                return;
            }

            e.preventDefault();
            open();
        },
        [open, onClick],
    );

    return (
        <a
            className={classnames(cnSidenav('open'), className)}
            title={openLabel}
            onClick={handleClick}
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
