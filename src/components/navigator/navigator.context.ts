import React from 'react';

export type TNavigatorContext = {
    observer?: IntersectionObserver;
    activeNav: string | null;
    activeClassName: string;
};

const NavigatorContext = React.createContext<TNavigatorContext>({
    activeNav: null,
    activeClassName: 'active',
});

export default NavigatorContext;
