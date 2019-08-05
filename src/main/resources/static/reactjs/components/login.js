const React = require('react');
const ReactDOM = require('react-dom');

import { Container, Row, Col, Card, Form, ButtonToolbar, Button, InputGroup, Alert } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

            hasError: false,
            errorMsg: ''
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
            console.log('logInResponse:' + JSON.stringify(response));

            if (response.error) {
                this.setState({
                    hasError: true,
                    errorMsg: response.message
                })
            } else {
                //add response to session
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('tokenType', response.tokenType);

                localStorage.setItem('username', response.username);
                localStorage.setItem('firstName', response.firstName);
                localStorage.setItem('lastName', response.lastName);

                //add admin privileges
                if (response.admin) {
                    localStorage.setItem('isAdmin', response.admin);
                }

                //redirect
                this.props.onLogin();
            }
          })

          //handle errors from the back-end
          .catch(error => console.error('Error:', error));
    }

    render() {
      return(
            <Container>
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

                          <ButtonToolbar size="lg">
                            <Button type="submit" variant="dark" block> Submit </Button>
                          </ButtonToolbar>

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
                </Col>
              </Row>
            </Container>
      );
    }

}

Login.defaultProps = {
    action: 'app/signin',
    method: 'POST'
};