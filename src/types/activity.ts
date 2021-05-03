export type TActivity = {
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
