import { createAction, createReducer } from 'redux-act';

export const logIn = createAction();
export const setGeolocation = createAction();
export const setMarker = createAction();
export const saveMarker = createAction();
export const showPlaces = createAction();
export const setCenterPosition = createAction();
export const setZoomValue = createAction();

const reducer = createReducer({
    [logIn]: store => (
        {
            ...store,
            user: {
                authorized: true,
            },
        }
    ),
    [setGeolocation]: (store, payload) => (
        {
            ...store,
            geolocation: payload,
            selectedMarker: 'geolocation',
            zoom: 14,
        }
    ),
    [setMarker]: (store, payload) => (
        {
            ...store,
            marker: payload.marker,
            selectedMarker: 'marker',
            zoom: payload.zoom,
        }
    ),
    [saveMarker]: (store, payload) => (
        {
            ...store,
            savedMarkers: [payload, ...store.savedMarkers],
        }
    ),
    [showPlaces]: (store, payload) => (
        {
            ...store,
            center: payload.center,
            selectedMarker: 'place',
            zoom: 13,
            placeType: payload.placeType,
        }
    ),
    [setCenterPosition]: (store, payload) => (
        {
            ...store,
            center: payload.center,
            zoom: payload.zoom ? payload.zoom : store.zoom,
        }
    ),
    [setZoomValue]: (store, payload) => (
        {
            ...store,
            zoom: payload,
        }
    ),
});

export default reducer;
