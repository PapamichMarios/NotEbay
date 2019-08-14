import React from 'react';

import Loading from '../utils/loading';
import * as Constants from '../utils/constants';
import '../../../css/signup/confirmation.css';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default class Auction extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            auction : '',
            loading: true
        };
    }

    componentDidMount() {
        fetch(this.props.action + this.props.match.params.id, {
               headers: {
                   'Accept': 'application/json',
                   'Authorization': Constants.ACCESS_TOKEN
               },
               method: this.props.method
            })
            .then(data => data.json())
            .then(data => {
                console.log(JSON.stringify(data));
                this.setState({
                    auction: data
                });
            })
            .catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION)
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        } else {
           return (
                <Container>
                    <Card border="dark">
                        <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Item #{this.state.auction.id} </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <h3> To put Image </h3>
                                </Col>

                                <Col md={6}>
                                    <Form.Group as={Row}>
                                        <Form.Label column md="5"> <b> Name: </b> </Form.Label>
                                        <Col>
                                            <Form.Control
                                                plaintext
                                                readOnly
                                                defaultValue= {this.state.auction.name}
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
                                                defaultValue= {this.state.auction.description}
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
                                                defaultValue= {this.state.auction.currBestBid}
                                                className="col-user"
                                            />
                                        </Col>
                                    </Form.Group>

                                    { this.state.auction.buyPrice ? (
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
                                    ) : (
                                        <Form.Group as={Row}>
                                            <Form.Label column md="5"> <b> Current Best Bid: </b> </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    plaintext
                                                    readOnly
                                                    defaultValue= {this.state.auction.buyPrice}
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
                                                    defaultValue= {this.state.auction.numOfBids}
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
                                                    defaultValue= {this.state.auction.timeStarted}
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
                                                    defaultValue= {this.state.auction.timeEnds}
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
                                                    defaultValue= {this.state.auction.country}
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
                                                    defaultValue= {this.state.auction.location}
                                                    className="col-user"
                                                />
                                            </Col>
                                        </Form.Group>
                                </Col>

                                <Col>
                                    <h3> to put seller </h3>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
           );
        }
    }
}

Auction.defaultProps = {
    action: '/app/items/',
    method: 'GET'
};