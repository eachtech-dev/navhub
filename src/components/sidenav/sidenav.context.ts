import React from 'react';

export type TSidenavContext = {
    id?: string;
    openLabel: string;
    closeLabel: string;
};

const SidenavContext = React.createContext<TSidenavContext>({
    openLabel: 'Open menu',
    closeLabel: 'Close menu',
});

export default SidenavContext;
