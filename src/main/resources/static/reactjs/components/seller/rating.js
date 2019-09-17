import React from 'react';
import StarRatings from 'react-star-ratings';

import getRequest from '../utils/requests/getRequest';
import postRequest from '../utils/requests/postRequest';
import Loading from '../utils/loading/loading';
import * as Constants from '../utils/constants';
import LoadingButton from '../utils/loading/loadingButton';

import { Container, Row, Col, Card, Button, Alert }  from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class SellerRating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loadingButton: false,
            communicationRating: 1,
            serviceRating: 1,

            hasRated: false,
            hasError: false,
            errorMsg: '',
            success: false
        }

        this.changeCommunicationRating = this.changeCommunicationRating.bind(this);
        this.changeServiceRating = this.changeServiceRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeCommunicationRating(newRating, name) {
        this.setState({
            communicationRating: newRating
        });
    }

    changeServiceRating(newRating, name) {
        this.setState({
            serviceRating: newRating
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({loadingButton: true});

        const finalRating = (this.state.communicationRating + this.state.serviceRating) / 2;

        const url = '/app/users/' + this.props.match.params.userId + '/bidderRating';
        const bodyObj = {
            rating: Math.round(finalRating),
            itemId: this.props.match.params.itemId
        };

        postRequest(url, bodyObj)
        .then( response => {
            if(response.error) {
                this.setState({
                    hasError: true,
                    errorMsg: response.msg
                });

                if(response.status === 500) {
                    this.props.history.push('/internal-server-error');
                }

                if(response.status === 404) {
                    this.props.history.push('/buyer-not-found');
                }
            } else {
                this.setState({
                    success: true
                },
                () => {
                    //set loading
                    setTimeout(() => {
                      this.setState({loadingButton: false})
                    }, Constants.TIMEOUT_DURATION);
                });
            }
        })
        .catch(error => console.error('Error:', error));

    }

    componentDidMount() {

        const url = '/app/users/' + this.props.match.params.userId
            + '/bidderRating/ratedAlready'
            + '?itemId=' + this.props.match.params.itemId;

        getRequest(url)
        .then(response => {
            if(response.error) {

                this.setState({
                    hasError: true,
                    errorMsg: response.msg
                });

                if(response.status === 500) {
                    this.props.history.push('/internal-server-error');
                }

                if(response.status === 404) {
                    this.props.history.push('/buyer-not-found');
                }
            } else {

                this.setState({
                    hasRated: response
                },
                () => {
                    setTimeout(() => {
                      this.setState({loading: false})
                    }, Constants.TIMEOUT_DURATION);
                });
            }
        })
        .catch(error => console.error('Error', error));
    }

    render() {

        if(this.state.loading) {
            return <Loading />
        } else {

            //if the seller has rated the buyer already
            if(this.state.hasRated) {
                return(
                    <Container className="navbar-margin">
                        <Row>
                            <Col>
                                <Alert variant='primary'>
                                    <p> You have already submitted a rating for this auction! </p>
                                    <p>
                                        Thanks for your feedback. It is essential for the
                                        improvement of the user experience and our application in general.
                                    </p>
                                </Alert>
                            </Col>
                        </Row>
                    </Container>
                );
            } else {
                if(this.state.success) {
                    return (
                        <Container className="navbar-margin">
                            <Row>
                                <Col>
                                    <Alert variant='success'>
                                        <p> Your rating has been submitted! </p>
                                        <p>
                                            Thanks for your feedback. It is essential for the
                                            improvement of the user experience and our application in general.
                                        </p>
                                    </Alert>
                                </Col>
                            </Row>
                        </Container>
                    );
                } else {
                    return (
                        <Container className="navbar-margin">
                            <Row>
                                <Col md={{offset:4, span:4}}>
                                    <Card>
                                        <Card.Header as="h5" className="text-center bg-dark" style={{color:'white'}}> <b> Leave feedback </b> </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <b> Communication </b>
                                                    <br />
                                                    <span style={{color: 'DimGray', fontSize: '14px'}}>Was the buyer responsive and well behaved?</span>
                                                    <br />
                                                    <StarRatings
                                                        name="communicationRating"
                                                        numberOfStars={Constants.RATING_STARS}
                                                        rating={this.state.communicationRating}
                                                        starRatedColor="SandyBrown"
                                                        starDimension="40px"
                                                        starSpacing="5px"
                                                        changeRating={this.changeCommunicationRating}
                                                    />
                                                </Col>
                                            </Row>

                                            <br/>

                                            <Row>
                                                <Col>
                                                    <b> Sell Again </b>
                                                    <br />
                                                    <span style={{color: 'DimGray', fontSize: '14px'}}>Would you sell again to this buyer?</span>
                                                    <br />
                                                    <StarRatings
                                                        name="shippingRating"
                                                        numberOfStars={Constants.RATING_STARS}
                                                        rating={this.state.serviceRating}
                                                        starRatedColor="SandyBrown"
                                                        starDimension="40px"
                                                        starSpacing="5px"
                                                        changeRating={this.changeServiceRating}
                                                    />
                                                </Col>
                                            </Row>

                                            <br />

                                            <Row>
                                                <Col>
                                                    {this.state.loadingButton ? (
                                                        <Button variant='dark' block disabled>
                                                            <b> Loading </b>
                                                            <LoadingButton />
                                                        </Button>
                                                    ) : (
                                                        <Button variant='dark' block onClick={this.onSubmit}>
                                                            <b> Rate Buyer</b>
                                                        </Button>
                                                    )}
                                                </Col>
                                            </Row>

                                            {this.state.hasError && (
                                                <Row>
                                                    <Col>
                                                        <Alert variant='danger'>
                                                            <p> {this.state.errorMsg} </p>
                                                        </Alert>
                                                    </Col>
                                                </Row>
                                            )}

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    );
                }
            }
        }
    }
}

export default withRouter(SellerRating);