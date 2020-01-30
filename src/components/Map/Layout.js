import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
 Col, Row, Button, Icon, CardPanel,
} from 'react-materialize';
import { setGeolocation, saveMarker, showPlaces } from '../../reducers';

const Layout = (props) => {
    const getCurrentLocationFunc = () => {
        window.navigator.geolocation.getCurrentPosition((data) => {
            props.setGeolocation({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
            });
        }, (error) => {
            window.M.toast({
                html: `Something went wrong... ${error.message}`,
            });
        }, {
            timeout: 10000,
            enableHighAccuracy: true,
        });
    };

    const saveMarkerFunc = () => {
        props.saveMarker({
            ...props.marker,
            id: Date.now(),
        });
    };

    const showPlacesFunc = (e) => {
        const type = e.target.getAttribute('data-place');
        props.showPlaces({
            center: {
                latitude: 40.71278477995827,
                longitude: -74.00476455688478,
            },
            placeType: type,
        });
    };

    return (
        <div id="layout-wrapper">
            <Row className="no-mg-bottom">
                <Col className="no-pd" s={6}>
                    <Button
                        className="max-width"
                        waves="light"
                        onClick={getCurrentLocationFunc}
                        flat
                    >
                        <Icon left>my_location</Icon>
                        location
                    </Button>
                </Col>
                <Col className="no-pd" s={6}>
                    <Button
                        className="max-width"
                        waves="light"
                        onClick={saveMarkerFunc}
                        flat
                    >
                        <Icon left>near_me</Icon>
                        save marker
                    </Button>
                </Col>
            </Row>
            <div id="saved-markers-wrapper">
                {
                    props.savedMarkers.map(marker => (
                        <CardPanel key={marker.id} className="teal">
                              <span className="white-text">
                                {`${marker.latitude}, ${marker.longitude}`}
                              </span>
                        </CardPanel>
                    ))
                }
            </div>
            <Row className="no-mg-bottom pd-top-bottom-16">
                <Col s={6}>
                    <Button
                        className="max-width blue lighten-1"
                        data-place="restaurants"
                        onClick={showPlacesFunc}
                        waves="light"
                    >
                        <Icon left>restaurant</Icon>
                        restaurants
                    </Button>
                </Col>
                <Col s={6}>
                    <Button
                        className="max-width red lighten-1"
                        data-place="bikeShelters"
                        onClick={showPlacesFunc}
                        waves="light"
                    >
                        <Icon left>directions_bike</Icon>
                        Bike shelters
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

Layout.propTypes = {
    marker: PropTypes.object.isRequired,
    savedMarkers: PropTypes.array.isRequired,
    setGeolocation: PropTypes.func.isRequired,
    saveMarker: PropTypes.func.isRequired,
    showPlaces: PropTypes.func.isRequired,
};

export default connect(null, { setGeolocation, saveMarker, showPlaces })(Layout);
