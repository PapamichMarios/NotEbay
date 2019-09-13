import React from 'react';

import Logged from './logged';

import isAuthenticated from '../utils/authentication/isLoggedIn';
import LoadingButton from '../utils/loading/loadingButton';
import * as Constants from '../utils/constants';

import { Container, Card, Row, Col, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { FaUserFriends, FaSignInAlt, FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let welcomeMsg;
        if(isAuthenticated()) {
            welcomeMsg = (
                <Row>
                    <Col>
                        <br/>
                        <h4> Welcome, <b className="text-primary">{localStorage.getItem('username')}</b> </h4>
                    </Col>
                </Row>
            );
        } else {
            welcomeMsg = (
                <Logged onLogin={this.props.onLogin} />
            );
        }

        return (
            <Container>
                {welcomeMsg}
            </Container>
        );
    }
}