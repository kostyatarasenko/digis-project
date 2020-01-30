import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Container } from 'react-materialize';
import { logIn } from '../reducers';

import Form from '../components/Authorization/Form';
import Preloader from '../components/Preloader';

class Authorization extends PureComponent {
    static propTypes = {
        logIn: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.authUser = this.authUser.bind(this);
    }

    state = {
        pending: false,
    };

    async authUser() {
        this.setState({
            pending: true,
        });
        await axios({
            method: 'get',
            url: process.env.ENTRYPOINT_URL,
            headers: {
                'secret-key': process.env.ENTRYPOINT_SECRET_KEY,
            },
        }).then((response) => {
            this.setState({
                pending: false,
            });
            if (response.data) {
                const payload = jwtDecode(response.data.data).response;
                if (payload.authorized) {
                    this.props.logIn();
                } else {
                    window.M.toast({
                        html: 'User not found',
                    });
                }
            }
        }).catch((error) => {
            this.setState({
                pending: false,
            });
            window.M.toast({
                html: `Something went wrong... ${error.message}`,
            });
        });
    }

    render() {
        return (
            <Container>
                {
                    this.state.pending ? <Preloader /> : <Form onSubmit={this.authUser} />
                }
            </Container>
        );
    }
}

export default connect(null, { logIn })(Authorization);
