import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import '../../../css/auctions/auctions.css';

export default class AuctionsHomepage extends React.Component {
    constructor(props) {
        super(props);

        this.submitAuction = this.submitAuction.bind(this);
    }

    submitAuction() {
        this.props.history.push('/submitAuction');
    }

    render() {
        return(
            <Container fluid>
                <Row>
                    <Col md={10}>
                         <h3> Auctions </h3>
                    </Col>

                    <Col className="text-center" style={{ borderLeft: '1px solid DimGray', height: '100vh'}}>
                        <Button size="lg" variant="auction" onClick={this.submitAuction}>
                          <b> List an item for
                                <br />
                                SALE! </b>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}