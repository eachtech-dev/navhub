import React, { FC, HTMLProps, ReactHTML } from 'react';
import { FormattedMessage } from 'react-intl';

import { classnames } from '@bem-react/classnames';

import { cn } from 'utils/cn';
import { TActivity } from 'types/activity';
import { renderNodeInTag } from 'utils/render-node-in-tag';

import ActivityPreview from './__preview';
import ActivityActions from './__actions';

import styles from './activity.module.css';

export const cnActivity = cn('activity', styles);

export type TActivityProps = TActivity & HTMLProps<HTMLDivElement>;

const tagsInText: (keyof ReactHTML)[] = ['b', 'strong', 'p'];

type TChunkRenderers = Record<string, ReturnType<typeof renderNodeInTag>>;

const chunksRenderers = tagsInText.reduce<TChunkRenderers>(
    (acc, tag) => ({
        ...acc,
        [tag]: renderNodeInTag(tag),
    }),
    {},
);

const Activity: FC<TActivityProps> = ({
    className,
    primaryLink,
    imageSrc,
    videoSrc,
    backgroundColor,
    secondaryLinks = [],
    translationsPrefix: prefix,
    ...props
}) => {
    return (
        <div
            {...props}
            className={classnames(cnActivity(), className)}
            style={{ backgroundColor }}
        >
            <div className={cnActivity('content')}>
                <div className={cnActivity('description')}>
                    <h1>
                        <FormattedMessage id={`${prefix}.title`} />
                    </h1>
                    <div>
                        <FormattedMessage
                            id={`${prefix}.description`}
                            values={chunksRenderers}
                        />
                    </div>
                    <ActivityActions
                        prefix={prefix}
                        primaryLink={primaryLink}
                        secondaryLinks={secondaryLinks}
                    />
                </div>
                <ActivityPreview imageSrc={imageSrc} videoSrc={videoSrc} />
            </div>
        </div>
    );
};

export default Activity;
