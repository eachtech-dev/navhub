import React, { Fragment } from 'react';
import { NextPage } from 'next';

import Button from 'components/button';

const Home: NextPage = () => {
    return (
        <Fragment>
            <Button view="primary" size="m">
                Click me!
            </Button>
        </Fragment>
    );
};

export default Home;
