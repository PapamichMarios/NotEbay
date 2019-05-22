const React = require('react');
const ReactDOM = require('react-dom');
import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card} from 'react-bootstrap';

export default class Signup extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            repassword:'',
            email: ''};
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
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        username: this.state.username,
                        password: this.state.password,
                        repassword: this.state.repassword,
                        email: this.state.email })
        });

        console.log(this.state.firstName);

        this.setState({
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            repassword: '',
            email: '' });
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

                                      <Form.Group controlId="formFirstName">
                                        <Form.Control type="text" placeholder="First Name" />
                                      </Form.Group>

                                      <Form.Group controlId="formLastName">
                                        <Form.Control type="text" placeholder="Last Name" />
                                      </Form.Group>

                                      <Form.Group controlId="formUsername">
                                        <Form.Control type="text" placeholder="Username" />
                                      </Form.Group>

                                      <Form.Group controlId="formPassword">
                                        <Form.Control type="password" placeholder="Password" />
                                      </Form.Group>

                                      <Form.Group controlId="formRepeatPassword">
                                        <Form.Control type="password" placeholder="Re-enter Password" />
                                      </Form.Group>

                                      <Form.Group controlId="emailForm">
                                        <Form.Control type="email" placeholder="E-mail" />
                                        <Form.Text className="text-muted">
                                          We'll never share your email with anyone else.
                                        </Form.Text>
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