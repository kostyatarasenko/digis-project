import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const iconUrl = require('../../static/images/geolocation.png');

const icon = new L.Icon({
    iconUrl,
    iconRetinaUrl: iconUrl,
    iconSize: new L.Point(40, 40),
});

const Geolocation = ({ geolocation }) => (
    <Marker position={[geolocation.latitude, geolocation.longitude]} icon={icon}>
        <Popup>
            <p>Current geolocation</p>
            <p>{`${geolocation.latitude}, ${geolocation.longitude}`}</p>
        </Popup>
    </Marker>
);

Geolocation.propTypes = {
    geolocation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Geolocation;
