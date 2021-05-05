import React from 'react';

export type TNavigatorContext = {
    observer: IntersectionObserver | null;
    activeNav: string | null;
    activeClassName: string;
};

const NavigatorContext = React.createContext<TNavigatorContext>({
    observer: null,
    activeNav: null,
    activeClassName: 'active',
});

export default NavigatorContext;
