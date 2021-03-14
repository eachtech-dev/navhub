module.exports = {
    plugins: [
        'postcss-flexbugs-fixes',
        [
            'postcss-preset-env',
            {
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                features: {
                    'custom-properties': false,
                },
            },
        ],
        [
            'postcss-custom-media',
            {
                preserve: false,
            },
        ],
    ],
};
