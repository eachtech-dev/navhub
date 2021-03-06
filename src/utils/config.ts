import { TConfig } from 'types/config';

export const config: TConfig = {
    locale: 'ru',
    next: {
        revalidate: 21600,
    },
    api: {
        url: process.env.API_URL || '',
    },
};
