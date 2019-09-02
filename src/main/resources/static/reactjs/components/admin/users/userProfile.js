import React from 'react';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import getRequest from '../../utils/requests/getRequest';
import OpenStreetMap from '../../utils/maps/openStreetMap';

import '../../../../css/utils/map.css';
import '../../../../css/user/profile.css';

import { Container, Row, Col, Card, Table, Tabs, Tab, Form, Button, Alert } from 'react-bootstrap';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userData : null
        }
    }

    componentDidMount() {
        getRequest(this.props.action + this.props.match.params.id)
        .then((data) => {
            console.log(data);
            if (!data.error) {
                this.setState({
                    userData: data
                });
            }
        })
        .catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION)
    }

    render() {

        if(this.state.loading) {
            return <Loading />
        } else {
            if(this.state.userData === null || this.state.userData === undefined) {
                return (
                    <div>
                        <h3> ID: {this.props.match.params.id} </h3>
                        <h3> No user found in the database. </h3>
                    </div>
                );
            } else {
                return (
                    <Container fluid style={{paddingLeft:'0px'}}>
                        <Row>
                            <Col md={2}>
                                <Card className="full-vertical" border="light">
                                    <Card.Body>
                                        <Card.Title as="h5" className="text-center highlight">
                                            <b> {this.state.userData.username + ' #' + this.state.userData.id} </b>
                                        </Card.Title>

                                        <Table borderless size="sm">
                                            <thead>
                                                <tr>
                                                    <th className="header"> Name </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="body-text"> {this.state.userData.firstName + ' ' + this.state.userData.lastName} </td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                        <Table borderless size="sm">
                                            <thead>
                                                <tr>
                                                    <th className="header"> Email Address </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="body-text"> {this.state.userData.email} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={10} className="navbar-margin">
                                <Card>
                                    <Card.Body>
                                        <Tabs defaultActiveKey={0}>
                                            <Tab eventKey={0} title="Profile">
                                                <br/>
                                                <Row>
                                                    <Col>
                                                        <Form>
                                                           <Form.Group as={Row} controlId="formStreetAddress">
                                                             <Form.Label column md="5"> <b> Street Address: </b> </Form.Label>
                                                             <Col>
                                                               <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue={this.state.userData.streetAddress}
                                                                    className="col-user"
                                                               />
                                                             </Col>
                                                           </Form.Group>

                                                           <Form.Group as={Row} controlId="formCity">
                                                             <Form.Label column md="5"> <b> City: </b> </Form.Label>
                                                             <Col>
                                                               <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue={this.state.userData.city}
                                                                    className="col-user"
                                                               />
                                                             </Col>
                                                           </Form.Group>

                                                           <Form.Group as={Row} controlId="formPostalCode">
                                                             <Form.Label column md="5"> <b> Postal Code: </b> </Form.Label>
                                                             <Col>
                                                               <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue={this.state.userData.postalCode}
                                                                    className="col-user"
                                                               />
                                                             </Col>
                                                           </Form.Group>

                                                           <Form.Group as={Row} controlId="formCountry">
                                                             <Form.Label column md="5"> <b> Country: </b> </Form.Label>
                                                             <Col>
                                                               <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue={this.state.userData.country}
                                                                    className="col-user"
                                                               />
                                                             </Col>
                                                           </Form.Group>

                                                           <Form.Group as={Row} controlId="formPhone">
                                                             <Form.Label column md="5"> <b> Phone: </b> </Form.Label>
                                                             <Col>
                                                               <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue={this.state.userData.phone}
                                                                    className="col-user"
                                                               />
                                                             </Col>
                                                           </Form.Group>

                                                           <Form.Group as={Row} controlId="formTIN">
                                                             <Form.Label column md="5"> <b> TIN: </b> </Form.Label>
                                                             <Col>
                                                               <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue={this.state.userData.tin}
                                                                    className="col-user"
                                                               />
                                                             </Col>
                                                           </Form.Group>
                                                        </Form>
                                                    </Col>

                                                    <Col>
                                                        <div className="leaflet">
                                                            <OpenStreetMap lat={this.state.userData.geoLat} lng={this.state.userData.geoLong} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Tab>
                                          <Tab eventKey="activity" title="Activity" disabled> </Tab>
                                          <Tab eventKey="bidsWon" title="Bids Won" disabled> </Tab>
                                        </Tabs>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                );
            }
        }
    }
}

User.defaultProps = {
    action: '/app/users/',
    method: 'GET'
};