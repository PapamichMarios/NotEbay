import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import SignUpHeader from './signupHeader.js';

import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card, InputGroup, Alert } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaGlobe, FaFile } from 'react-icons/fa';

export default class UserDetails extends React.Component{
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
        const UserDetailsSchema = Yup.object({
            firstName:      Yup.string().label('First Name').min(2, 'Too short!').max(30, 'Too long!').required(),
            lastName:       Yup.string().label('Last Name').min(2, 'Too short!').max(30, 'Too long!').required(),
            phone:          Yup.number().label('Phone Number').positive().min(1000000, 'Too short!').required(),
            tin:            Yup.number().label('TIN').positive().min(1000000, 'Too short!').required(),
            streetAddress:  Yup.string().label('Street Address').min(2, 'Too short!').max(30, 'Too long!').required(),
            postalCode:     Yup.number().label('Postal Code').positive().min(1000, 'Too short!').max(100000, 'Too long!').required(),
            country:        Yup.string().label('Country').min(2, 'Too short!').max(30, 'Too long!').required(),
            city:           Yup.string().label('City').min(2, 'Too short!').max(30, 'Too long!').required()
        });

        return (
            <Container>
                <Card border="dark">
                  <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Signup </Card.Header>
                  <Card.Body>
                    <SignUpHeader
                        type={'user'}
                        setAccountDetails={this.props.setAccountDetails}
                        setUserDetails={this.props.setUserDetails}
                        setLocationDetails={this.props.setLocationDetails}
                        setOverviewDetails={this.props.setOverviewDetails}
                    />

                    <br />
                    <br />

                    <Formik
                        initialValues={{
                            firstName: this.props.values.firstName,
                            lastName: this.props.values.lastName,
                            phone: this.props.values.phone,
                            tin: this.props.values.tin,
                            streetAddress: this.props.values.streetAddress,
                            postalCode: this.props.values.postalCode,
                            country: this.props.values.country,
                            city: this.props.values.city
                        }}
                        validationSchema={UserDetailsSchema}
                        onSubmit={this.saveAndContinue}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isValid,
                        isInvalid,
                        errors,
                        touched,
                        values
                    }) => (
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formFirstName">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaUser/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            onChange={ e => {
                                                handleChange(e)
                                                this.props.onChange(e)
                                            }}
                                            value={values.firstName}
                                            onBlur={handleBlur}
                                            isValid={!errors.firstName && touched.firstName}
                                            isInvalid={errors.firstName && touched.firstName}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.firstName} </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formLastName">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaUser/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={values.lastName}
                                            onChange={ e => {
                                                handleChange(e)
                                                this.props.onChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.lastName && touched.lastName}
                                            isInvalid={errors.lastName && touched.lastName}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.lastName}</Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formPhone">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaPhone/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={values.phone}
                                            onChange={ e => {
                                                handleChange(e)
                                                this.props.onChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.phone && touched.phone}
                                            isInvalid={errors.phone && touched.phone}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.phone}</Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formTIN">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaFile/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="tin"
                                            placeholder="TIN"
                                            value={values.tin}
                                            onChange={ e => {
                                                handleChange(e)
                                                this.props.onChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.tin && touched.tin}
                                            isInvalid={errors.tin && touched.tin}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.tin}</Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formAddress">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaHome/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="streetAddress"
                                            placeholder="Address"
                                            value={values.streetAddress}
                                            onChange={ e => {
                                                handleChange(e)
                                                this.props.onChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.streetAddress && touched.streetAddress}
                                            isInvalid={errors.streetAddress && touched.streetAddress}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.streetAddress} </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formPostalCode">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaEnvelope/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="postalCode"
                                            placeholder="Postal Code"
                                            value={values.postalCode}
                                            onChange={ e => {
                                                handleChange(e)
                                                this.props.onChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.postalCode && touched.postalCode}
                                            isInvalid={errors.postalCode && touched.postalCode}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.postalCode} </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formCity">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaHome/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            value={values.city}
                                            placeholder="City"
                                            onChange={ e => {
                                                handleChange(e)
                                                this.props.onChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.city && touched.city}
                                            isInvalid={errors.city && touched.city}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.city} </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formCountry">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaGlobe/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="country"
                                            value={values.country}
                                            placeholder="Country"
                                            onChange={ e => {
                                                handleChange(e)
                                                this.props.onChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.country && touched.country}
                                            isInvalid={errors.country && touched.country}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.country} </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col md={{span: 2}}>
                                    <Button variant="danger"  block onClick={this.back}> Back </Button>
                                </Col>

                                <Col md={{offset:3}}>
                                    <p> Step 2 of 4 </p>
                                </Col>

                                <Col md={{offset:4}}>
                                    <Button variant="success" block onClick={this.saveAndContinue}> Save and Continue </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    )}
                    </Formik>
                  </Card.Body>
                </Card>
            </Container>
        )
    }
}