import React, { Fragment } from 'react';

import NextApp, { AppProps } from 'next/app';
import Head from 'next/head';

import 'global/styles/index.css';

class App extends NextApp<AppProps> {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <Fragment>
                <Head>
                    <title>Образовательное общество &quot;Среда&quot;</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />;
            </Fragment>
        );
    }
}

export default App;
