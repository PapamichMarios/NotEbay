import React    from 'react';
import { Container, Row, Col, Card, Table, Tabs, Tab, Form } from 'react-bootstrap';

import Activity from './activity';
import BidsWon from './bidsWon';
import ActiveBids from './activeBids';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import getRequest from '../../utils/requests/getRequest';
import OpenStreetMap from '../../utils/maps/openStreetMap';

import '../../../../css/utils/map.css';
import '../../../../css/user/profile.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: '',
            loading: true,
        };
    }

    componentDidMount() {
        getRequest(this.props.action)
        .then((data) => {
            console.log(data);
            this.setState({
                userData: data
            }, () =>
            setTimeout(() => {
                this.setState({loading: false});
            }, Constants.TIMEOUT_DURATION));
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        if(this.state.loading) {
            return <Loading />;
        } else {
            return (
                <Container fluid style={{paddingLeft:'0px'}}>
                    <Row>
                        <Col md={3}>
                            <Card className="full-vertical">
                                <Card.Header as="h5" className="text-center bg-dark" style={{color:'white'}}> <b> {this.state.userData.username + ' #' + this.state.userData.id} </b> </Card.Header>
                                <Card.Body>
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

                        <Col md={9}>
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

                                        <Tab eventKey={1} title="Activity">
                                            <br/>
                                            <Activity id={this.state.userData.id} />
                                        </Tab>

                                        <Tab eventKey={2} title="Active Bids">
                                            <br />
                                            <ActiveBids />
                                        </Tab>

                                        <Tab eventKey={3} title="Bids Won">
                                            <br />
                                            <BidsWon />
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

Profile.defaultProps = {
    action: '/app/users/profile'
};