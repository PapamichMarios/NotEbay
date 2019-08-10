const React = require('react');

import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card, InputGroup, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHome, FaGlobe, FaFile } from 'react-icons/fa';

export default class SignUpSuccess extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Alert variant="success">
                    <Alert.Heading> One more step to welcome you to our community! </Alert.Heading>
                    <p> A well trained and authorised admin is going to review your application. </p>
                    <p> We promise it will not take long! In the meantime, feel free to browse auctions and items.</p>
                </Alert>
            </Container>
        )
    }
}
