import { fetch } from '../../src/utils/fetch';

export const translations = async () => {
    const translations =
        (await import('../translations.json')) ||
        (await fetch('/translations'));

    return { translations };
};
