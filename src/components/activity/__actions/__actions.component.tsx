import React, { FC, HTMLProps } from 'react';
import { FormattedMessage } from 'react-intl';
import { classnames } from '@bem-react/classnames';

import Link from 'components/link';
import Button from 'components/button';
import { TActivity } from 'types/activity';

import { cnActivity } from '../activity.component';

export type TActivityActions = {
    prefix: string;
} & Pick<TActivity, 'primaryLink' | 'secondaryLinks'> &
    HTMLProps<HTMLDivElement>;

const ActivityActions: FC<TActivityActions> = ({
    className,
    primaryLink,
    secondaryLinks,
    prefix,
    ...props
}) => {
    return (
        <div
            {...props}
            className={classnames(cnActivity('actions'), className)}
        >
            {primaryLink && (
                <Link className={cnActivity('action')} href={primaryLink}>
                    <Button view="primary">
                        <FormattedMessage id={`${prefix}.primary`} />
                    </Button>
                </Link>
            )}

            {secondaryLinks.map(({ href, translation }) => (
                <Link className={cnActivity('action')} href={href} key={href}>
                    <Button view="secondary">
                        <FormattedMessage id={`${prefix}.${translation}`} />
                    </Button>
                </Link>
            ))}
        </div>
    );
};

export default ActivityActions;
