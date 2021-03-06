export type TConfig = {
    locale: 'ru' | 'en';
    next: {
        revalidate: number;
    };
    api: {
        url: string;
    };
};
