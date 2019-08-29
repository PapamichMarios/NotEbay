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

import StarRatings from 'react-star-ratings';
import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, Breadcrumb, ListGroup, InputGroup } from 'react-bootstrap';
import { FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class Bid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loadingButton: false,
            bid: '',
            bet: '',
            errorMsg: '',
            hasError: false,
            bought: false
        }

        this.rate = this.rate.bind(this);
        this.buyItem = this.buyItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.placeBid = this.placeBid.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    rate() {
        //redirect to rating
        this.props.history.push('/auctions/'+ this.state.bid.userSeller.id + '/rating');
    }

    buyItem() {
        //set loading
         this.setState({loadingButton: true});

         setTimeout(() => {
           this.setState({
               loadingButton: false,
               bought: true
           })
         }, Constants.TIMEOUT_DURATION)

    }

    placeBid() {
        //check if the user miss-clicked
        if (window.confirm('Are you sure you want to place a bid at the current item?')) {
            //set loading
            this.setState({loadingButton: true});

            //make request
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
                        loadingButton: false
                    });
                } else {
                    //refresh page
                    location.reload();
                }
            })
            .catch(error => console.error('Error:', error));
        }
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
            const startTime = decodeTime(this.state.bid.timeStarted);
            const startDate = decodeDate(this.state.bid.timeStarted);
            const endTime = decodeTime(this.state.bid.timeEnds);
            const endDate = decodeDate(this.state.bid.timeEnds);

            let lastBidder = false;
            if(this.state.bid.bestBid !== null) {
                lastBidder = (this.state.bid.bestBid.username === localStorage.getItem('username') ? true : false);
            }

            let returnButtonOrRating = null;
            if(this.state.bid.finished) {
                if(this.state.bid.bestBidder.username === localStorage.getItem('username')) {
                    returnButtonOrRating =  (
                        <Row>
                            <Col>
                                <Alert variant='success'>
                                    <p>
                                        You have won the auction!
                                    </p>
                                </Alert>

                                <Button variant='warning' block onClick={this.rate}>
                                    <b> Rate Seller </b>
                                </Button>
                            </Col>
                        </Row>
                    );
                } else {
                    returnButtonOrRating =  (
                        <Row>
                            <Col>
                                <Alert variant='primary'>
                                    <p> The current auction has ended. </p>
                                </Alert>
                            </Col>
                        </Row>
                    );
                }
            } else {
                returnButtonOrRating =   (
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

                                { this.state.loadingButton ? (
                                    <Button variant="dark" disabled>
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
                );
            }

            let breadcrumbs = [];
             breadcrumbs.push(
                <Breadcrumb.Item href='/home'>
                    Home
                </Breadcrumb.Item>
             );

            this.state.bid.categories.map(category => {
                breadcrumbs.push(
                    <Breadcrumb.Item>
                        {category.category}
                    </Breadcrumb.Item>
                );
            });

            return (
                <Container fluid>
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

                                                    { this.state.bid.bestBid === null ? (
                                                      <Row>
                                                        <Col>
                                                          <br />
                                                          <Alert variant="info">
                                                              Do you fancy it? Be the first one to place a bid on this item!
                                                          </Alert>
                                                        </Col>
                                                      </Row>
                                                    ) : (
                                                       null
                                                    )}
                                                </Tab>

                                                { this.state.bid.buyPrice ? (
                                                     <Tab eventKey="buy" title="Buy It">
                                                        <br/>
                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Buy Price: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.bid.buyPrice + '$'}
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Col>
                                                                { this.state.loadingButton ? (
                                                                    <Button variant="dark" disabled>
                                                                      <b> Loading... </b>
                                                                      <LoadingButton />
                                                                    </Button>
                                                                ) : (
                                                                    <Button variant="dark" onClick={this.buyItem}>
                                                                      <b> Buy Item </b>
                                                                    </Button>
                                                                )}
                                                            </Col>
                                                        </Form.Group>

                                                        { this.state.bought ? (
                                                          <Row>
                                                            <Col>
                                                              <br />
                                                              <Alert variant="success">
                                                                  Item has been successfully bought.
                                                              </Alert>
                                                            </Col>
                                                          </Row>
                                                        ) : (
                                                           null
                                                        )}
                                                    </Tab>
                                                ) : (
                                                    null
                                                )}

                                            </Tabs>
                                        </Col>

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
                                                    </Card.Body>
                                                </Card>
                                            </Row>

                                            <br />

                                            <Row>
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