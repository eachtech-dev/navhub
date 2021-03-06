import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GetStaticProps, NextPage } from 'next';

import { fetch } from 'utils/fetch';
import { config } from 'utils/config';
import Button from 'components/button';
import { TTranslations } from 'types/translations';

const Home: NextPage = () => {
    return (
        <Button view="primary" size="m">
            <FormattedMessage id="index.header" />
        </Button>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const translations = await fetch<TTranslations>('/translations');

    return { revalidate: config.next.revalidate, props: { translations } };
};

export default Home;
