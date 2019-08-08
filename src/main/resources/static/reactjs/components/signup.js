const React = require('react');
const ReactDOM = require('react-dom');
import Geocode from 'react-geocode';

import '../../css/utils/map.css';
import OpenStreetMapWrapper from './utils/openstreetmapswrapper.js';

import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card, InputGroup, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHome, FaGlobe, FaFile } from 'react-icons/fa';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username:       '',
            password:       '',
            repassword:     '',
            firstName:      '',
            lastName:       '',
            email:          '',
            role:           '',
            phone:          '',
            streetAddress:  '',
            country:        '',
            tin:            '',
            city:           '',
            postalCode:     '',
            lat:            '',
            lng:            '',

            hasError:       false,
            success:        false,
            errorMsg:       ''
        };

        //binding this to submethods
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        //check passwords are matching
        if ( this.state.password !== this.state.repassword)
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
        if (this.state.success) {
            return (
                <Container>
                    <Alert variant="success">
                        <Alert.Heading> One more step to welcome you to our community! </Alert.Heading>
                        <p> A well trained and authorised admin is going to review your application. </p>
                        <p> We promise it will not take long! In the meantime, feel free to browse auctions and items.</p>
                    </Alert>
                </Container>
            )
        } else {
            return (
                    <Container>
                    <Card border="dark">
                      <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Signup </Card.Header>
                      <Card.Body>
                        <Card.Title className="text-center"> Join our community! </Card.Title>
                          <Form id="signup-form"
                            action={this.props.action}
                            method={this.props.method}
                            onSubmit={this.onSubmit} >

                            <Form.Row>
                              <Col>
                                <Form.Group controlId="formUsername">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaUser/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="username" placeholder="Username" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col>
                                <Form.Group controlId="formAddress">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaHome/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="streetAddress" placeholder="Address" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col>
                                <Form.Group controlId="formPostalCode">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaEnvelope/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="postalCode" placeholder="Postal Code" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>
                              </Col>
                            </Form.Row>

                            <Form.Row>
                              <Col>
                                <Form.Group controlId="formPassword">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaLock/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col>
                                <Form.Group controlId="formCity">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaHome/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="city" placeholder="City" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col>
                                <Form.Group controlId="formCountry">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaGlobe/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="country" placeholder="Country" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>
                              </Col>
                            </Form.Row>

                            <Form.Row>
                              <Col md={4}>
                                <Form.Group controlId="formRepeatPassword">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaLock/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="password" name="repassword" placeholder="Re-enter Password" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formFirstName">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaUser/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="firstName" placeholder="First Name" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formLastName">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaUser/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="lastName" placeholder="Last Name" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="emailForm">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaEnvelope/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="email" name="email" placeholder="E-mail" onChange={this.onChange} />
                                  </InputGroup>

                                  <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                  </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formPhone">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaPhone/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="phone" placeholder="Phone Number" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formTIN">
                                  <InputGroup>
                                    <InputGroup.Prepend>
                                      <InputGroup.Text> <FaFile/> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="tin" placeholder="TIN" onChange={this.onChange} />
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col md={8}>
                                  <div className="leaflet">
                                    <OpenStreetMapWrapper/>
                                  </div>
                              </Col>
                            </Form.Row>

                            <Form.Row className>
                              <Col>
                                <p className="font-small white-text d-flex justify-content-end">
                                  Already have an account?
                                  <a href="/login" className="green-text ml-1 font-weight-bold">
                                    Log in
                                  </a>
                                </p>
                              </Col>
                            </Form.Row>

                            <Form.Row className="justify-content-md-center">
                              <ButtonToolbar size="lg">
                                <Col>
                                  <Button type="submit" variant="dark" block> Submit </Button>
                                </Col>

                                <Col>
                                  <Button type="reset" variant="danger" block> Reset </Button>
                                </Col>
                              </ButtonToolbar>
                            </Form.Row>

                            { this.state.hasError ? (
                                <Form.Row>
                                  <Col>
                                    <br />
                                    <Alert variant="danger">
                                        {this.state.errorMsg}
                                    </Alert>
                                  </Col>
                                </Form.Row>
                            ) : (
                                <Form.Row>
                                </Form.Row>
                            )}
                          </Form>
                        </Card.Body>
                      </Card>
                    </Container>
            );
        }
    }
}

Signup.defaultProps = {
    action: '/app/users',
    method: 'POST'
};