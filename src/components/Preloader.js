import React from 'react';
import { Preloader } from 'react-materialize';

const PreloaderComponent = () => (
    <div id="preloader-wrapper">
        <Preloader
            active
            color="blue"
            flashing={false}
            size="big"
        />
    </div>
);

export default PreloaderComponent;
