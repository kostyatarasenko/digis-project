import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-materialize';
import { setZoomValue } from '../../reducers';

const Controls = (props) => {
    const incrementZoomValue = () => {
        props.setZoomValue(props.zoom + 1);
    };

    const decrementZoomValue = () => {
        props.setZoomValue(props.zoom - 1);
    };

    return (
        <div id="controls-wrapper">
            <Button
                onClick={incrementZoomValue}
                className="white block-button"
                floating
                icon={<Icon className="icon-black">add</Icon>}
                node="button"
            />
            <Button
                onClick={decrementZoomValue}
                className="white block-button"
                floating
                icon={<Icon className="icon-black">remove</Icon>}
                node="button"
            />
        </div>
    );
};

Controls.propTypes = {
    setZoomValue: PropTypes.func.isRequired,
    zoom: PropTypes.number.isRequired,
};

export default connect(null, { setZoomValue })(Controls);
