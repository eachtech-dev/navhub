import { fetch } from '../../src/utils/fetch';

import translationsJson from '../translations.json';

export const translations = async () => {
    const translations =
        (await translationsJson) || (await fetch('/translations'));

    return { translations };
};
