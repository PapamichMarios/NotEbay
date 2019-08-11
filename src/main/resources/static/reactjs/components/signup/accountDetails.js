import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import SignUpHeader from './signupHeader.js';

import { ButtonGroup, ButtonToolbar, Container, Row, Col, Button, Card, InputGroup, Alert, Form, Image } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHome, FaGlobe, FaFile } from 'react-icons/fa';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';

export default class AccountDetails extends React.Component{
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    saveAndContinue(e) {
        this.props.nextStep();
    }

    render(){
        const AccountDetailsSchema = Yup.object({
            username:   Yup.string().label('Username').min(4, 'Too short!').max(30, 'Too long!').required(),
            email:      Yup.string().label('Email').email('Invalid email address').min(4, 'Too short!').max(30, 'Too long!').required(),
            password:   Yup.string().label('Password').min(8, 'Too short!').max(45, 'Too long!').required(),
            confirmPassword: Yup.string().label('Confirm password').min(8, 'Too short!').max(45, 'Too long!').required()
                                .test('passwords-match', 'Field Password and Confirm Password must match!',
                                        function(value) {
                                          return this.parent.password === value;
                                        })
        });

        return (
            <Container>
                <Card border="dark">
                  <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Signup </Card.Header>
                  <Card.Body>
                    <SignUpHeader
                        type={'account'}
                        setAccountDetails={this.props.setAccountDetails}
                        setUserDetails={this.props.setUserDetails}
                        setLocationDetails={this.props.setLocationDetails}
                        setOverviewDetails={this.props.setOverviewDetails}
                    />

                    <br />
                    <br />
                    <Formik
                        initialValues={{
                            username: this.props.values.username,
                            email: this.props.values.email,
                            password: this.props.values.password,
                            confirmPassword: this.props.values.confirmPassword
                        }}
                        validationSchema={AccountDetailsSchema}
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

                                      <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                      </Form.Text>
                                    </Form.Group>

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

                                    <Form.Group controlId="formConfirmPassword">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text> <FaLock/> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={values.confirmPassword}
                                            onChange={e => {
                                                handleChange(e)
                                                this.props.onChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            isValid={!errors.confirmPassword && touched.confirmPassword}
                                            isInvalid={errors.confirmPassword && touched.confirmPassword}
                                            />
                                        <Form.Control.Feedback type="invalid"> {errors.confirmPassword} </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col md={{span:1, offset:5}}>
                                    <p> Step 1 of 4 </p>
                                </Col>

                                <Col md={{offset: 4}}>
                                    <Button type="submit" variant="success" block> Save and Continue </Button>
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