import React from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';

import notFound from './notFound.png';

export default class Page404 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="navbar-margin text-center">
                <Row>
                    <Col md={{offset: 2}}>
                        <Image src={notFound} alt="logo"/>

                        <h3> <b>Error 404</b>: Resource not found. </h3>
                    </Col>
                </Row>
            </Container>
        );
    }
}