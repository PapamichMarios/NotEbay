import React from 'react';

import Logged from './logged';
import Recommendation from './recommendation';

import InfoCarousel from './carousel/infoCarousel';

import isAuthenticated from '../utils/authentication/isLoggedIn';
import LoadingButton from '../utils/loading/loadingButton';
import * as Constants from '../utils/constants';
import isAdmin  from '../utils/authentication/isAdmin';

import { Container, Card, Row, Col, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { FaUserFriends, FaSignInAlt, FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let welcomeMsg, recommendation;
        if(isAuthenticated()) {

            welcomeMsg = (
                <Row>
                    <Col>
                       <Card>
                          <Card.Body>
                            <h4>
                                <b>Welcome,</b> &nbsp;
                                <Link to='/profile'>
                                    <b>{localStorage.getItem('username')}</b>
                                </Link>
                            </h4>
                          </Card.Body>
                       </Card>
                    </Col>
                </Row>
            );

            if(!isAdmin()) {
                recommendation = (
                    <Recommendation />
                );
            }

        } else {
            welcomeMsg = (
                <Logged onLogin={this.props.onLogin} />
            );
        }

        return (
            <Container className="navbar-margin">
                {welcomeMsg}

                <br />

                {recommendation}

                <br />

                <InfoCarousel />
            </Container>
        );
    }
}