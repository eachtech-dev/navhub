import { RefObject, useContext, useEffect, useRef } from 'react';

import NavigatorContext from 'components/navigator/navigator.context';

export type TUseNavigation = <T extends HTMLElement>(ref: RefObject<T>) => void;

const useNavigation: TUseNavigation = (ref) => {
    const { observer } = useContext(NavigatorContext);

    const oldRef = useRef<typeof ref['current']>();

    useEffect(() => {
        if (!observer) {
            return;
        }

        ref.current && observer.observe(ref.current);

        oldRef.current && observer.unobserve(oldRef.current);
    }, [observer, ref]);

    useEffect(() => {
        oldRef.current = ref.current;
    }, [ref]);
};

export default useNavigation;
