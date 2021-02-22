import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button from './button.component';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        label: { control: 'text', defaultValue: 'Click me!' },
        view: {
            control: { type: 'select', options: ['primary', 'secondary'] },
        },
        size: {
            control: { type: 'select', options: ['s', 'm', 'l'] },
            defaultValue: 'm',
        },
    },
} as Meta;

const Template: Story = ({ label, ...args }) => (
    <Button {...args}>{label}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
    view: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    view: 'secondary',
};

export const Large = Template.bind({});
Large.args = {
    size: 'l',
};

export const Medium = Template.bind({});
Medium.args = {
    size: 'm',
};

export const Small = Template.bind({});
Small.args = {
    size: 's',
};
