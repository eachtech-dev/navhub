import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GetStaticProps, NextPage } from 'next';

import { fetch } from 'utils/fetch';
import { config } from 'utils/config';

import { TActivity } from 'types/activity';
import { TTranslations } from 'types/translations';

import Button from 'components/button';
import Sidenav from 'components/sidenav';
import Activity from 'components/activity';

export type THomeProps = {
    activities: TActivity[];
};

const Home: NextPage<THomeProps> = ({ activities }) => {
    return (
        <Sidenav>
            <Sidenav.Aside>
                <nav>
                    <Button view="primary" size="m">
                        <FormattedMessage id="index.header" />
                    </Button>
                </nav>
            </Sidenav.Aside>
            <main>
                <Sidenav.Open />
                {activities.map((activity) => (
                    <Activity key={activity.id} {...activity} />
                ))}
            </main>
        </Sidenav>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const translations = await fetch<TTranslations>('/translations');
    const activities = await fetch<TActivity[]>('/activities');

    return {
        revalidate: config.next.revalidate,
        props: { translations, activities },
    };
};

export default Home;
