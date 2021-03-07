import React, { FC } from 'react';

import Error from 'next/error';
import { GetStaticProps, NextPageContext } from 'next';

import { fetch } from 'utils/fetch';
import { config } from 'utils/config';
import { TTranslations } from 'types/translations';
import { FormattedMessage } from 'react-intl';

const ErrorPage: FC<NextPageContext> = ({ res, err }) => {
    const errStatusCode = err ? err.statusCode : undefined;
    const statusCode = res ? res.statusCode : errStatusCode;

    if (statusCode) {
        return <Error statusCode={statusCode} />;
    }

    return <FormattedMessage id="errors.unknown" />;
};

export const getStaticProps: GetStaticProps = async () => {
    const translations = await fetch<TTranslations>('/translations');

    return { revalidate: config.next.revalidate, props: { translations } };
};

export default ErrorPage;
