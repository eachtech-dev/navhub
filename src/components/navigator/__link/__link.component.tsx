import React, {
    AnchorHTMLAttributes,
    DetailedHTMLProps,
    useContext,
    useMemo,
} from 'react';

import { classnames } from '@bem-react/classnames';

import NavigatorContext from '../navigator.context';

export type TNavigatorLinkProps = DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

const NavigatorLink = React.forwardRef<HTMLAnchorElement, TNavigatorLinkProps>(
    ({ href, className, ...props }, ref) => {
        const { activeNav, activeClassName } = useContext(NavigatorContext);

        const active = useMemo(() => {
            return href && href.slice(href.indexOf('#') + 1) === activeNav;
        }, [href, activeNav]);

        return (
            <a // eslint-disable-line jsx-a11y/anchor-has-content
                {...props}
                ref={ref}
                href={href}
                className={
                    active ? classnames(className, activeClassName) : className
                }
            />
        );
    },
);

NavigatorLink.displayName = 'NavigatorLink';

export default NavigatorLink;
