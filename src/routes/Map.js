import React, { PureComponent } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMarker, setCenterPosition } from '../reducers';
import '../static/less/style.less';
import '../static/less/font.less';

import Geolocation from '../components/Map/Geolocation';
import Marker from '../components/Map/Marker';
import Places from '../components/Map/Places';
import Controls from '../components/Map/Controls';
import Layout from '../components/Map/Layout';

class MapComponent extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        setMarker: PropTypes.func.isRequired,
        setCenterPosition: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.handleClickMap = this.handleClickMap.bind(this);
        this.handleMoveEnd = this.handleMoveEnd.bind(this);
    }

    handleClickMap(e) {
        this.props.setMarker({
            marker: {
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
            },
            zoom: this.map.leafletElement.getZoom(),
        });
    }

    handleMoveEnd(e) {
        const latLng = e.target.getCenter();
        this.props.setCenterPosition({
            center: {
                latitude: latLng.lat,
                longitude: latLng.lng,
            },
            zoom: e.target._zoom,
        });
    }

    render() {
        const {
            zoom,
            geolocation,
            marker,
            center,
            selectedMarker,
            savedMarkers,
            placeType,
        } = this.props.store;
        let position;
        switch (selectedMarker) {
            case 'marker':
                position = [marker.latitude, marker.longitude];
                break;
            case 'geolocation':
                position = [geolocation.latitude, geolocation.longitude];
                break;
            case 'place':
                position = [center.latitude, center.longitude];
                break;
            default:
                position = [marker.latitude, marker.longitude];
        }
        return (
            <>
                <Map
                    ref={(ref) => { this.map = ref; }}
                    zoom={zoom}
                    center={position}
                    onClick={this.handleClickMap}
                    onMoveend={this.handleMoveEnd}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
                    />
                    {
                        geolocation ? (
                            <Geolocation geolocation={geolocation} />
                        ) : null
                    }
                    <Marker marker={marker} />
                    {
                        placeType ? <Places placeType={placeType} /> : null
                    }
                </Map>
                <div id="wrapper">
                    <Controls zoom={zoom} />
                    <Layout marker={marker} savedMarkers={savedMarkers} />
                </div>
            </>
        );
    }
}

export default connect(null, { setMarker, setCenterPosition })(MapComponent);
