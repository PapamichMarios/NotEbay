import React from 'react';

import LoadingButton from '../utils/loading/loadingButton';
import * as Constants from '../utils/constants';

import { Container, Card, Row, Col, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { FaUserFriends, FaSignInAlt, FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class Logged extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
            errorMsg: '',
            hasError: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        //set loading
         this.setState({loading: true});

        //make the request
        fetch(this.props.action, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            method: this.props.method,
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(response => response.json())
          //handle success
          .then(response => {
            if (response.error) {
                this.setState({
                    hasError: true,
                    errorMsg: response.message,
                    loading: false
                })
            } else {
                //add response to session
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('tokenType', response.tokenType);

                localStorage.setItem('username', response.username);
                localStorage.setItem('firstName', response.firstName);
                localStorage.setItem('lastName', response.lastName);

                //add admin privileges
                localStorage.setItem('isAdmin', response.admin);

                //add logged in
                localStorage.setItem('loggedIn', 'true');

                //redirect
                setTimeout( () => {
                    this.props.onLogin(response.admin)
                }, Constants.TIMEOUT_DURATION);
            }
          })
          //handle error in promise
          .catch(error => console.error('Error:', error));
    }

    render() {
      return (
        <Row>
            <Col>
                <Card style={{width: '100%'}}>
                    <Card.Body>
                        <Row>
                            <Col className="text-center" md={{span:4, offset:1}}>
                                <Card.Title as="h3">
                                    <FaUserFriends style={{verticalAlign: 'sub'}} size="1.5em"/>
                                    &nbsp;
                                    Join our community!
                                </Card.Title>

                                <br />

                                <Card.Title as="h4">
                                    Register <Link to="/signup"> <b>NOW</b> </Link>
                                </Card.Title>
                            </Col>

                            <Col className="text-center" md="2">
                                <br />
                                <br />
                                <br />
                                <h3> <b>OR</b> </h3>
                            </Col>

                            <Col className="text-center" md={{span:4}}>
                                <Card.Title as="h3">
                                    <FaSignInAlt style={{verticalAlign: 'sub'}} size="1.5em"/>
                                    &nbsp;
                                    Login
                                </Card.Title>

                                <Form id="login-form"
                                  action={this.props.action}
                                  method={this.props.method}
                                  onSubmit={this.onSubmit}>

                                  <Form.Group controlId="formUsername">
                                    <InputGroup>
                                      <InputGroup.Prepend>
                                        <InputGroup.Text> <FaUser/> </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <Form.Control type="text" name="username" onChange={this.onChange} placeholder="Username" />
                                    </InputGroup>
                                  </Form.Group>

                                  <Form.Group controlId="formPassword">
                                    <InputGroup>
                                      <InputGroup.Prepend>
                                        <InputGroup.Text> <FaLock/> </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <Form.Control type="password" name="password" onChange={this.onChange} placeholder="Password" />
                                    </InputGroup>
                                  </Form.Group>


                                  { this.state.loading ? (
                                    <Button type="submit" variant="dark" block disabled>
                                      <b> Loading </b>
                                      <LoadingButton />
                                    </Button>
                                  ) : (
                                    <Button type="submit" variant="dark" block> <b> Submit </b> </Button>
                                  )}

                                  { this.state.hasError && (
                                      <Form.Row>
                                        <Col>
                                          <br />
                                          <Alert variant="danger">
                                              {this.state.errorMsg}
                                          </Alert>
                                        </Col>
                                      </Form.Row>
                                  )}

                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      );
    }
}

Logged.defaultProps = {
    action: '/app/signin',
    method: 'POST'
};