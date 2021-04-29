import React from 'react';
import { NextPage } from 'next';

import Button from 'components/button';

const Home: NextPage = () => {
    return (
        <Button view="primary" size="m">
            Стать участником
        </Button>
    );
};

export default Home;
