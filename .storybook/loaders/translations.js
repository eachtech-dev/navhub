import { fetch } from '../../src/utils/fetch';

export const translations = async () => {
    const translations = await fetch('/translations');

    return { translations };
};
