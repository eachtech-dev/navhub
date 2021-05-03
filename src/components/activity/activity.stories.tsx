import React from 'react';
import { IntlProvider } from 'react-intl';
import { Story, Meta } from '@storybook/react';

import Activity from './activity.component';
import { TActivity } from 'types/activity';

export default {
    title: 'Components/Activity',
    component: Activity,
    argTypes: {
        backgroundColor: { control: 'color', defaultValue: '#eef0e4' },
        title: { control: 'text', defaultValue: 'Hello world!' },
        description: {
            control: 'text',
            defaultValue: 'Lorem ipsum dolore sit amet',
        },
        primaryText: {
            control: 'text',
            defaultValue: 'Join!',
        },
        primaryLink: {
            control: 'text',
            defaultValue: 'https://example.com',
        },
        secondaryLinkHref: {
            control: 'text',
            defaultValue: 'https://example.com',
        },
        secondaryLinkTranslation: {
            control: 'text',
            defaultValue: 'Read more',
        },
        imageSrc: {
            control: 'text',
            defaultValue: 'https://picsum.photos/400',
        },
    },
} as Meta;

const Template: Story = ({
    title,
    description,
    primaryText,
    secondaryLinkHref,
    secondaryLinkTranslation,
    ...args
}) => {
    const messages = {
        'index.example.title': title,
        'index.example.description': description,
        'index.example.primary': primaryText,
        'index.example.secondary': secondaryLinkTranslation,
    };

    return (
        <IntlProvider locale="ru" messages={messages}>
            <Activity
                {...(args as TActivity)}
                secondaryLinks={[
                    { href: secondaryLinkHref, translation: 'secondary' },
                ]}
                translationsPrefix="index.example"
            />
        </IntlProvider>
    );
};

export const ActivityStory = Template.bind({});
