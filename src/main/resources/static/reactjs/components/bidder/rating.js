import React from 'react';
import StarRatings from 'react-star-ratings';

import * as Constants from '../utils/constants';
import LoadingButton from '../utils/loading/loadingButton';
import postRequest from '../utils/requests/postRequest';

import { Container, Row, Col, Card, Button, Alert }  from 'react-bootstrap';

export default class BidderRating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            communicationRating: 1,
            shippingRating: 1,
            serviceRating: 1,
            itemRating: 1,

            hasError: false,
            errorMsg: '',
            success: false
        }

        this.changeItemRating = this.changeItemRating.bind(this);
        this.changeCommunicationRating = this.changeCommunicationRating.bind(this);
        this.changeShippingRating = this.changeShippingRating.bind(this);
        this.changeServiceRating = this.changeServiceRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeCommunicationRating(newRating, name) {
        this.setState({
            communicationRating: newRating
        });
    }

    changeShippingRating(newRating, name) {
        this.setState({
            shippingRating: newRating
        });
    }

    changeServiceRating(newRating, name) {
        this.setState({
            serviceRating: newRating
        });
    }

    changeItemRating(newRating, name) {
        this.setState({
            itemRating: newRating
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});

        const finalRating = (this.state.communicationRating +
                            this.state.shippingRating +
                            this.state.itemRating +
                            this.state.serviceRating) / 4;

        const url = '';
        const bodyObj = { rating: finalRating };

        //postRequest(url, bodyObj)
        //.then( response => {
         //   if(response.error) {
          //      this.setState({
            //        hasError: true,
             //       errorMsg: response.msg
             //   });
           // } else {
            //    this.setState({
            //        success: true
            //    });
        //})
        //.catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION)
    }

    render() {
        if(this.state.success) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <Alert variant='success'>
                                Your rating has been submitted! Thanks for your feedback. It is essential for the user experience of our application.
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Row>
                        <Col md={{offset:4, span:4}}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <b> Communication </b>
                                            <br />
                                            <span style={{color: 'DimGray', fontSize: '14px'}}>Was the seller responsive and well behaved?</span>
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
                                            <b> Shipping </b>
                                            <br />
                                            <span style={{color: 'DimGray', fontSize: '14px'}}>Was the item shipped immediately?</span>
                                            <br />
                                            <StarRatings
                                                name="shippingRating"
                                                numberOfStars={Constants.RATING_STARS}
                                                rating={this.state.shippingRating}
                                                starRatedColor="SandyBrown"
                                                starDimension="40px"
                                                starSpacing="5px"
                                                changeRating={this.changeShippingRating}
                                            />
                                        </Col>
                                    </Row>

                                    <br />

                                    <Row>
                                        <Col>
                                            <b> Item </b>
                                            <br />
                                            <span style={{color: 'DimGray', fontSize: '14px'}}>Did the item you received match its description?</span>
                                            <br />
                                            <StarRatings
                                                name="serviceRating"
                                                numberOfStars={Constants.RATING_STARS}
                                                rating={this.state.itemRating}
                                                starRatedColor="SandyBrown"
                                                starDimension="40px"
                                                starSpacing="5px"
                                                changeRating={this.changeItemRating}
                                            />
                                        </Col>
                                    </Row>

                                    <br />

                                    <Row>
                                        <Col>
                                            <b> Service </b>
                                            <br />
                                            <span style={{color: 'DimGray', fontSize: '14px'}}>Would you buy again from this seller?</span>
                                            <br />
                                            <StarRatings
                                                name="serviceRating"
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
                                            {this.state.loading ? (
                                                <Button variant='dark' block disabled>
                                                    <b> Loading </b>
                                                    <LoadingButton />
                                                </Button>
                                            ) : (
                                                <Button variant='dark' block onClick={this.onSubmit}>
                                                    <b> Rate Seller</b>
                                                </Button>
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