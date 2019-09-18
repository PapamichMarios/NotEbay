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
import { FaDollarSign, FaEnvelope, FaStar } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';

class Bid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loadingButton: false,
            bid: '',
            bet: '',
            errorMsg: '',
            hasError: false,
            breadcrumbs: []
        }

        this.messageSeller = this.messageSeller.bind(this);
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

    messageSeller() {
        //redirect to messaging
        this.props.history.push({
            pathname: '/messages/create-message',
            state: { messageTo: this.state.bid.userSeller.username }
        })
    }

    rate() {
        //redirect to rating
        this.props.history.push('/auctions/'+ this.state.bid.id + '/rating/' + this.state.bid.userSeller.id);
    }

    buyItem() {
        //set loading
        this.setState({loadingButton: true});

        const url = this.props.action + this.props.match.params.id + '/bids';
        const bodyObj = {
            bidAmountStr: this.state.bid.buyPrice.toString()
        };

        postRequest(url, bodyObj)
        .then(response => {
            if(response.error) {
                this.setState({
                    hasError: true,
                    errorMsg: response.message,
                    loadingButton: false
                })
            } else {
                //refresh page
                location.reload();
            }
        })
        .catch(error => console.error('Error:', error));
    }

    placeBid() {
        //check if the user miss-clicked
        if (window.confirm('Are you sure you want to place a bid at the current item?')) {
            //set loading
            this.setState({loadingButton: true});

            //make request
            const url = this.props.action + this.props.match.params.id + '/bids';
            const bodyObj = {
                bidAmountStr: this.state.bet.toString()
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
            if(response.error) {
                if(response.status === 500) {
                    this.props.history.push('/internal-server-error');
                }

                if(response.status === 404) {
                    this.props.history.push('/auction-not-found');
                }
            } else {
                this.setState({
                    bid: response,
                    breadcrumbs: response.categories
                },
                () =>
                    //set loading
                    setTimeout(() => {
                      this.setState({loading: false})
                    }, Constants.TIMEOUT_DURATION)
                );
            }
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

            let lastBidder = false;
            if(this.state.bid.bestBid !== null) {
                lastBidder = (this.state.bid.bestBid.username === localStorage.getItem('username') ? true : false);
            }

            let returnButtonOrRating;
            if(this.state.bid.finished) {
                if(this.state.bid.bestBidder != null){
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
                                        <FaStar style={{verticalAlign: 'text-bottom'}} />
                                        <b> Rate Seller </b>
                                    </Button>

                                    <Button variant='dark' block onClick={this.messageSeller}>
                                        <FaEnvelope style={{verticalAlign: 'text-bottom'}} />
                                        <b> Message Seller </b>
                                    </Button>
                                </Col>
                            </Row>
                        );
                    } else {
                        returnButtonOrRating = (
                            <Row>
                                <Col>
                                    <Alert variant='primary'>
                                        <p> The current auction has ended. </p>
                                    </Alert>
                                </Col>
                            </Row>
                        )
                    }
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
                if(this.state.bid.userSeller.username !== localStorage.getItem('username')) {
                    returnButtonOrRating =   (
                        <div>
                        <hr />
                        <Form.Group as={Row}>
                            <Form.Label column md={{offset:2, span:3}}> <b> Place bid: </b> </Form.Label>
                            <Col md={5} className='text-center'>
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

                        <Row>
                            <Col>
                                { this.state.bid.buyPrice ? (
                                    <div>
                                    <Row>
                                        <Col className='text-center'>
                                            <br/>
                                            <p> <b style={{fontSize: '20px'}}> OR </b> </p>
                                        </Col>
                                    </Row>

                                    <br/>

                                    <Row>
                                        <Col md={{offset:2, span:8}} className='text-center'>
                                            { this.state.loadingButton ? (
                                                <Button variant="dark" disabled block>
                                                  <b> Loading... </b>
                                                  <LoadingButton />
                                                </Button>
                                            ) : (
                                                <Button variant="dark" style={{verticalAlign: 'middle'}} onClick={this.buyItem} block>
                                                  <b> Buy Item </b>
                                                </Button>
                                            )}
                                            <br/>
                                            (Buy Price: <b>{this.state.bid.buyPrice} $</b>)
                                        </Col>
                                    </Row>
                                    </div>
                                ) : (
                                    null
                                )}
                            </Col>
                        </Row>
                        </div>
                    );
                } else {
                    returnButtonOrRating = (
                        <Row>
                            <Col>
                                <Alert variant='info'>
                                    <p> You are the seller of this current auction. </p>
                                </Alert>
                            </Col>
                        </Row>
                    );
                }

            }

            let breadcrumbs = [];
            breadcrumbs.push(
                <Breadcrumb.Item
                    key='home'
                    onClick={ () => this.props.history.push('/categories') }
                >
                    All
                </Breadcrumb.Item>
            );

            this.state.bid.categories.map( (category, index) => {

                //handle breadcrumbs before
                let breadcrumbsParents = [];
                for(let i=0; i<=index; i++){
                    breadcrumbsParents.push({
                        name: this.state.breadcrumbs[i].name,
                        id: this.state.breadcrumbs[i].id
                    });
                }

                //link to categories
                breadcrumbs.push(
                    <Breadcrumb.Item
                        key={category.id}
                        onClick={ () => {
                            this.props.history.push({
                                pathname: '/categories',
                                state: {
                                    name: category.name,
                                    id: category.id,
                                    breadcrumbs: breadcrumbsParents
                                }
                            });
                        }}
                    >
                        {category.name}
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
                                        {/* image */}
                                        <Col md={6}>
                                            <Row>
                                                <Col>
                                                    <h3> To put Image</h3>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Card.Title as="h6" className="text-center">
                                                        <b>
                                                            Item Location:
                                                            &nbsp;
                                                            <span style={{color:'DimGray'}}>{this.state.bid.location}</span>,
                                                            <span style={{color:'DimGray'}}> {this.state.bid.country}</span>
                                                        </b>
                                                    </Card.Title>

                                                    <div className="leaflet">
                                                        <OpenStreetMap lat={this.state.bid.geoLat} lng={this.state.bid.geoLong} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>

                                        {/* tabs */}
                                        <Col md={6}>
                                            <Tabs defaultActiveKey="item">
                                                <Tab eventKey="item" title="Item">
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
                                                                    <Link to={'/profile/' + this.state.bid.bestBidder.id}>
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
                                                </Tab>

                                                <Tab eventKey="description" title="Description">
                                                    <br/>
                                                    <p>
                                                        {this.state.bid.description}
                                                    </p>
                                                </Tab>

                                                <Tab eventKey="seller" title="Seller">
                                                    <br/>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Seller: </b> </Form.Label>
                                                        <Col>
                                                            <Link to={'/profile/' + this.state.bid.userSeller.id}>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.bid.userSeller.username}
                                                                    className="col-user text-primary"
                                                                    style={{cursor: 'pointer'}}
                                                                />
                                                            </Link>
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Rating: </b> </Form.Label>

                                                        {this.state.bid.rating != null && this.state.bid.rating > 0 ? (
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
                                                                <b>[{this.state.bid.rating} out of <span style={{color:'SteelBlue'}}>5</span>]</b>
                                                                <br />
                                                                <b style={{color:'DimGray'}}> {this.state.bid.reputation} reputation </b>
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
                                                </Tab>
                                            </Tabs>

                                            {returnButtonOrRating}

                                            { this.state.hasError && (
                                              <Row>
                                                <Col>
                                                  <br />
                                                  <Alert variant="danger">
                                                      {this.state.errorMsg}
                                                  </Alert>
                                                </Col>
                                              </Row>
                                            )}

                                            { lastBidder && (
                                              <Row>
                                                <Col>
                                                  <br />
                                                  <Alert variant="info">
                                                      You are the last bidder of this auction.
                                                  </Alert>
                                                </Col>
                                              </Row>
                                            )}

                                            { this.state.bid.bestBid == null
                                                && this.state.bid.userSeller.username !== localStorage.getItem('username')
                                                && !this.state.bid.finished
                                                && (
                                                  <Row>
                                                    <Col>
                                                      <br />
                                                      <Alert variant="info">
                                                          Do you fancy it? Be the first one to place a bid or buy this item!
                                                      </Alert>
                                                    </Col>
                                                  </Row>
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
}

Bid.defaultProps = {
    action: '/app/items/'
};

export default withRouter(Bid);