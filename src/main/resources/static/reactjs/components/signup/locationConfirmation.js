import React from 'react';

import '../../../css/utils/map.css';
import OpenStreetMapsWrapper from '../utils/openStreetMapsWrapper.js';

import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';

export default class LocationConfirmation extends React.Component {
    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    back(e) {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue(e) {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        return (
            <Container>
                <Card border="dark">
                  <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Signup </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-center"> Enter your personal details. </Card.Title>
                    <Form>
                        <Form.Row>
                            <Col>
                                <div className="leaflet">
                                    <OpenStreetMapsWrapper set={true} setGeoLocation={this.props.setGeoLocation} location={this.props.location} />
                                </div>
                            </Col>
                        </Form.Row>

                        <br />

                        <Form.Row>
                            <Col md={{span: 2}}>
                                <Button variant="danger"  block onClick={this.back}> Back </Button>
                            </Col>

                            <Col md={{offset:8}}>
                                <Button variant="success" block onClick={this.saveAndContinue}> Save and Continue </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                  </Card.Body>
                </Card>
            </Container>
        )
    }
}
