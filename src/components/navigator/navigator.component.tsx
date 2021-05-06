import React, { FC, useCallback, useMemo, useState } from 'react';

import { isServer } from 'utils/env';

import NavigatorLink from './__link';

import NavigatorContext from './navigator.context';

export type TNavigatorProps = {
    activeClassName?: string;
} & Partial<IntersectionObserverInit>;

export type TNavigatorStaticProps = {
    Link: typeof NavigatorLink;
};

const defaultOptions = {
    root: null,
    threshold: 0.5,
};

const Navigator: TNavigatorStaticProps & FC<TNavigatorProps> = ({
    children,
    activeClassName = 'active',
    ...options
}) => {
    const [activeNav, setActiveNav] = useState<string | null>(null);

    const callback: IntersectionObserverCallback = useCallback(
        (entries) => {
            entries.every(({ isIntersecting, target }) => {
                if (isIntersecting) {
                    setActiveNav(target.id);
                    return true;
                }
            });
        },
        [setActiveNav],
    );

    const observer = useMemo(() => {
        if (isServer) {
            return null;
        }

        return new IntersectionObserver(callback, {
            ...defaultOptions,
            ...options,
        });
    }, [callback, options]);

    return (
        <NavigatorContext.Provider
            value={{ observer, activeNav, activeClassName }}
        >
            {children}
        </NavigatorContext.Provider>
    );
};

Navigator.Link = NavigatorLink;

export default Navigator;
