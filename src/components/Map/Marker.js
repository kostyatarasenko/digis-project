import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const iconUrl = require('../../static/images/marker.png');
const shadowUrl = require('../../static/images/marker-shadow.png');

const icon = new L.Icon({
    iconUrl,
    iconRetinaUrl: iconUrl,
    shadowUrl,
    shadowAnchor: [12.5, 20.5],
    iconSize: new L.Point(25, 41),
});

const MarkerComponent = ({ marker }) => (
    <Marker position={[marker.latitude, marker.longitude]} icon={icon}>
        <Popup>
            <p>
                {`${marker.latitude}, ${marker.longitude}`}
            </p>
        </Popup>
    </Marker>
);

MarkerComponent.propTypes = {
    marker: PropTypes.object.isRequired,
};

export default MarkerComponent;
