import React, { PureComponent } from 'react';
import { Container } from 'react-materialize';

import Author from '../components/About/Author';

class About extends PureComponent {
    render() {
        return (
            <Container>
                <Author />
            </Container>
        );
    }
}

export default About;
