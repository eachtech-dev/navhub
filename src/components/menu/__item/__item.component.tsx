import React, { FC, HTMLProps } from 'react';

import { classnames } from '@bem-react/classnames';

import { cnMenu } from '../menu.component';

export type TMenuItemProps = HTMLProps<HTMLLIElement>;

const MenuItem: FC<TMenuItemProps> = ({ className, ...props }) => {
    return <li {...props} className={classnames(cnMenu('item'), className)} />;
};

export default MenuItem;
