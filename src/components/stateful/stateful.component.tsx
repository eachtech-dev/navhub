import React, { FC, useCallback } from 'react';

import Button, { TButtonProps } from 'components/button';
import useToggle from 'hooks/use-toggle';

export type TStatefulComponent = Omit<TButtonProps, 'onClick' | 'ref'>;

const StatefulComponent: FC<TStatefulComponent> = (props) => {
    const [clicked, toggleClicked] = useToggle();

    const handleClick = useCallback(() => {
        if (!clicked) {
            toggleClicked();
        }
    }, [toggleClicked, clicked]);

    return (
        <Button {...props} onClick={handleClick}>
            {clicked ? 'Clicked' : 'Click!'}
        </Button>
    );
};

export default StatefulComponent;
