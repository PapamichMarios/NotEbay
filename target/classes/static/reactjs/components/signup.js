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
            phoneNumber: '',
            address: '',
            country: '',
            tin: '' };
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        fetch(this.props.formAction, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,
                        repassword: this.state.repassword,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        phoneNumber: this.state.phoneNumber,
                        address: this.state.address,
                        country: this.state.country,
                        tin: this.state.tin})
        });

        console.log(this.state.firstName);

        this.setState({
            username: '',
            password: '',
            repassword:'',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            country: '',
            tin: '' });
    }

    render() {
        return (
                <Container>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }} className="text-center">
                            <Card border="dark">
                                <Card.Header as="h3" className="text-center" style={{backgroundColor: 'LightSkyBlue'}} >Signup</Card.Header>
                                <Card.Body>
                                  <Card.Title>Join our community!</Card.Title>
                                    <Form id="signup-form"
                                      action={this.props.action}
                                      method={this.props.method}
                                      onSubmit={this.onSubmit}>

                                      <Form.Group controlId="formUsername">
                                        <Form.Control type="text" name="username" placeholder="Username" />
                                      </Form.Group>

                                      <Form.Group controlId="formPassword">
                                        <Form.Control type="password" name="password" placeholder="Password" />
                                      </Form.Group>

                                      <Form.Group controlId="formRepeatPassword">
                                        <Form.Control type="password" name="repassword" placeholder="Re-enter Password" />
                                      </Form.Group>

                                      <Form.Group controlId="formFirstName">
                                        <Form.Control type="text" name="firstName" placeholder="First Name" />
                                      </Form.Group>

                                      <Form.Group controlId="formLastName">
                                        <Form.Control type="text" name="lastName" placeholder="Last Name" />
                                      </Form.Group>

                                      <Form.Group controlId="emailForm">
                                        <Form.Control type="email" name="email" placeholder="E-mail" />
                                        <Form.Text className="text-muted">
                                          We'll never share your email with anyone else.
                                        </Form.Text>
                                      </Form.Group>

                                      <Form.Group controlId="formPhoneNumber">
                                        <Form.Control type="text" name="phoneNumber" placeholder="Phone Number" />
                                      </Form.Group>

                                      <Form.Group controlId="formAddress">
                                        <Form.Control type="text" name="address" placeholder="Address" />
                                      </Form.Group>

                                      <Form.Group controlId="formCountry">
                                        <Form.Control as="select" name="country" placeholder="Country">
                                          <option>Country</option>
                                          <option>Greece</option>
                                          <option>USA</option>
                                          <option>UK</option>
                                        </Form.Control>
                                      </Form.Group>

                                      <Form.Group>
                                        <Form.Control type="text" name="tin" placeholder="TIN" />
                                      </Form.Group>

                                      <ButtonToolbar size="lg">
                                        <Button type="submit" variant="dark" block> Submit </Button>
                                        <Button type="reset" variant="danger" block> Reset </Button>
                                      </ButtonToolbar>

                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        );
    }

}

// App.propTypes = { action: React.PropTypes.string.isRequired, method: React.PropTypes.string}
Signup.defaultProps = {
    action: 'http://localhost:8080/signup',
    method: 'post'
};


ReactDOM.render(
	<Signup />,
	document.getElementById('signupForm')
)