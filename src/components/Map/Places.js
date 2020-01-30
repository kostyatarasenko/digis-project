import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCenterPosition } from '../../reducers';

import Restaurants from './Places/Restaurants';
import BikeShelters from './Places/BikeShelters';

const places = {
    restaurants: Restaurants,
    bikeShelters: BikeShelters,
};

const Places = (props) => {
    const Handler = places[props.placeType];

    const handleOnOpenPopup = (coords) => {
        props.setCenterPosition({
            center: coords,
            zoom: null,
        });
    };

    return (
        <Handler onOpenPopup={handleOnOpenPopup} />
    );
};

Places.propTypes = {
    placeType: PropTypes.string.isRequired,
    setCenterPosition: PropTypes.func.isRequired,
};

export default connect(null, { setCenterPosition })(Places);
