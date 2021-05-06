import { Flavor } from './util';

export type TActivity = {
    id: Flavor<string, 'activity'>;
    backgroundColor: string;
    imageSrc?: string;
    videoSrc?: string;
    translationsPrefix: string;
    primaryLink?: string;
    secondaryLinks: {
        href: string;
        translation: string;
    }[];
};
