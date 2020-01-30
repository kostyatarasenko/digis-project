import { createStore } from 'redux';
import reducer from '../reducers';

const initStore = preloadedStore => (createStore(
    reducer,
    preloadedStore,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));

export default initStore;
