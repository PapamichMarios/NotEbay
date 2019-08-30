import React from 'react';

import { Card, Table, Container, Row, Col, Form } from 'react-bootstrap';

export default class Message extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Row>
                                    <Col md={{span:1}} className="text-right">
                                        <b>Title:</b>
                                        <br/>
                                        <b>From:</b>
                                        <br/>
                                        <b>To:</b>
                                        <br/>
                                        <b>Date:</b>
                                    </Col>

                                    <Col md={2}>
                                        Thesis
                                        <br/>
                                        Delis
                                        <br/>
                                        Me
                                        <br/>
                                        Today
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <p>
                                    how u doing
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}