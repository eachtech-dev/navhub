import { MouseEvent as SyntheticMouseEvent, useCallback } from 'react';

/**
 * @returns onClick handler to scroll to target href
 */
const useSmoothScroll = <T extends HTMLElement>() => {
    return useCallback((e: SyntheticMouseEvent<T, MouseEvent>) => {
        e.preventDefault();

        const target = e.target as T;
        const href = target.getAttribute('href');

        if (!href) {
            return;
        }

        const element = document.querySelector(href);

        if (!element) {
            return;
        }

        element.scrollIntoView({
            behavior: 'smooth',
        });
    }, []);
};

export default useSmoothScroll;
