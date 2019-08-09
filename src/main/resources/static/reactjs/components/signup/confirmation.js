import React from 'react';
import '../../../css/utils/map.css';
import OpenStreetMapsWrapper from '../utils/openStreetMapsWrapper.js';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHome, FaGlobe, FaFile } from 'react-icons/fa';

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            success:  false,
            errorMsg: ''
        }

    }

    //confirmation submit
    onSubmit(e) {
        e.preventDefault();

        //check passwords are matching
        if ( this.props.password !== this.props.repassword)
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
                        username:       this.state.username,
                        password:       this.state.password,
                        firstName:      this.state.firstName,
                        lastName:       this.state.lastName,
                        email:          this.state.email,
                        role:           'ROLE_VISITOR',
                        phone:          this.state.phone,
                        streetAddress:  this.state.streetAddress,
                        country:        this.state.country,
                        postalCode:     this.state.postalCode,
                        city:           this.state.city,
                        tin:            this.state.tin
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
                this.setState({
                    success: true
                });
            }
        })

        //handle promise error
        .catch(error => console.error('Error:', error));
    }

    render() {
        const ConfirmationSchema = Yup.object({
            username: Yup.string().min(4, 'Too short!').max(30, 'Too long!').required(),
            email: Yup.string().email('Invalid email address').min(4, 'Too short!').max(30, 'Too long!').required(),
            password: Yup.string().min(4, 'Too short!').max(30, 'Too long!').required(),
            repassword: Yup.string().min(4, 'Too short!').max(30, 'Too long!').required(),
            firstName: Yup.string().min(2, 'Too short!').max(30, 'Too long!').required(),
            lastName: Yup.string().min(2, 'Too short!').max(30, 'Too long!').required(),
            phone: Yup.number().positive().min(1000000, 'Too short!').required(),
            tin: Yup.number().positive().min(1000000, 'Too short!').required(),
            streetAddress: Yup.string().min(2, 'Too short!').max(30, 'Too long!').required(),
            postalCode: Yup.number().positive().min(1000, 'Too short!').max(100000, 'Too long!').required(),
            country: Yup.string().min(2, 'Too short!').max(30, 'Too long!').required(),
            city: Yup.string().min(2, 'Too short!').max(30, 'Too long!').required()
        });

        return (
            <Container>
                <Card border="dark">
                  <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Signup </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-center"> Confirm your account details. </Card.Title>
                    <Formik
                        initialValues={{
                            username: this.props.values.username,
                            email: this.props.values.email,
                            password: this.props.values.password,
                            repassword: this.props.values.repassword,
                            firstName: this.props.values.firstName,
                            lastName: this.props.values.lastName,
                            phone: this.props.values.phone,
                            tin: this.props.values.tin,
                            streetAddress: this.props.values.streetAddress,
                            postalCode: this.props.values.postalCode,
                            country: this.props.values.country,
                            city: this.props.values.city
                        }}
                        validationSchema={ConfirmationSchema}
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
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formUsername">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaUser/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            onChange={e => {
                                                handleChange(e)
                                                this.props.onChange(e);
                                            }}
                                            value={values.username}
                                            onBlur={handleBlur}
                                            isValid={!errors.username && touched.username}
                                            isInvalid={errors.username && touched.username}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.username}</Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>
                                </Col>

                                <Col>
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
                                </Col>

                                <Col>
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
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="emailForm">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaEnvelope/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="E-mail"
                                            onChange={e => {
                                                handleChange(e)
                                                this.props.onChange(e);
                                            }}
                                            value={values.email}
                                            onBlur={handleBlur}
                                            isValid={!errors.email && touched.email}
                                            isInvalid={errors.email && touched.email}
                                             />
                                        <Form.Control.Feedback type="invalid"> {errors.email} </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>
                                </Col>

                                <Col>
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
                                </Col>

                                <Col>
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
                                <Col md={4}>
                                    <Form.Group controlId="formPassword">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaLock/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={e => {
                                                handleChange(e)
                                                this.props.onChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.password && touched.password}
                                            isInvalid={errors.password && touched.password}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.password} </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formRepeatPassword">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaLock/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="password"
                                            name="repassword"
                                            placeholder="Re-enter Password"
                                            value={values.repassword}
                                            onChange={e => {
                                                handleChange(e)
                                                this.props.onChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.repassword && touched.repassword}
                                            isInvalid={errors.repassword && touched.repassword}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.repassword} </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>

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
                                </Col>

                                <Col md={8}>
                                    <div className="leaflet">
                                        <OpenStreetMapsWrapper set={false} location={this.props.location} />
                                    </div>
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col md={{span: 2}}>
                                    <Button variant="danger"  block onClick={this.back}> Back </Button>
                                </Col>

                                <Col md={{offset:8}}>
                                    <Button variant="dark" block onClick={this.saveAndContinue}> Submit </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    )}
                    </Formik>
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