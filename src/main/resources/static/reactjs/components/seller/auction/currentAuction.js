import React from 'react';

import decodeTime from '../../utils/decoders/timeDecoder';
import decodeDate from '../../utils/decoders/dateDecoder';
import OpenStreetMap from '../../utils/maps/openStreetMapLarge';

import '../../../../css/utils/map.css';
import '../../../../css/signup/confirmation.css';

import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, Breadcrumb, ListGroup, Nav } from 'react-bootstrap';
import { FaEdit, FaSearchDollar, FaTrash, FaHourglassStart, FaStar, FaEnvelope } from 'react-icons/fa';
import { withRouter, Link } from 'react-router-dom';

class CurrentAuction extends React.Component {

    constructor(props) {
        super(props);

        this.rate = this.rate.bind(this);
        this.messageBuyer = this.messageBuyer.bind(this);
    }

    rate() {
        //redirect to rating
        this.props.history.push('/my-auctions/'+ this.props.auction.bestBidder.id + '/rating');
    }

    messageBuyer() {
        //redirect to messaging
        this.props.history.push({
            pathname: '/messages/create-message',
            state: { messageTo: this.props.auction.bestBidder.username }
        })
    }

    render() {
        const startTime = decodeTime(this.props.auction.timeStarted);
        const startDate = decodeDate(this.props.auction.timeStarted);

        const endTime = decodeTime(this.props.auction.timeEnds);
        const endDate = decodeDate(this.props.auction.timeEnds);

        let breadcrumbs = [];
        breadcrumbs.push(
            <Breadcrumb.Item
                key='home'
                onClick={ () => this.props.history.push('/categories') }
            >
                All Categories
            </Breadcrumb.Item>
        );

        this.props.auction.categories.map(category => {
            breadcrumbs.push(
                <Breadcrumb.Item
                    key={category.id}
                    onClick={ () => {
                        this.props.history.push({
                            pathname: '/searchResults?category=' + category.id,
                            state: {
                                category: category.name,
                                id: category.id
                            }
                        });
                    }}
                >
                    {category.name}
                </Breadcrumb.Item>
            );
        });

        return(
            <Container fluid>
                <Row>
                    {/* sidebar for the seller */}
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

                    {/* item details */}
                    <Col className="navbar-margin">

                        <Breadcrumb>
                            {breadcrumbs}
                        </Breadcrumb>

                        <Card border="dark">
                            <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Item #{this.props.auction.id} </Card.Header>
                            <Card.Body>
                                <Row>
                                    {/* image & map */}
                                    <Col md={6}>
                                        <Row>
                                            <Col>
                                                <h3> To put Image </h3>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <Card.Title as="h6" className="text-center">
                                                    <b>
                                                        Item Location:
                                                        &nbsp;
                                                        <span style={{color:'DimGray'}}>{this.props.auction.location}</span>,
                                                        <span style={{color:'DimGray'}}> {this.props.auction.country}</span>
                                                    </b>
                                                </Card.Title>

                                                <div className="leaflet">
                                                    <OpenStreetMap lat={this.props.auction.geoLat} lng={this.props.auction.geoLong} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                    {/* tabs */}
                                    <Col md={6}>
                                        <Tabs defaultActiveKey="item" id="item-tabs">
                                            <Tab eventKey="item" title="Item">
                                                <br/>
                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Name: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue={this.props.auction.name}
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
                                                                defaultValue= {this.props.auction.bestBid.bidAmount + '$'}
                                                                className="col-user"
                                                            />
                                                            <span>
                                                                by &nbsp;
                                                                <Link to='#'>
                                                                    <b>{this.props.auction.bestBidder.username} </b>
                                                                </Link>
                                                            </span>
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
                                                            defaultValue= {this.props.auction.firstBid + '$'}
                                                            className="col-user"
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                { this.props.auction.buyPrice === null ? (
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
                                                                defaultValue= {this.props.auction.buyPrice + '$'}
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
                                            </Tab>

                                            <Tab eventKey="desc" title="Description">
                                                <br/>
                                                <p>
                                                    {this.props.auction.description}
                                                </p>
                                            </Tab>
                                        </Tabs>

                                        {/* various info alert boxes */}
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
                                                        <FaStar style={{verticalAlign: 'text-bottom'}} />
                                                        <b> Rate Buyer </b>
                                                    </Button>

                                                    <Button variant='dark' block onClick={this.messageBuyer}>
                                                        <FaEnvelope style={{verticalAlign: 'text-bottom'}} />
                                                        <b> Message Buyer </b>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        ) : (
                                            null
                                        )}
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