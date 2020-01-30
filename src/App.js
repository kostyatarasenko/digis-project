import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initStore from './store';
import LS from './tools/LocalStorage';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

import RouteController from './route-controller';

const config = {
    user: {
        authorized: false,
    },
    zoom: 6,
    geolocation: null,
    marker: {
        latitude: 49.205977950723224,
        longitude: 31.640625000000004,
    },
    center: {
        latitude: 0,
        longitude: 0,
    },
    selectedMarker: 'marker',
    savedMarkers: [],
    placeType: null,
};

const LocalStorage = new LS({ key: 'data', data: config });
const store = initStore(LocalStorage.get('data'));

ReactDOM.render(
    <Provider store={store}>
        <RouteController />
    </Provider>,
    window.document.getElementById('root'),
);
