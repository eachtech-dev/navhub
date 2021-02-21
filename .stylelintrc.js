module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-idiomatic-order'],
    plugins: ['stylelint-prettier'],
    rules: {
        'max-empty-lines': 1,
        indentation: 4,
        'string-quotes': 'single',
    },
    ignoreFiles: ['./src/global/themes/presets/**/*.css'],
};
