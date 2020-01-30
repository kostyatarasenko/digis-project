import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
 Row, Col, Button, TextInput, Card,
} from 'react-materialize';

const Form = ({ onSubmit }) => {
    const [state, updateState] = useState({
        login: '',
        password: '',
    });

    const validateForm = () => {
        let validated = true;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(state.login))) {
            validated = false;
        } else if (state.password.length < 5) {
            validated = false;
        }
        return validated;
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(state);
        } else {
            window.M.toast({ html: 'Wrong data' });
        }
    };

    const handleChangeText = (e) => {
        const inputType = e.target.getAttribute('data-type');
        const inputValue = e.target.value;
        updateState({
            ...state,
            login: inputType === 'login' ? inputValue : state.login,
            password: inputType === 'password' ? inputValue : state.password,
        });
    };

    return (
        <Row>
            <Col s={12} m={6}>
                <form onSubmit={handleOnSubmit}>
                    <Card
                        className="blue-grey darken-1"
                        textClassName="white-text"
                        title="Sign In"
                    >
                        <Row>
                            <TextInput
                                label="Login"
                                data-type="login"
                                s={12}
                                onChange={handleChangeText}
                            />
                            <TextInput
                                label="Password"
                                data-type="password"
                                s={12}
                                onChange={handleChangeText}
                                password
                            />
                            <Button
                                node="button"
                                type="submit"
                                waves="light"
                            >
                                Enter
                            </Button>
                        </Row>
                    </Card>
                </form>
            </Col>
        </Row>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Form;
