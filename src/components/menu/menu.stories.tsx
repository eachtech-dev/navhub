import React from 'react';
import { Story, Meta } from '@storybook/react';

import Sidenav from 'components/sidenav';

import Menu from './menu.component';

export default {
    title: 'Components/Menu',
    component: Menu,
} as Meta;

const Template: Story = () => (
    <Sidenav>
        <Sidenav.Aside>
            <Menu>
                <Menu.Item href="#1">
                    <a href="#1">Item 1</a>
                </Menu.Item>
                <Menu.Item href="#2">
                    <a href="#2">Item 2</a>
                </Menu.Item>
                <Menu.Item href="#3">
                    <a href="#3">Item 3</a>
                </Menu.Item>
            </Menu>
        </Sidenav.Aside>
        <Sidenav.Open />
    </Sidenav>
);

export const MenuStory = Template.bind({});
