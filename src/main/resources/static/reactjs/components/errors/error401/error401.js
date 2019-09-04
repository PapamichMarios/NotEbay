import React from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';

import stopLogo from './unauthorized.png';

export default class Page401 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="navbar-margin text-center">
                <Row>
                    <Col md={{offset: 2}}>
                        <Image src={stopLogo} alt="logo"/>

                        <h3> <b>Error 401</b>: Unauthorized Access to resource. </h3>
                    </Col>
                </Row>
            </Container>
        );
    }
}