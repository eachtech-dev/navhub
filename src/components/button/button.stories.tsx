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

export const Hover = Template.bind({});
Hover.parameters = {
    pseudo: { hover: true },
};

export const Focus = Template.bind({});
Focus.parameters = {
    pseudo: { focus: true },
};

export const Active = Template.bind({});
Active.parameters = {
    pseudo: { active: true },
};

export const HoverActive = Template.bind({});
HoverActive.parameters = {
    pseudo: { active: true, hover: true },
};

export const FocusActive = Template.bind({});
FocusActive.parameters = {
    pseudo: { active: true, focus: true },
};

export const HoverFocusActive = Template.bind({});
HoverFocusActive.parameters = {
    pseudo: { active: true, hover: true, focus: true },
};
