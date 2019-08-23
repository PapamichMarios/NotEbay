import React from 'react';

import SignUpHeader from './signupHeader.js';

import '../../../css/utils/mapLarge.css';
import OpenStreetMapsWrapper from '../utils/maps/openStreetMapsWrapper.js';

import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';

export default class LocationConfirmation extends React.Component {
    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    back(e) {
        this.props.prevStep();
    }

    saveAndContinue(e) {
        this.props.nextStep();
    }

    render() {
        return (
            <Container>
                <Card border="dark">
                  <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Signup </Card.Header>
                  <Card.Body>
                  <SignUpHeader
                      type={'location'}
                      setAccountDetails={this.props.setAccountDetails}
                      setUserDetails={this.props.setUserDetails}
                      setLocationDetails={this.props.setLocationDetails}
                      setOverviewDetails={this.props.setOverviewDetails}
                  />

                  <br />
                  <br />

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
                                <Button variant="danger"  block onClick={this.back}> <b> Back </b> </Button>
                            </Col>

                            <Col md={{offset:3, span:2}}>
                                <p> <b> Step 3 of 4 </b> </p>
                            </Col>

                            <Col md={{offset:3, span:2}}>
                                <Button variant="success" block onClick={this.saveAndContinue}> <b> Save and Continue </b> </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                  </Card.Body>
                </Card>
            </Container>
        )
    }
}
