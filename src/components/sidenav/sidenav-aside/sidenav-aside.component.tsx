import React, {
    FC,
    HTMLProps,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
} from 'react';

import { classnames } from '@bem-react/classnames';

import SidenavContext from '../sidenav.context';

import { cnSidenav } from '../sidenav.component';

export type TSidenavAsideProps = {
    children: ReactElement;
} & HTMLProps<HTMLDivElement>;

const SidenavAside: FC<TSidenavAsideProps> = ({
    id: idFromProps,
    children,
    className,
    ...props
}) => {
    const { id, closeLabel } = useContext(SidenavContext);

    const defaultId = `${id}-open`;

    const updateFocus = useCallback(
        (isOpen: boolean) => {
            if (isOpen) {
                document.querySelector<HTMLElement>(`#${id}-close`)?.focus();
            } else {
                document.querySelector<HTMLElement>(`#${id}-button`)?.focus();
            }
        },
        [id],
    );

    const closeSidenav = useCallback((e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            document.location.hash = '';
        }
    }, []);

    const handleTransitionEnd = useCallback(() => {
        const isOpen =
            document.location.hash === `#${idFromProps || defaultId}`;

        updateFocus(isOpen);

        if (isOpen) {
            document.addEventListener('keyup', closeSidenav);
        } else {
            document.removeEventListener('keydown', closeSidenav);
        }
    }, [idFromProps, defaultId, closeSidenav, updateFocus]);

    useEffect(() => {
        return () => {
            document.removeEventListener('keyup', closeSidenav);
        };
    }, [closeSidenav]);

    return (
        <aside
            {...props}
            id={idFromProps || defaultId}
            onTransitionEnd={handleTransitionEnd}
            className={classnames(cnSidenav('aside'), className)}
        >
            {children}
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
