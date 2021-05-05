import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GetStaticProps, NextPage } from 'next';

import { fetch } from 'utils/fetch';
import { config } from 'utils/config';

import { TActivity } from 'types/activity';
import { TTranslations } from 'types/translations';

import Sidenav from 'components/sidenav';
import Activity from 'components/activity';
import Navigator from 'components/navigator';
import Menu, { cnMenu } from 'components/menu';

import withNavigation from 'hocs/with-navigation';
import useSmoothScroll from 'hooks/use-smooth-scroll';
import Header from 'components/header';
import Logo from 'components/logo';
import Collapse from 'components/collapse';

const ActivityWithNavigation = withNavigation(Activity);

export type THomeProps = {
    activities: TActivity[];
};

const Home: NextPage<THomeProps> = ({ activities }) => {
    const handleSmoothScroll = useSmoothScroll<HTMLAnchorElement>();

    return (
        <Navigator
            threshold={1}
            activeClassName={cnMenu('link', { active: true })}
        >
            <Sidenav>
                <Sidenav.Aside>
                    <Menu>
                        {activities.map(({ id, translationsPrefix }) => {
                            return (
                                <Menu.Item key={id}>
                                    <Navigator.Link
                                        href={`#activity-${id}`}
                                        onClick={handleSmoothScroll}
                                    >
                                        <FormattedMessage
                                            id={`${translationsPrefix}.title`}
                                        />
                                    </Navigator.Link>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Sidenav.Aside>
                <main>
                    <Header>
                        <Sidenav.Open>
                            <Collapse />
                        </Sidenav.Open>
                        <Logo width={110} height={25} />
                    </Header>
                    <section>
                        {activities.map((activity) => (
                            <ActivityWithNavigation
                                key={activity.id}
                                {...activity}
                                id={`activity-${activity.id}`}
                            />
                        ))}
                    </section>
                </main>
            </Sidenav>
        </Navigator>
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
