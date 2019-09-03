import React from 'react';
import StarRatings from 'react-star-ratings';

import getRequest from '../utils/requests/getRequest';
import Loading from '../utils/loading/loading';
import * as Constants from '../utils/constants';
import decodeTime from '../utils/decoders/timeDecoder';
import decodeDate from '../utils/decoders/dateDecoder';
import OpenStreetMap from '../utils/maps/openStreetMapLarge';

import '../../../css/utils/map.css';
import '../../../css/signup/confirmation.css';

import { FaFileExport } from 'react-icons/fa';
import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, Breadcrumb, ListGroup, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Bid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            bid: '',
            errorMsg: '',
            hasError: false,
        }
    }

    componentDidMount() {
        getRequest(this.props.action + this.props.match.params.id)
        .then(response => {
            this.setState({
                bid: response
            },
            () =>
                //set loading
                setTimeout(() => {
                  this.setState({loading: false})
                }, Constants.TIMEOUT_DURATION)
            );
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        if(this.state.loading) {
            return <Loading />;
        } else {
            const startTime = decodeTime(this.state.bid.timeStarted);
            const startDate = decodeDate(this.state.bid.timeStarted);
            const endTime = decodeTime(this.state.bid.timeEnds);
            const endDate = decodeDate(this.state.bid.timeEnds);

            let returnButtonOrRating = null;
            if(this.state.bid.finished) {
                returnButtonOrRating =  (
                    <Row>
                        <Col>
                            <Alert variant='info'>
                                <p>
                                    The auction has ended.
                                </p>
                            </Alert>
                        </Col>
                    </Row>
                );
            } else {
                returnButtonOrRating = (
                    <Row>
                        <Col>
                            <Alert variant='success'>
                                <p>
                                    The auction is up and running.
                                </p>
                            </Alert>
                        </Col>
                    </Row>
                )
            }

            let breadcrumbs = [];
             breadcrumbs.push(
                <Breadcrumb.Item key='home' href='/home'>
                    Home
                </Breadcrumb.Item>
             );

            this.state.bid.categories.map(category => {
                breadcrumbs.push(
                    <Breadcrumb.Item key={category.category}>
                        {category.category}
                    </Breadcrumb.Item>
                );
            });

            return (
                <Container fluid className="navbar-margin">
                    <Row>
                        <Col>
                            <Breadcrumb>
                                {breadcrumbs}
                            </Breadcrumb>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card border="dark">
                                <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Item #{this.state.bid.id} </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={3}>
                                            <Row>
                                                <h3> To put Image Carousel</h3>
                                            </Row>
                                        </Col>

                                        <Col md={6}>
                                            <br/>
                                            <Card.Title as="h4" className="text-center"> <b> Item Details </b> </Card.Title>
                                            <Form.Group as={Row}>
                                                <Form.Label column md="5"> <b> Name: </b> </Form.Label>
                                                <Col>
                                                    <Form.Control
                                                        plaintext
                                                        readOnly
                                                        defaultValue= {this.state.bid.name}
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
                                                        defaultValue= {this.state.bid.description}
                                                        className="col-user"
                                                    />
                                                </Col>
                                            </Form.Group>

                                            { this.state.bid.bestBid ? (
                                                <Form.Group as={Row}>
                                                    <Form.Label column md="5"> <b> Current Best Bid: </b> </Form.Label>
                                                    <Col>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue= {this.state.bid.bestBid.bidAmount + '$'}
                                                            className="col-user"
                                                        />
                                                        <span>
                                                            by &nbsp;
                                                            <Link to='#'>
                                                                <b>{this.state.bid.bestBidder.username} </b>
                                                            </Link>
                                                        </span>
                                                    </Col>
                                                </Form.Group>
                                            ) : (
                                                <div>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Starting Bid: </b> </Form.Label>
                                                        <Col>
                                                            <Form.Control
                                                                plaintext
                                                                readOnly
                                                                defaultValue= {this.state.bid.firstBid + '$'}
                                                                className="col-user"
                                                            />
                                                        </Col>
                                                    </Form.Group>

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
                                                </div>
                                            )}

                                            <Form.Group as={Row}>
                                                <Form.Label column md="5"> <b> Number of bids: </b> </Form.Label>
                                                <Col>
                                                    <Form.Control
                                                        plaintext
                                                        readOnly
                                                        defaultValue= {this.state.bid.numOfBids}
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

                                            {returnButtonOrRating}

                                        <Col>
                                            <Row>
                                                <Card style={{width: '100%'}}>
                                                    <Card.Body>
                                                    <Card.Title as="h6" className="text-center"> <b> Seller Details </b> </Card.Title>
                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Seller: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.bid.userSeller.username}
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Rating: </b> </Form.Label>

                                                            {this.state.bid.rating !== null ? (
                                                                <Col>
                                                                    <StarRatings
                                                                      name="sellerRating"
                                                                      numberOfStars={Constants.RATING_STARS}
                                                                      rating={this.state.bid.rating}
                                                                      starRatedColor="SandyBrown"
                                                                      starDimension="18px"
                                                                      starSpacing="2px"
                                                                    />
                                                                    <br />
                                                                    (<b style={{fontSize: '17.5px'}}>{this.state.bid.rating}</b>/<span style={{color:'SteelBlue'}}>5</span>)
                                                                </Col>
                                                            ) : (
                                                                <Col>
                                                                    <StarRatings
                                                                      name="sellerRating"
                                                                      numberOfStars={Constants.RATING_STARS}
                                                                      rating={0}
                                                                      starRatedColor="SandyBrown"
                                                                      starDimension="18px"
                                                                      starSpacing="2px"
                                                                    />
                                                                    <br />
                                                                    <b style={{fontSize:'15px', color:'SandyBrown'}}> This seller has not received a review yet. </b>
                                                                </Col>
                                                            )}

                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Country: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.bid.userSeller.country}
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Row>
                                                            <Col>
                                                                <Button variant="primary">
                                                                    <FaFileExport style={{verticalAlign: 'baseline'}} />
                                                                    <b> Export Auction </b>
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Row>

                                            <br />

                                            <Row>
                                                <Col>
                                                    <Card style={{width: '100%'}}>
                                                        <Card.Body>
                                                            <Card.Title as="h6" className="text-center">
                                                                <b>
                                                                    Item Location
                                                                    < br/>
                                                                    <span style={{color:'DimGray'}}>{this.state.bid.location}</span>,
                                                                    <span style={{color:'DimGray'}}> {this.state.bid.country}</span>
                                                                </b>
                                                            </Card.Title>
                                                            <div className="leaflet">
                                                                <OpenStreetMap lat={this.state.bid.geoLat} lng={this.state.bid.geoLong} />
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
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
}

Bid.defaultProps = {
    action: '/app/items/'
};