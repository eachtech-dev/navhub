import React, { FC, HTMLProps } from 'react';

import { classnames } from '@bem-react/classnames';
import { TActivity } from 'types/activity';

import { cnActivity } from '../activity.component';

export type TActivityPreview = Pick<TActivity, 'imageSrc' | 'videoSrc'> &
    HTMLProps<HTMLDivElement>;

const ActivityPreview: FC<TActivityPreview> = ({
    className,
    imageSrc,
    videoSrc,
    ...props
}) => {
    if (!imageSrc) {
        return null;
    }

    return (
        <div
            {...props}
            className={classnames(cnActivity('preview'), className)}
        >
            <img alt="" src={imageSrc} className={cnActivity('image')} />
            <button className={cnActivity('overlay')}>
                {videoSrc && null /* TODO: open video modal */}
            </button>
        </div>
    );
};

export default ActivityPreview;
