import React, { HTMLProps, ReactHTML } from 'react';
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

const tagsInText: (keyof ReactHTML)[] = ['b', 'strong', 'p', 'h1', 'h2'];

type TChunkRenderers = Record<string, ReturnType<typeof renderNodeInTag>>;

const chunksRenderers = tagsInText.reduce<TChunkRenderers>(
    (acc, tag) => ({
        ...acc,
        [tag]: renderNodeInTag(tag),
    }),
    {},
);

const Activity = React.forwardRef<HTMLDivElement, TActivityProps>(
    (
        {
            style,
            className,
            primaryLink,
            imageSrc,
            videoSrc,
            backgroundColor,
            secondaryLinks = [],
            translationsPrefix: prefix,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                {...props}
                ref={ref}
                className={classnames(cnActivity(), className)}
                style={{ backgroundColor, ...style }}
            >
                <div className={cnActivity('content')}>
                    <div className={cnActivity('description')}>
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
    },
);

Activity.displayName = 'Activity';

export default Activity;
