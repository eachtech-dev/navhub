import React, { ReactHTML, ReactNode } from 'react';

export const renderNodeInTag = (Component: keyof ReactHTML) => {
    // eslint-disable-next-line react/display-name
    return (node: ReactNode) => <Component>{node}</Component>;
};
