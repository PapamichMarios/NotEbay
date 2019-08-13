import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class AuctionsHomepage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col md={5}>
                         <h3> Auctions </h3>
                    </Col>

                    <Col>
                        <Button size="lg" variant="info">
                          List an item for sale!
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}