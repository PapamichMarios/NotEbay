import React from 'react';

import decodeTime from '../../utils/decoders/timeDecoder';
import decodeDate from '../../utils/decoders/dateDecoder';
import OpenStreetMap from '../../utils/maps/openStreetMapLarge';

import '../../../../css/utils/map.css';
import '../../../../css/signup/confirmation.css';

import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, Breadcrumb, ListGroup, Nav } from 'react-bootstrap';
import {FaEdit, FaSearchDollar, FaTrash, FaHourglassStart } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

class CurrentAuction extends React.Component {

    constructor(props) {
        super(props);

        this.rate = this.rate.bind(this);
    }

    rate() {
        //redirect to rating
        this.props.history.push('/my-auctions/'+ this.props.auction.bestBidder.id + '/rating');
    }

    render() {
        const startTime = decodeTime(this.props.auction.timeStarted);
        const startDate = decodeDate(this.props.auction.timeStarted);

        const endTime = decodeTime(this.props.auction.timeEnds);
        const endDate = decodeDate(this.props.auction.timeEnds);

        let breadcrumbs = [];
        breadcrumbs.push(
            <Breadcrumb.Item key='home' href='/home'>
                Home
            </Breadcrumb.Item>
        );

        this.props.auction.categories.map(category => {
            breadcrumbs.push(
                <Breadcrumb.Item key={category.category}>
                    {category.category}
                </Breadcrumb.Item>
            );
        });

        return(
            <Container fluid>
                <Row>
                    <Col md={2} style={{paddingLeft: '0px'}}>
                        <Card border="light">
                            <ul style={{listStyleType: 'none', height:'100vh'}}>
                                {!this.props.auction.active && !this.props.auction.finished ? (
                                    <div>
                                        <Nav.Link disabled className="text-center">
                                            <b> Actions </b>
                                        </Nav.Link>

                                        <li className='my-list'>
                                            <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.props.editAuction}>
                                                <FaEdit style={{verticalAlign: 'middle'}} size={25} />
                                                <span> &nbsp; &nbsp; </span>
                                                Edit
                                            </Nav.Link>
                                        </li>

                                        <li className='my-list'>
                                            <Nav.Link style={{fontSize: '15px', color: 'DarkRed'}} onClick={this.props.deleteAuction}>
                                                <FaTrash style={{verticalAlign: 'middle'}} size={25} />
                                                <span> &nbsp; &nbsp; </span>
                                                Delete
                                            </Nav.Link>
                                        </li>

                                        <li className='my-list'>
                                            <Nav.Link style={{fontSize: '15px', color: 'DarkGreen'}} onClick={this.props.beginAuction}>
                                                <FaHourglassStart style={{verticalAlign: 'middle'}} size={25} />
                                                <span> &nbsp; &nbsp; </span>
                                                 Start Auction
                                            </Nav.Link>
                                        </li>

                                        <br/>

                                    </div>
                                ) : (
                                    null
                                )}

                                <Nav.Link disabled className="text-center">
                                    <b> Listing </b>
                                </Nav.Link>

                                <li className='my-list'>
                                    <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.props.checkBidders}>
                                        <FaSearchDollar style={{verticalAlign: 'middle'}} size={25} />
                                        <span> &nbsp; &nbsp; </span>
                                        Bids
                                    </Nav.Link>
                                </li>

                            </ul>
                        </Card>
                    </Col>

                    <Col className="navbar-margin">
                        <Card border="dark">
                            <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Item #{this.props.auction.id} </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={3}>
                                        <Row>
                                            <h3> To put Image </h3>
                                        </Row>
                                    </Col>

                                    <Col md={5}>
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
                                                            as="textarea"
                                                            plaintext
                                                            readOnly
                                                            defaultValue= {this.props.auction.description}
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                { this.props.auction.bestBid ? (
                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Current Best Bid : </b> </Form.Label>
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

                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Starting Bid: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue= {this.props.auction.firstBid}
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                { this.props.auction.buyPrice === 0 ? (
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
                                                            defaultValue= { startTime + ' ' + startDate }
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
                                                            defaultValue= { endTime + ' ' + endDate }
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                {!this.props.auction.active && !this.props.auction.finished ? (
                                                    <Row>
                                                        <Col>
                                                            <Alert variant='info'>
                                                                <p>
                                                                    One last step! Please review your item listing and press
                                                                    <b> Submit Auction</b> under the <b>Actions </b>
                                                                    at the left of the page, in order to start the auction.
                                                                </p>

                                                                <p>
                                                                    After starting the auction you cannot edit or delete an item!
                                                                </p>
                                                            </Alert>
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                    null
                                                )}

                                                {this.props.auction.active && !this.props.auction.finished ? (
                                                    <Row>
                                                        <Col>
                                                            <Alert variant='success'>
                                                                <p>
                                                                    The current auction is up and running!
                                                                </p>
                                                            </Alert>
                                                        </Col>
                                                    </Row>
                                                ): (
                                                    null
                                                )}

                                                {this.props.auction.finished ? (
                                                    <Row>
                                                        <Col>
                                                            <Alert variant='primary'>
                                                                <p>
                                                                    The current auction has ended.
                                                                </p>
                                                            </Alert>
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                    null
                                                )}

                                                {this.props.auction.finished && this.props.auction.bestBid ? (
                                                    <Row>
                                                        <Col>
                                                            <Button variant='warning' block onClick={this.rate}>
                                                                <b> Rate Buyer </b>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                    null
                                                )}
                                            </Tab>
                                        </Tabs>
                                    </Col>

                                    <Col>
                                        <Card style={{width: '100%'}}>
                                            <Card.Body>
                                                <Card.Title as="h6" className="text-center">
                                                    <b>
                                                        Item Location
                                                        < br/>
                                                        <span style={{color:'DimGray'}}>{this.props.auction.location}</span>,
                                                        <span style={{color:'DimGray'}}> {this.props.auction.country}</span>
                                                    </b>
                                                </Card.Title>
                                                <div className="leaflet">
                                                    <OpenStreetMap lat={this.props.auction.geoLat} lng={this.props.auction.geoLong} />
                                                </div>
                                            </Card.Body>
                                        </Card>
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

export default withRouter(CurrentAuction);