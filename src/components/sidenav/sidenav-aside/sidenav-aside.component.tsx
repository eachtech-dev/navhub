import React, { FC, HTMLProps, useCallback, useContext } from 'react';

import { classnames } from '@bem-react/classnames';

import SidenavContext from '../sidenav.context';

import { cnSidenav } from '../sidenav.component';

export type TSidenavAsideProps = HTMLProps<HTMLDivElement>;

const SidenavAside: FC<TSidenavAsideProps> = ({
    id: idFromProps,
    children,
    className,
    ...props
}) => {
    const { id, closeLabel } = useContext(SidenavContext);

    const updateFocus = useCallback(() => {
        const isOpen = document.location.hash === `#${idFromProps || id}`;

        isOpen
            ? document.querySelector<HTMLElement>(`${id}-close`)?.focus()
            : document.querySelector<HTMLElement>(`${id}-button`)?.focus();
    }, [id, idFromProps]);

    return (
        <aside
            {...props}
            id={idFromProps || `${id}-open`}
            onTransitionEnd={updateFocus}
            className={classnames(cnSidenav('aside'), className)}
        >
            <nav>{children}</nav>
            <a // eslint-disable-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
                href="#"
                id={`${id}-close`}
                className={cnSidenav('close')}
                title={closeLabel}
                aria-label={closeLabel}
            />
        </aside>
    );
};

export default SidenavAside;
