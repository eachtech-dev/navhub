import '../src/global/styles/index.css';
import { intl } from './decorators/intl';
import { translations } from './loaders/translations';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const loaders = [translations];

export const decorators = [intl];
