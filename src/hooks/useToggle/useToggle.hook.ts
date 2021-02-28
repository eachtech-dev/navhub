import { useCallback, useState } from 'react';

export type TUseToggle = (defaultValue?: boolean) => [boolean, () => void];

export const useToggle: TUseToggle = (defaultValue) => {
    const [value, setValue] = useState<boolean>(Boolean(defaultValue));

    const toggle = useCallback(() => {
        setValue((value) => {
            return !value;
        });
    }, [setValue]);

    return [value, toggle];
};

export default useToggle;
