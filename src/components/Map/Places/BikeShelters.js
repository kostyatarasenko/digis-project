import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import bikeShelters from '../../../static/geojson/bike-shelters.json';

const iconPath = require('../../../static/images/bike.svg');

const icon = new L.Icon({
    iconUrl: iconPath,
    iconRetinaUrl: iconPath,
    iconSize: new L.Point(40, 50),
});

const BikeShelters = ({ onOpenPopup }) => (
    bikeShelters.features.map(({ geometry, properties }) => (
        <Marker
            key={geometry.coordinates[1]}
            position={[geometry.coordinates[1], geometry.coordinates[0]]}
            icon={icon}
        >
            <Popup onOpen={() => {
                onOpenPopup({
                    latitude: geometry.coordinates[1],
                    longitude: geometry.coordinates[0],
                });
            }}
            >
                <span>
                    <p>{properties.type}</p>
                    <b>Adress: </b>
                    <p>{properties.name}</p>
                </span>
            </Popup>
        </Marker>
    ))
);

BikeShelters.propTypes = {
    onOpenPopup: PropTypes.func.isRequired,
};

export default BikeShelters;
