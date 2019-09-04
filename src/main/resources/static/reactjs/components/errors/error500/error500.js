import React from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';

import error from './error.png';

export default class Page500 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="navbar-margin text-center">
                <Row>
                    <Col md={{offset: 2}}>
                        <Image src={error} alt="logo"/>

                        <h3> <b>Error 500</b>: Internal Server Error. </h3>
                        <br/>
                        <h5> Something went wrong with our servers. We 'll be fixing it soon! </h5>
                    </Col>
                </Row>
            </Container>
        );
    }
}