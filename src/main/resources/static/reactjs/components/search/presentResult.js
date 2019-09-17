import React from 'react';

import dateDecoder from '../utils/decoders/dateDecoder';
import timeDecoder from '../utils/decoders/timeDecoder';

import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class PresentResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        //each item is represented by a card
        let results = [];
        this.props.items.map( item => {
            results.push (
                <div key={item.id}>
                    <Card border="black" style={{width: '100%'}} >
                        <Card.Body>
                            <Row>
                                <Col md="3">
                                    to put image
                                </Col>

                                <Col md="9">
                                    <Row>
                                        <Col className="body-text">
                                            <Link to={'/auctions/' + item.id}>
                                                <h5> <b>{item.name}</b> </h5>
                                            </Link>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="4">
                                            <Row>
                                                <Col className="header" md="6">
                                                    Bids: <br/>
                                                    Best Bid: <br/>
                                                    Buy Price: <br/>
                                                </Col>

                                                <Col className="body-text" md="6">
                                                    {item.numOfBids} <br/>
                                                    { item.bestBid ? item.bestBid.bidAmount + '$' : '--' } <br/>
                                                    { item.buyPrice ? item.buyPrice + '$' : '--' } <br/>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md="8">
                                            <Row>
                                                <Col className="header" md="4">
                                                    Location: <br/>
                                                    Seller: <br/>
                                                    Time Ending: <br/>
                                                </Col>

                                                <Col className="body-text" md="8">
                                                    {item.location}, {item.country} <br/>
                                                    to put seller <br/>
                                                    {timeDecoder(item.timeEnds) + ', ' + dateDecoder(item.timeEnds)} <br/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <br/>
                </div>
            );
        });

        return (
            <div>
                {results}
            </div>
        );
    }
}