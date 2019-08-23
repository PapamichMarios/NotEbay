import React from 'react';

import decodeTime from '../../../utils/decoders/timeDecoder';
import decodeDate from '../../../utils/decoders/dateDecoder';
import OpenStreetMap from '../../../utils/maps/openStreetMapLarge';

import '../../../../../css/utils/map.css';
import '../../../../../css/signup/confirmation.css';

import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, ListGroup } from 'react-bootstrap';
import {FaEdit, FaSearchDollar, FaTrash } from 'react-icons/fa';

export default class CurrentAuction extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container fluid style={{paddingLeft:'0px'}}>
                <Row>
                    <Col md={2}>
                        <Card style={{height: '100vh'}}>
                            <Card.Body>
                                <Card.Title className="text-center"> <b> Actions </b> </Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item action onClick={this.props.editAuction}>
                                        <FaEdit style={{verticalAlign: 'baseline'}} />
                                        <span> &ensp; &ensp; </span>
                                        <b> Edit </b>
                                    </ListGroup.Item>

                                    <ListGroup.Item action onClick={this.props.deleteAuction}>
                                        <FaTrash style={{verticalAlign: 'baseline', color:'FireBrick'}} />
                                        <span> &ensp; &ensp; </span>
                                        <b style={{color:'DarkRed'}}> Delete </b>
                                    </ListGroup.Item>
                                </ListGroup>

                                <br />

                                <Card.Title className="text-center"> <b> Listing </b> </Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item action onClick={this.props.checkBidders}>
                                        <FaSearchDollar style={{verticalAlign: 'baseline'}} />
                                        <span> &ensp; &ensp; </span>
                                        <b> Bids </b>
                                    </ListGroup.Item>
                                </ListGroup>
                             </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card border="dark">
                            <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Item #{this.props.auction.id} </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={3}>
                                        <Row>
                                            <h3> To put Image </h3>
                                        </Row>
                                    </Col>

                                    <Col md={6}>
                                        <Tabs defaultActiveKey="details">
                                            <Tab eventKey="details" title="Item Details">
                                                <br/>
                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Name: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue= {this.props.auction.name}
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Description: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue= {this.props.auction.description}
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                { this.props.auction.bestBid ? (
                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Current Best Bid: </b> </Form.Label>
                                                        <Col>
                                                            <Form.Control
                                                                plaintext
                                                                readOnly
                                                                defaultValue= {this.props.auction.bestBid.bidAmount}
                                                                className="col-user"
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                ) : (
                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Current Best Bid: </b> </Form.Label>
                                                        <Col>
                                                            <Form.Control
                                                                plaintext
                                                                readOnly
                                                                defaultValue= '--'
                                                                className="col-user"
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                )}

                                                { this.props.auction.buyPrice ? (
                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Buy Price: </b> </Form.Label>
                                                        <Col>
                                                            <Form.Control
                                                                plaintext
                                                                readOnly
                                                                defaultValue= '--'
                                                                className="col-user"
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                ) : (
                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Buy Price: </b> </Form.Label>
                                                        <Col>
                                                            <Form.Control
                                                                plaintext
                                                                readOnly
                                                                defaultValue= {this.props.auction.buyPrice}
                                                                className="col-user"
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                )}

                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Number of bids: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue= {this.props.auction.numOfBids}
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Time Started: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue= { decodeTime(this.props.auction.timeStarted) +
                                                                            ' ' +
                                                                            decodeDate(this.props.auction.timeStarted) }
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Time Ending: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue= { decodeTime(this.props.auction.timeEnds) +
                                                                            ' ' +
                                                                            decodeDate(this.props.auction.timeEnds) }
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Country: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue= {this.props.auction.country}
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Location: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue= {this.props.auction.location}
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>
                                            </Tab>
                                        </Tabs>
                                    </Col>

                                    <Col>
                                        <Row>
                                            <h3> to put seller </h3>
                                        </Row>

                                        <Row>
                                            <div className="leaflet">
                                                <OpenStreetMap lat={this.props.auction.geoLat} lng={this.props.auction.geoLong} />
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}