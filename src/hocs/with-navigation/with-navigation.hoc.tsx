import React, {
    MutableRefObject,
    ComponentType,
    ReactHTML,
    useEffect,
    useRef,
    HTMLProps,
} from 'react';

import useNavigation from 'hooks/use-navigation';

export type TWithNavigation = <
    T extends { ref?: HTMLProps<HTMLElement>['ref'] }
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
            if (!refFromProps || typeof refFromProps === 'string') {
                return;
            }

            if (typeof refFromProps === 'function') {
                refFromProps(ref.current);
            } else {
                // @ts-expect-error read-only ref
                refFromProps.current = ref.current;
            }
        }, [ref, refFromProps]);

        // @ts-expect-error poor exotic hoc typing
        return <Component {...props} ref={ref} />;
    };

    return ComponentWithNavigation;
};

export default withNavigation;
