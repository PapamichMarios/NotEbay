const React = require('react');
const ReactDOM = require('react-dom');
import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card} from 'react-bootstrap';

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
        }).then(res => res.json())
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
                  <Card.Header as="h3" className="text-center bg-dark" style={{color:'white' }} >Signup</Card.Header>
                  <Card.Body>
                    <Card.Title className="text-center"> Join our community! </Card.Title>
                      <Form id="signup-form"
                        action={this.props.action}
                        method={this.props.method}
                        onSubmit={this.onSubmit} >
                        <Row>
                          <Col>
                            <Form.Group controlId="formUsername" md = {{span:4}}>
                              <Form.Control type="text" name="username" placeholder="Username" onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group controlId="formPassword" md = {{span:4}}>
                              <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group controlId="formRepeatPassword" md = {{span:4}}>
                              <Form.Control type="password" name="repassword" placeholder="Re-enter Password" onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group controlId="formFirstName" md = {{span:4}}>
                              <Form.Control type="text" name="firstName" placeholder="First Name" onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group controlId="formLastName" md = {{span:4}}>
                              <Form.Control type="text" name="lastName" placeholder="Last Name" onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group controlId="emailForm" md = {{span:4}}>
                              <Form.Control type="email" name="email" placeholder="E-mail" onChange={this.onChange} />
                              <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                              </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formPhone" md = {{span:4}}>
                              <Form.Control type="text" name="phone" placeholder="Phone Number" onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group>
                              <Form.Control type="text" name="tin" placeholder="TIN" onChange={this.onChange} />
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group controlId="formAddress">
                              <Form.Control type="text" name="address" placeholder="Address" onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group controlId="formCity">
                              <Form.Control type="text" name="city" placeholder="City" onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group controlId="formCountry">
                              <Form.Control type="text" name="country" placeholder="Country" onChange={this.onChange} />
                            </Form.Group>

                            <Form.Group controlId="formPostalCode">
                              <Form.Control type="text" name="postalCode" placeholder="Postal Code" onChange={this.onChange} />
                            </Form.Group>

                            <p className="font-small white-text d-flex justify-content-end">
                              Have an account?
                              <a href="/login" className="green-text ml-1 font-weight-bold">
                                Log in
                              </a>
                            </p>
                          </Col>
                        </Row>

                        <Row className="justify-content-md-center">
                          <ButtonToolbar size="lg">
                            <Col>
                              <Button type="submit" variant="dark" block> Submit </Button>
                            </Col>

                            <Col>
                              <Button type="reset" variant="danger" block> Reset </Button>
                            </Col>
                          </ButtonToolbar>
                        </Row>
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