import React from 'react';

export type TSidenavContext = {
    id?: string;
    open?: () => void;
    close?: () => void;
    openLabel: string;
    closeLabel: string;
};

const SidenavContext = React.createContext<TSidenavContext>({
    openLabel: 'Open menu',
    closeLabel: 'Close menu',
});

export default SidenavContext;
