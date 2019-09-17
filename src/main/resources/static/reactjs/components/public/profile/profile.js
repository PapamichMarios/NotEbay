import React from 'react';

import Activity from './activity';
import Ratings from '../../user/profile/ratings';
import RatingsReceived from './ratingsReceived/ratingsReceived';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import getRequestUnauth from '../../utils/requests/getRequestUnauthorized';
import OpenStreetMap from '../../utils/maps/openStreetMap';

import '../../../../css/utils/map.css';
import '../../../../css/user/profile.css';

import { Container, Row, Col, Card, Table, Tabs, Tab, Form, Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userData : ''
        }
    }

    componentDidMount() {

        getRequestUnauth(this.props.action + this.props.match.params.id)
        .then((data) => {
            if (!data.error) {

                this.setState({
                    userData: data
                } ,
                () => {
                    //set loading
                    setTimeout(() => {
                      this.setState({loading: false})
                    }, Constants.TIMEOUT_DURATION);
                });

            } else {
                if(data.status === 500) {
                    this.props.history.push('/internal-server-error');
                }

                if(data.status === 404) {
                    this.props.history.push('/user-not-found');
                }
            }
        })
        .catch(error => console.error('Error:', error));

    }

    render() {

        if(this.state.loading) {
            return <Loading />
        } else {
            return (
                <Container fluid style={{paddingLeft:'0px'}}>
                    <Row>
                        <Col md={2}>
                            <Card className="full-vertical" border="light">
                                <Card.Body>
                                    <Card.Title as="h5" className="text-center highlight">
                                        <b> {this.state.userData.user.username + ' #' + this.state.userData.user.id} </b>
                                    </Card.Title>

                                    <Table borderless size="sm">
                                        <thead>
                                            <tr>
                                                <th className="header"> Name </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td className="body-text"> {this.state.userData.user.firstName + ' ' + this.state.userData.user.lastName} </td>
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
                                                <td className="body-text"> {this.state.userData.user.email} </td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                    <Ratings
                                        sellerRating={this.state.userData.avgSellerRating}
                                        sellerReputation={this.state.userData.reputationSeller}
                                        bidderRating={this.state.userData.bidderRating}
                                        bidderReputation={this.state.userData.reputationBidder}
                                    />
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
                                                                defaultValue={this.state.userData.user.streetAddress}
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
                                                                defaultValue={this.state.userData.user.city}
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
                                                                defaultValue={this.state.userData.user.postalCode}
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
                                                                defaultValue={this.state.userData.user.country}
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
                                                                defaultValue={this.state.userData.user.phone}
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
                                                                defaultValue={this.state.userData.user.tin}
                                                                className="col-user"
                                                           />
                                                         </Col>
                                                       </Form.Group>
                                                    </Form>
                                                </Col>

                                                <Col>
                                                    <div className="leaflet">
                                                        <OpenStreetMap lat={this.state.userData.user.geoLat} lng={this.state.userData.user.geoLong} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Tab>

                                        <Tab eventKey="activity" title="Activity">
                                            <br />
                                            <Activity
                                                id={this.state.userData.user.id}
                                                username={this.state.userData.user.username}
                                            />
                                        </Tab>

                                        <Tab eventKey="ratings" title="Ratings">
                                            <br/>
                                            <RatingsReceived id={this.state.userData.user.id} />
                                        </Tab>
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

User.defaultProps = {
    action: '/app/users/',
    method: 'GET'
};

export default withRouter(User);