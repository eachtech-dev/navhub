import React, { FC, SVGProps } from 'react';

export type TCollapseProps = SVGProps<SVGSVGElement>;

const Collapse: FC<TCollapseProps> = (props) => {
    return (
        <svg
            width="25"
            height="18"
            viewBox="0 0 25 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                stroke="#5D737E"
                strokeOpacity=".6"
                strokeWidth="2"
                d="M0 17h25M0 9h25M0 1h25"
            />
        </svg>
    );
};

export default Collapse;
