import React from 'react';

import '../../../css/signup/signup.css';

import { Container, Row, Col, Button } from 'react-bootstrap';

export default class SignUpHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if(this.props.type === 'account') {
            return (
                <Container>
                    <Row>
                        <Col md={3} className="col-padding" >
                            <Button variant="arrow_box" block active onClick={this.props.setAccountDetails}>
                                <p className="title-font"> Step 1: <b> ACCOUNT </b> </p>
                                <p className="subtitle-font"> Enter your account details. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box_waiting" block disabled>
                                <p className="title-font"> Step 2: <b> USER </b> </p>
                                <p className="subtitle-font"> Enter your user details. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box_waiting" block disabled>
                                <p className="title-font"> Step 3: <b> LOCATION </b> </p>
                                <p className="subtitle-font">Confirm your location. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box_waiting" block disabled>
                                <p className="title-font"> Step 4: <b> OVERVIEW </b> </p>
                                <p className="subtitle-font"> Confirm your details. </p>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            );
        }

        if (this.props.type === 'user') {
            return (
                <Container>
                    <Row>
                        <Col md={3} className="col-padding" >
                            <Button variant="arrow_box_success" block active onClick={this.props.setAccountDetails}>
                                <p className="title-font"> Step 1: <b> ACCOUNT </b> </p>
                                <p className="subtitle-font"> Enter your account details. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box" block active onClick={this.props.setUserDetails}>
                                <p className="title-font"> Step 2: <b> USER </b> </p>
                                <p className="subtitle-font"> Enter your user details. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box_waiting" block disabled>
                                <p className="title-font"> Step 3: <b> LOCATION </b> </p>
                                <p className="subtitle-font">Confirm your location. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box_waiting" block disabled>
                                <p className="title-font"> Step 4: <b> OVERVIEW </b> </p>
                                <p className="subtitle-font"> Confirm your details. </p>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            );
        }

        if (this.props.type === 'location') {
            return (
                <Container>
                    <Row>
                        <Col md={3} className="col-padding" >
                            <Button variant="arrow_box_success" block active onClick={this.props.setAccountDetails}>
                                <p className="title-font"> Step 1: <b> ACCOUNT </b> </p>
                                <p className="subtitle-font"> Enter your account details. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box_success" block active onClick={this.props.setUserDetails}>
                                <p className="title-font"> Step 2: <b> USER </b> </p>
                                <p className="subtitle-font"> Enter your user details. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box" block active onClick={this.props.setLocationDetails}>
                                <p className="title-font"> Step 3: <b> LOCATION </b> </p>
                                <p className="subtitle-font">Confirm your location. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box_waiting" block disabled>
                                <p className="title-font"> Step 4: <b> OVERVIEW </b> </p>
                                <p className="subtitle-font"> Confirm your details. </p>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            );
        }

        if (this.props.type === 'overview') {
            return (
                <Container>
                    <Row>
                        <Col md={3} className="col-padding" >
                            <Button variant="arrow_box_success" block active onClick={this.props.setAccountDetails}>
                                <p className="title-font"> Step 1: <b> ACCOUNT </b> </p>
                                <p className="subtitle-font"> Enter your account details. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box_success" block active onClick={this.props.setUserDetails}>
                                <p className="title-font"> Step 2: <b> USER </b> </p>
                                <p className="subtitle-font"> Enter your user details. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box_success" block active onClick={this.props.setLocationDetails}>
                                <p className="title-font"> Step 3: <b> LOCATION </b> </p>
                                <p className="subtitle-font">Confirm your location. </p>
                            </Button>
                        </Col>

                        <Col md={3} className="col-padding">
                            <Button variant="arrow_box" block active>
                                <p className="title-font"> Step 4: <b> OVERVIEW </b> </p>
                                <p className="subtitle-font"> Confirm your details. </p>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}