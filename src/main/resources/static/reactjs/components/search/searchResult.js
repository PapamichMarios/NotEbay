import React from 'react';

import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={2} style={{paddingLeft: '0px'}}>
                        <Card border="light">
                            <ul style={{listStyleType: 'none', height:'100vh'}}>
                                <Nav.Link disabled className="text-center">
                                    <b> Category </b>
                                </Nav.Link>

                                <li className='my-list'>
                                    <Nav.Link style={{fontSize: '15px', color: 'Black'}} >

                                    </Nav.Link>
                                </li>

                                <Nav.Link disabled className="text-center">
                                    <b> Item Location </b>
                                </Nav.Link>

                                <li className='my-list'>
                                    <Nav.Link style={{fontSize: '15px', color: 'Black'}} >

                                    </Nav.Link>
                                </li>

                                <Nav.Link disabled className="text-center">
                                    <b> Price Range </b>
                                </Nav.Link>

                                <li className='my-list'>
                                    <Nav.Link style={{fontSize: '15px', color: 'Black'}} >

                                    </Nav.Link>
                                </li>
                            </ul>
                        </Card>
                    </Col>

                    <Col md="9">

                    </Col>
                </Row>
            </Container>
        );
    }
}