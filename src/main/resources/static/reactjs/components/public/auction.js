import React from 'react';

import getRequestUnauth from '../utils/requests/getRequestUnauthorized';
import Loading from '../utils/loading/loading';
import * as Constants from '../utils/constants';
import decodeTime from '../utils/decoders/timeDecoder';
import decodeDate from '../utils/decoders/dateDecoder';
import OpenStreetMap from '../utils/maps/openStreetMapLarge';
import isAdmin from '../utils/authentication/isAdmin';

import '../../../css/utils/map.css';
import '../../../css/signup/confirmation.css';

import StarRatings from 'react-star-ratings';

import { Container, Row, Col, Carousel, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, Breadcrumb, ListGroup, InputGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class AuctionPublic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            bid: '',
            breadcrumbs: []
        }
    }

    componentDidMount() {

        getRequestUnauth(this.props.action + this.props.match.params.id)
        .then(response => {

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

            //handle images
            let carouselBody = [];
            this.state.bid.images.map( image => {
                carouselBody.push(
                    <Carousel.Item key={image}>
                        <div className="text-center">
                            <img src={'/app/items/' + this.state.bid.id + '/images/' + image} width='450' height= '350'/>
                        </div>
                    </Carousel.Item>
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
                                                    <Carousel fade style={{backgroundColor: 'DimGray'}}>
                                                        {carouselBody}
                                                    </Carousel>
                                                </Col>
                                            </Row>

                                            <br />

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
                                                            <Link to={'/profile/' + this.state.bid.owner.id}>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.bid.owner.username}
                                                                    className="col-user text-primary"
                                                                    style={{cursor: 'pointer'}}
                                                                />
                                                            </Link>
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row}>
                                                        <Form.Label column md="5"> <b> Rating: </b> </Form.Label>

                                                        {this.state.bid.rating != null && this.state.bid.rating > 0? (
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
                                                                defaultValue= {this.state.bid.owner.country}
                                                                className="col-user"
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Tab>
                                            </Tabs>

                                            { this.state.bid.bestBid == null
                                                && !isAdmin()
                                                && this.state.bid.owner.username !== localStorage.getItem('username')
                                                && !this.state.bid.finished
                                                && (
                                                  <Row>
                                                    <Col>
                                                      <br />
                                                      <Alert variant="info">
                                                          Do you fancy it? Create an account and buy it now!
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

AuctionPublic.defaultProps = {
    action: '/app/search/items/'
};

export default withRouter(AuctionPublic);