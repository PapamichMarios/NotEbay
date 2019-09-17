import React from 'react';

import SellerRatings from './ratingsSeller';
import BidderRatings from './ratingsBidder';

import { Container, Row, Col } from 'react-bootstrap';

export default class RatingsReceived extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <SellerRatings id={this.props.id} />
                    </Col>

                    <Col>
                        <BidderRatings id={this.props.id} />
                    </Col>
                </Row>
            </Container>
        );
    }
}