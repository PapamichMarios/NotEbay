const React = require('react');
const ReactDOM = require('react-dom');

import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHome, FaGlobe, FaFile } from 'react-icons/fa';

export default class Signup extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: '',
            password: '',
            repassword:'',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            country: '',
            tin: '' };

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
        console.log(this.state.username);
        console.log(this.state.password);
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.email);
        console.log(this.state.role);
        console.log(this.state.phone);
        console.log(this.state.address);
        console.log(this.state.country);
        console.log(this.state.tin);

        fetch(this.props.action, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: this.props.method,
            body: JSON.stringify({
                        username:   this.state.username,
                        password:   this.state.password,
                        firstName:  this.state.firstName,
                        lastName:   this.state.lastName,
                        email:      this.state.email,
                        role:       'ROLE_VISITOR'})
                        //phone: this.state.phone,
                        //address: this.state.address,
                        //country: this.state.country,
                        //tin: this.state.tin})
        }).then(response => response.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));

        this.setState({
            username: '',
            password: '',
            repassword:'',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            country: '',
            tin: '' });
    }

    render() {
        return (
                <Container>
                <Card border="dark">
                  <Card.Header as="h3" className="text-center bg-dark" style={{color:'white' }}> Signup </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-center"> Join our community! </Card.Title>
                      <Form id="signup-form"
                        action={this.props.action}
                        method={this.props.method}
                        onSubmit={this.onSubmit} >
                        <Form.Row>

                          <Col md = {{span : 6}}>
                            <Form.Group controlId="formUsername">
                              <InputGroup>
                                <InputGroup.Prepend>
                                  <InputGroup.Text> <FaUser/> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="username" placeholder="Username" onChange={this.onChange} />
                              </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                              <InputGroup>
                                <InputGroup.Prepend>
                                  <InputGroup.Text> <FaLock/> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange} />
                              </InputGroup>
                            </Form.Group>

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

                          <Col>
                            <Form.Group controlId="formAddress">
                              <InputGroup>
                                <InputGroup.Prepend>
                                  <InputGroup.Text> <FaHome/> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="address" placeholder="Address" onChange={this.onChange} />
                              </InputGroup>
                            </Form.Group>

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
                            <Form.Group controlId="formPostalCode">
                              <InputGroup>
                                <InputGroup.Prepend>
                                  <InputGroup.Text> <FaEnvelope/> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="postalCode" placeholder="Postal Code" onChange={this.onChange} />
                              </InputGroup>
                            </Form.Group>

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
                      </Form>
                    </Card.Body>
                  </Card>
                </Container>
        );
    }

}

Signup.defaultProps = {
    action: '/app/users',
    method: 'POST'
};


ReactDOM.render(
	<Signup />,
	document.getElementById('signupForm')
)