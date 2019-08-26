import React from 'react';

import postRequest from '../utils/requests/postRequest';
import getRequest from '../utils/requests/getRequest';
import Loading from '../utils/loading/loading';
import LoadingButton from '../utils/loading/loadingButton.js';
import * as Constants from '../utils/constants';
import decodeTime from '../utils/decoders/timeDecoder';
import decodeDate from '../utils/decoders/dateDecoder';
import OpenStreetMap from '../utils/maps/openStreetMapLarge';

import '../../../css/utils/map.css';
import '../../../css/signup/confirmation.css';

import StarRatingComponent from 'react-star-rating-component';
import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, ListGroup, InputGroup } from 'react-bootstrap';
import { FaDollarSign } from 'react-icons/fa';

export default class Bid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            bid: '',
            bet: '',
            errorMsg: '',
            hasError: false,
        }

        this.onChange = this.onChange.bind(this);
        this.placeBid = this.placeBid.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    placeBid() {
        //set loading
         this.setState({loading: true});

        const url = this.props.action + this.props.match.params.id + '/bids';
        const bodyObj = {
            bidAmount: this.state.bet
        };

        postRequest(url, bodyObj)
        .then(response => {
            if(response.error) {
                this.setState({
                    hasError: true,
                    errorMsg: response.message,
                    loading: false
                });
            } else {
                //refresh page
                location.reload();
            }
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        getRequest(this.props.action + this.props.match.params.id)
        .then(response => {
            console.log(response);
            this.setState({
                bid: response
            });
        })
        .catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION)
    }

    render() {
        if(this.state.loading) {
            return <Loading />;
        } else {
            const endTime = decodeTime(this.state.bid.timeEnds);
            const endDate = decodeDate(this.state.bid.timeEnds);
            const lastBidder = (this.state.bid.bestBid.username === localStorage.getItem('username') ? true : false);

            return (
                <Container fluid>
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
                                            <Tabs defaultActiveKey="details">
                                                <Tab eventKey="details" title="Item Details">
                                                    <br/>
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
                                                                    defaultValue= {this.state.bid.bestBid.bidAmount + ' by ' + this.state.bid.bestBid.username}
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

                                                    { this.state.bid.buyPrice ? (
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
                                                                    defaultValue= {this.state.bid.buyPrice}
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
                                                                defaultValue= { null }
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

                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Country: </b> </Form.Label>
                                                        <Col>
                                                            <Form.Control
                                                                plaintext
                                                                readOnly
                                                                defaultValue= {this.state.bid.country}
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
                                                                defaultValue= {this.state.bid.location}
                                                                className="col-user"
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Place a bid: </b> </Form.Label>
                                                        <Col md={5}>
                                                            <InputGroup>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="bet"
                                                                    onChange= {this.onChange}
                                                                />
                                                                <InputGroup.Append>

                                                                { this.state.loading ? (
                                                                    <Button variant="dark" block disabled>
                                                                      <b> Loading... </b>
                                                                      <LoadingButton />
                                                                    </Button>
                                                                ) : (
                                                                    <Button variant="dark" onClick={this.placeBid}>
                                                                      <b> Submit </b>
                                                                      <FaDollarSign style={{verticalAlign: 'baseline'}} />
                                                                    </Button>
                                                                )}

                                                                </InputGroup.Append>
                                                            </InputGroup>
                                                        </Col>
                                                    </Form.Group>

                                                    { this.state.hasError ? (
                                                      <Row>
                                                        <Col>
                                                          <br />
                                                          <Alert variant="danger">
                                                              {this.state.errorMsg}
                                                          </Alert>
                                                        </Col>
                                                      </Row>
                                                    ) : (
                                                       null
                                                    )}

                                                    { lastBidder ? (
                                                      <Row>
                                                        <Col>
                                                          <br />
                                                          <Alert variant="info">
                                                              You are the last bidder of this auction.
                                                          </Alert>
                                                        </Col>
                                                      </Row>
                                                    ) : (
                                                       null
                                                    )}

                                                </Tab>
                                            </Tabs>
                                        </Col>

                                        <Col>
                                            <Row>
                                                <Card>
                                                    <Card.Body>
                                                    <Card.Title as="h5" className="text-center"> <b> Seller Details </b> </Card.Title>
                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Seller: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.bid.user.username}
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Rating: </b> </Form.Label>
                                                            <Col>
                                                                <StarRatingComponent
                                                                  name="sellerRating"
                                                                  editing={false}
                                                                  starCount={5}
                                                                  value={4}
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Card>
                                            </Row>

                                            <br />

                                            <Row>
                                                <div className="leaflet">
                                                    <OpenStreetMap lat={this.state.bid.geoLat} lng={this.state.bid.geoLong} />
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
}

Bid.defaultProps = {
    action: '/app/items/'
};