const React = require('react');

import LoadingButton from './utils/loading/loadingButton.js';
import * as Constants from './utils/constants.js';

import { Container, Row, Col, Card, Form, ButtonToolbar, Button, InputGroup, Alert } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

            hasError: false,
            errorMsg: '',
            loading: false
        };

        //binding this to submethods
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
      return(
            <Container className="navbar-margin">
              <Row>
                <Col md={{ span: 4, offset: 4 }} className="text-center">
                  <Card border="dark">
                    <Card.Header as="h3" className="text-center bg-dark" style={{color:'white' }}> Login </Card.Header>
                    <Card.Body>
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
                              <ButtonToolbar size="lg">
                                <Button type="submit" variant="dark" block disabled>
                                  <b> Loading </b>
                                  <LoadingButton />
                                </Button>
                              </ButtonToolbar>
                          ) : (
                              <ButtonToolbar size="lg">
                                <Button type="submit" variant="dark" block> <b> Submit </b> </Button>
                              </ButtonToolbar>
                          )}

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
                               null
                          )}

                        </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
      );
    }

}

Login.defaultProps = {
    action: '/app/signin',
    method: 'POST'
};