import React, { useCallback } from 'react';
import { Story, Meta } from '@storybook/react';

import { cn } from 'utils/cn';

import Sidenav from 'components/sidenav';

import withNavigation from 'hocs/with-navigation';

import Navigator from './navigator.component';

import styles from './navigator.stories.module.css';

const cnNavigatorStories = cn('navigator-stories', styles);

export default {
    title: 'Components/Navigator',
    component: Navigator,
} as Meta;

const DivWithNavigation = withNavigation('div');

const Template: Story = () => {
    const smoothScroll = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();

            const target = e.target as HTMLAnchorElement;
            const href = target.getAttribute('href');

            if (!href) {
                return;
            }

            document.querySelector(href)?.scrollIntoView({
                behavior: 'smooth',
            });
        },
        [],
    );
    return (
        <Navigator
            activeClassName={cnNavigatorStories('link', { active: true })}
        >
            <Sidenav>
                <Sidenav.Aside>
                    <div>
                        <nav className={cnNavigatorStories('nav')}>
                            <Navigator.Link
                                href="#article-1"
                                onClick={smoothScroll}
                                className={cnNavigatorStories('link')}
                            >
                                Article 1
                            </Navigator.Link>
                            <Navigator.Link
                                href="#article-2"
                                onClick={smoothScroll}
                                className={cnNavigatorStories('link')}
                            >
                                Article 2
                            </Navigator.Link>
                            <Navigator.Link
                                href="#article-3"
                                onClick={smoothScroll}
                                className={cnNavigatorStories('link')}
                            >
                                Article 3
                            </Navigator.Link>
                        </nav>
                    </div>
                </Sidenav.Aside>
                <main>
                    <Sidenav.Open />
                    <DivWithNavigation
                        id="article-1"
                        style={{ height: 500, background: '#dedede' }}
                    />
                    <DivWithNavigation
                        id="article-2"
                        style={{ height: 500, background: '#cecece' }}
                    />
                    <DivWithNavigation
                        id="article-3"
                        style={{ height: 500, background: '#d4d4d4' }}
                    />
                </main>
            </Sidenav>
        </Navigator>
    );
};

export const Navigatopn = Template.bind({});
