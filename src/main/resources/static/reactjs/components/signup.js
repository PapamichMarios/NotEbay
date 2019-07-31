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
                        role: 'ROLE_VISITOR'})
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
                                        <Form.Control type="text" name="username" placeholder="Username" onChange={this.onChange} />
                                      </Form.Group>

                                      <Form.Group controlId="formPassword">
                                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange} />
                                      </Form.Group>

                                      <Form.Group controlId="formRepeatPassword">
                                        <Form.Control type="password" name="repassword" placeholder="Re-enter Password" onChange={this.onChange} />
                                      </Form.Group>

                                      <Form.Group controlId="formFirstName">
                                        <Form.Control type="text" name="firstName" placeholder="First Name" onChange={this.onChange} />
                                      </Form.Group>

                                      <Form.Group controlId="formLastName">
                                        <Form.Control type="text" name="lastName" placeholder="Last Name" onChange={this.onChange} />
                                      </Form.Group>

                                      <Form.Group controlId="emailForm">
                                        <Form.Control type="email" name="email" placeholder="E-mail" onChange={this.onChange} />
                                        <Form.Text className="text-muted">
                                          We'll never share your email with anyone else.
                                        </Form.Text>
                                      </Form.Group>

                                      <Form.Group controlId="formPhone">
                                        <Form.Control type="text" name="phone" placeholder="Phone Number" onChange={this.onChange} />
                                      </Form.Group>

                                      <Form.Group controlId="formAddress">
                                        <Form.Control type="text" name="address" placeholder="Address" onChange={this.onChange} />
                                      </Form.Group>

                                      <Form.Group controlId="formCountry">
                                        <Form.Control as="select" name="country" placeholder="Country" onChange={this.onChange}>
                                          <option>Country</option>
                                          <option>Greece</option>
                                          <option>USA</option>
                                          <option>UK</option>
                                        </Form.Control>
                                      </Form.Group>

                                      <Form.Group>
                                        <Form.Control type="text" name="tin" placeholder="TIN" onChange={this.onChange} />
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
    action: '/api/users',
    method: 'POST'
};


ReactDOM.render(
	<Signup />,
	document.getElementById('signupForm')
)