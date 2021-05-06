import React, { FC, HTMLProps } from 'react';

import NextLink, { LinkProps } from 'next/link';

export type TLinkProps = LinkProps & HTMLProps<HTMLAnchorElement>;

const Link: FC<TLinkProps> = ({
    href,
    as,
    replace,
    scroll,
    shallow,
    ...props
}) => {
    const linkProps = {
        href,
        as,
        replace,
        scroll,
        shallow,
    };

    return (
        <NextLink {...linkProps} passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content*/}
            <a {...props} />
        </NextLink>
    );
};

export default Link;
