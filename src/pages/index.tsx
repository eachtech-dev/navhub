import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GetStaticProps, NextPage } from 'next';

import { fetch } from 'utils/fetch';
import { config } from 'utils/config';
import { TTranslations } from 'types/translations';

import Button from 'components/button';
import Sidenav from 'components/sidenav';

const Home: NextPage = () => {
    return (
        <Sidenav>
            <Sidenav.Aside>
                <Button view="primary" size="m">
                    <FormattedMessage id="index.header" />
                </Button>
            </Sidenav.Aside>
            <main>
                <Sidenav.Open />
            </main>
        </Sidenav>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const translations = await fetch<TTranslations>('/translations');

    return { revalidate: config.next.revalidate, props: { translations } };
};

export default Home;
