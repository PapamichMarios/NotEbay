import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="navbar-margin">
                <Row>
                    <Col>
                        <h1> Categories </h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}