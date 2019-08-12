import React from 'react';
import '../../../css/utils/map.css';
import '../../../css/signup/confirmation.css';

import OpenStreetMapsWrapperLatLng from '../utils/openStreetMapsWrapperLatLng.js';
import SignUpHeader from './signupHeader.js';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show:false,
            hasError: false,
            errorMsg: ''
        }

        this.hidePassword = this.hidePassword.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.back = this.back.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    showPassword() {
        this.setState({
            show:true
        });
    }

    hidePassword() {
        this.setState({
            show:false
        });
    }

    back(e) {
        this.props.prevStep();
    }

    //confirmation submit
    onSubmit(e) {
        //check passwords are matching
        if ( this.props.values.password !== this.props.values.confirmPassword)
        {
            this.setState({
                hasError: true,
                errorMsg: 'Passwords given do not match.'
            });

            return ;
        }

        //make the request
        fetch(this.props.action, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: this.props.method,
            body: JSON.stringify({
                        username:       this.props.values.username,
                        password:       this.props.values.password,
                        firstName:      this.props.values.firstName,
                        lastName:       this.props.values.lastName,
                        email:          this.props.values.email,
                        phone:          this.props.values.phone,
                        streetAddress:  this.props.values.streetAddress,
                        country:        this.props.values.country,
                        postalCode:     this.props.values.postalCode,
                        city:           this.props.values.city,
                        tin:            this.props.values.tin,

                        jgp: {
                            geoLat: this.props.values.lat,
                            geoLong: this.props.values.lng
                        }
            })
        })
        .then(response => response.json())

        //print response
        .then(response => {
            console.log('signUpResponse:' + JSON.stringify(response));
            if (!response.success) {
                this.setState({
                    hasError: true,
                    errorMsg: response.message
                });
            } else {
                //go to final success step
                this.props.nextStep();
            }
        })

        //handle promise error
        .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <Container>
                <Card border="dark">
                  <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Signup </Card.Header>
                  <Card.Body>
                    <SignUpHeader
                        type={'overview'}
                        setAccountDetails={this.props.setAccountDetails}
                        setUserDetails={this.props.setUserDetails}
                        setLocationDetails={this.props.setLocationDetails}
                        setOverviewDetails={this.props.setOverviewDetails}
                    />

                    <br />
                    <br />

                    <Form>
                        <Form.Row>
                            <Col md={5}>
                               <Form.Group as={Row} controlId="formUsername">
                                 <Form.Label column md="5"> <b> Username: </b> </Form.Label>
                                 <Col>
                                   <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={this.props.values.username}
                                        className="col-user"
                                   />
                                 </Col>
                               </Form.Group>
                            </Col>

                            <Col>
                               <Form.Group as={Row} controlId="formStreetAddress">
                                 <Form.Label column> <b> Street Address: </b> </Form.Label>
                                 <Col>
                                   <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={this.props.values.streetAddress}
                                        className="col-user"
                                    />
                                 </Col>
                               </Form.Group>
                            </Col>

                            <Col>
                               <Form.Group as={Row} controlId="formPostalCode">
                                 <Form.Label column> <b> Postal Code: </b></Form.Label>
                                 <Col>
                                   <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={this.props.values.postalCode}
                                        className="col-user"
                                   />
                                 </Col>
                               </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col md={5}>
                               <Form.Group as={Row} controlId="formEmail">
                                 <Form.Label column md="5"> <b> Email: </b> </Form.Label>
                                 <Col>
                                   <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={this.props.values.email}
                                        className="col-user"
                                    />
                                 </Col>
                               </Form.Group>
                           </Col>

                            <Col>
                                <Form.Group as={Row} controlId="formCity">
                                    <Form.Label column> <b> City: </b> </Form.Label>
                                    <Col>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={this.props.values.city}
                                            className="col-user"
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group as={Row} controlId="formCountry">
                                    <Form.Label column> <b> Country: </b> </Form.Label>
                                    <Col>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={this.props.values.country}
                                            className="col-user"
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col md={5}>
                                { !this.state.show ? (
                                    <div>
                                        <Form.Group as={Row}>
                                            <Form.Label column md="5"> <b> Password: </b> </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    type="password"
                                                    plaintext
                                                    readOnly
                                                    defaultValue={this.props.values.password}
                                                    className="col-user"
                                                />
                                            </Col>
                                        </Form.Group>

                                         <Form.Group as={Row}>
                                            <Form.Label column md="5"> <b> Confirm Password: </b> </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    type="password"
                                                    plaintext
                                                    readOnly
                                                    defaultValue={this.props.values.confirmPassword}
                                                    className="col-user"
                                                />
                                                <Form.Check type="checkbox" label="Show Passwords" onClick={this.showPassword} />
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    ) : (
                                    <div>
                                        <Form.Group as={Row}>
                                            <Form.Label column md="5"> <b> Password: </b> </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    plaintext
                                                    readOnly
                                                    defaultValue={this.props.values.password}
                                                    className="col-user"
                                                    onClick={() => this.type='text'}
                                                />
                                            </Col>
                                        </Form.Group>

                                         <Form.Group as={Row}>
                                            <Form.Label column md="5"> <b> Confirm Password: </b> </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    plaintext
                                                    readOnly
                                                    defaultValue={this.props.values.confirmPassword}
                                                    className="col-user"
                                                />
                                                <Form.Check type="checkbox" label="Hide Passwords" onClick={this.hidePassword} />
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    )
                                }
                                 <Form.Group as={Row} controlId="formFirstName">
                                    <Form.Label column md="5"> <b> First Name: </b> </Form.Label>
                                    <Col>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={this.props.values.firstName}
                                            className="col-user"
                                        />
                                    </Col>
                                </Form.Group>

                                 <Form.Group as={Row} controlId="formLastName">
                                    <Form.Label column md="5"> <b> Last Name: </b> </Form.Label>
                                    <Col>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={this.props.values.lastName}
                                            className="col-user"
                                        />
                                    </Col>
                                </Form.Group>

                                 <Form.Group as={Row} controlId="formPhone">
                                    <Form.Label column md="5"> <b> Phone Number: </b> </Form.Label>
                                    <Col>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={this.props.values.phone}
                                            className="col-user"
                                        />
                                    </Col>
                                </Form.Group>

                                 <Form.Group as={Row} controlId="formTin">
                                    <Form.Label column md="5"> <b> TIN: </b> </Form.Label>
                                    <Col>
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={this.props.values.tin}
                                            className="col-user"
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md={7}>
                                <div className="leaflet">
                                    <OpenStreetMapsWrapperLatLng lat={this.props.values.lat} lng={this.props.values.lng} />
                                </div>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col md={{span: 2}}>
                                <Button variant="danger"  block onClick={this.back}> Back </Button>
                            </Col>

                            <Col md={{offset:3}}>
                                <p> Step 4 of 4 </p>
                            </Col>

                            <Col md={{offset:4, span: 2}}>
                                <Button variant="dark" block onClick={this.onSubmit}> Submit </Button>
                            </Col>
                        </Form.Row>

                        { this.state.hasError ? (
                                <Form.Row>
                                    <Col>
                                        <Alert variant="danger">
                                            <p> {this.state.errorMsg} </p>
                                        </Alert>
                                    </Col>
                                </Form.Row>
                            ) : (
                                null
                            )
                        }

                    </Form>
                  </Card.Body>
                </Card>
            </Container>
        );
    }
}

Confirmation.defaultProps = {
    action: '/app/users',
    method: 'POST'
};