import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import restaurants from '../../../static/geojson/restaurants.json';

const iconPath = require('../../../static/images/restaurant.svg');

const icon = new L.Icon({
    iconUrl: iconPath,
    iconRetinaUrl: iconPath,
    iconSize: new L.Point(40, 50),
});

const Restaurants = ({ onOpenPopup }) => (
    restaurants.restaurants.map(({
                                     id,
                                     latlng,
                                     name,
                                     neighborhood,
                                     address,
                                 }) => (
        <Marker key={id} position={[latlng.lat, latlng.lng]} icon={icon}>
            <Popup onOpen={() => {
                onOpenPopup({
                    latitude: latlng.lat,
                    longitude: latlng.lng,
                });
            }}
            >
                <span>
                    <b>{name}</b>
                    <p>{neighborhood}</p>
                    <b>Adress: </b>
                    <p>{address}</p>
                </span>
            </Popup>
        </Marker>
    ))
);

Restaurants.propTypes = {
    onOpenPopup: PropTypes.func.isRequired,
};

export default Restaurants;
