import React, {
    MutableRefObject,
    ComponentType,
    ReactHTML,
    useEffect,
    useRef,
} from 'react';

import useNavigation from 'hooks/use-navigation';

export type TWithNavigation = <
    T extends { ref?: MutableRefObject<P | null> },
    P extends HTMLElement
>(
    Component: ComponentType<T> | keyof ReactHTML,
) => typeof Component;

const withNavigation: TWithNavigation = (Component) => {
    const ComponentWithNavigation: typeof Component = ({
        ref: refFromProps,
        ...props
    }) => {
        const ref: typeof refFromProps = useRef(null);

        useNavigation(ref);

        useEffect(() => {
            if (refFromProps) {
                refFromProps.current = ref.current;
            }
        }, [ref, refFromProps]);

        // @ts-expect-error poor exotic hoc typing
        return <Component {...props} ref={ref} />;
    };

    return ComponentWithNavigation;
};

export default withNavigation;
