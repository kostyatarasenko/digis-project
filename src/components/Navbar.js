import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Navbar } from 'react-materialize';

const NavbarComponent = ({ showMainLink }) => (
    <Navbar
        alignLinks="right"
        menuIcon={<Icon>menu</Icon>}
    >
        {
            showMainLink ? (
                <Link to="/main">
                    Main
                </Link>
            ) : (
                <Link to="/auth">
                    Auth
                </Link>
            )
        }
        <Link to="/about">
            About
        </Link>
    </Navbar>
);

NavbarComponent.propTypes = {
    showMainLink: PropTypes.bool.isRequired,
};

export default NavbarComponent;
