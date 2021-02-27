import React, { Fragment } from 'react';
import { NextPage } from 'next';

import Button from 'components/button';
import Input from 'components/input';

const Home: NextPage = () => {
    return (
        <Fragment>
            <Button view="primary" size="m">
                Click
            </Button>
            <Input />
        </Fragment>
    );
};

export default Home;
