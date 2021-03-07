import { IntlProvider } from 'react-intl';

export const intl = (Story, { loaded: { translations } }) => {
    return (
        <IntlProvider locale="ru" messages={translations && translations.ru}>
            <Story />
        </IntlProvider>
    );
};
