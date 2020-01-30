import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import LS from '../tools/LocalStorage';

import Navbar from '../components/Navbar';
import Authorization from '../routes/Authorization';
import Map from '../routes/Map';
import About from '../routes/About';

const RouteController = () => {
    const store = useSelector(data => data);
    const LocalStorage = new LS();

    useEffect(() => {
        LocalStorage.set('data', store);
    });

    return (
        <BrowserRouter>
            <Navbar showMainLink={store.user.authorized} />
            <Switch>
                <Route path="/auth">
                    <Authorization />
                </Route>
                <Route path="/main">
                    <Map store={store} />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Switch>
            {
                !store.user.authorized ? <Redirect to="/auth" /> : <Redirect to="/main" />
            }
        </BrowserRouter>
    );
};

export default RouteController;
