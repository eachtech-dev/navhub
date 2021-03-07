import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';

import NextApp, { AppProps } from 'next/app';
import Head from 'next/head';

import { TTranslations } from 'types/translations';
import { config } from 'utils/config';

import 'global/styles/index.css';

const { locale } = config;

class App extends NextApp<AppProps> {
    render() {
        const { Component, pageProps } = this.props;

        const translations = pageProps.translations as TTranslations;

        return (
            <Fragment>
                <Head>
                    <title>Образовательное общество &quot;Среда&quot;</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <IntlProvider locale={locale} messages={translations[locale]}>
                    <Component {...pageProps} />;
                </IntlProvider>
            </Fragment>
        );
    }
}

export default App;
