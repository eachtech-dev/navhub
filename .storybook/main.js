const path = require('path');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        'storybook-css-modules-preset',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
        'storybook-addon-pseudo-states',
        '@storybook/addon-essentials',
        '@storybook/addon-viewport',
        '@storybook/addon-a11y',
    ],
    webpackFinal: (config) => {
        config.resolve = {
            ...config.resolve,
            modules: [
                ...(config.resolve.modules || []),
                path.resolve(__dirname, '../src'),
            ],
        };

        return config;
    },
};
