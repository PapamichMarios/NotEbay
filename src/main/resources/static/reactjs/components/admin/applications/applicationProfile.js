import React from 'react';
import Loading from '../../utils/loading/loading.js';
import * as Constants from '../../utils/constants.js';
import OpenStreetMapsWrapperLatLng from '../../utils/maps/openStreetMapsWrapperLatLng.js';

import getRequest from '../../utils/requests/getRequest';
import deleteRequest from '../../utils/requests/deleteRequest';
import putRequest from '../../utils/requests/putRequest';

import '../../../../css/signup/confirmation.css';

import { Container, Row, Col, Card, Table, Tabs, Tab, Button, Alert, Form } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userData : null
        }

        this.approve = this.approve.bind(this);
        this.deny = this.deny.bind(this);
    }

    approve() {
        const bodyObj = { enable: true };
        putRequest(this.props.action + this.props.match.params.id, bodyObj)
        //handle success
        .then((response) => {
            console.log('approveResponse:' + JSON.stringify(response));

            if (response.error) {
                alert(response.message);
            } else {
                this.props.history.push('/users');
                alert('User has been approved access to the platform.');
            }
        })
        //handle error in promise
        .catch(error => console.error('Error:', error));
    }

    deny() {
        deleteRequest(this.props.action + this.props.match.params.id)
        .then((response) => {
            console.log('denyResponse:' + JSON.stringify(response));

            if (response.error) {
                alert(response.message);
            } else {
                this.props.history.push('/users');
                alert('User has been deleted from the platform.');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        getRequest(this.props.action + this.props.match.params.id)
        .then((data) => {
            console.log('data' + JSON.stringify(data));

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

        if (this.state.loading) {
            return <Loading />
        } else {
            if(this.state.userData === null || this.state.userData === undefined || this.state.userData.enabled) {
                return (
                    <Container>
                        <Alert variant="danger">
                            <Alert.Heading> No application found in the database. </Alert.Heading>
                        </Alert>
                    </Container>
                )
            } else {
                return (
                      <Container>
                          <Card border="dark">
                            <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Application </Card.Header>
                            <Card.Body>
                              <Form>
                                  <Form.Row>
                                      <Col md={5}>
                                         <Form.Group as={Row} controlId="formUsername">
                                           <Form.Label column md="4"> <b> Username: </b> </Form.Label>
                                           <Col>
                                             <Form.Control
                                                  plaintext
                                                  readOnly
                                                  defaultValue={this.state.userData.username}
                                                  className="col-user"
                                             />
                                           </Col>
                                         </Form.Group>
                                      </Col>

                                      <Col>
                                         <Form.Group as={Row} controlId="formStreetAddress">
                                           <Form.Label column> <b> Street Address: </b> </Form.Label>
                                           <Col>
                                             <Form.Control
                                                  plaintext
                                                  readOnly
                                                  defaultValue={this.state.userData.streetAddress}
                                                  className="col-user"
                                              />
                                           </Col>
                                         </Form.Group>
                                      </Col>

                                      <Col>
                                         <Form.Group as={Row} controlId="formPostalCode">
                                           <Form.Label column> <b> Postal Code: </b></Form.Label>
                                           <Col>
                                             <Form.Control
                                                  plaintext
                                                  readOnly
                                                  defaultValue={this.state.userData.postalCode}
                                                  className="col-user"
                                             />
                                           </Col>
                                         </Form.Group>
                                      </Col>
                                  </Form.Row>

                                  <Form.Row>
                                      <Col md={5}>
                                         <Form.Group as={Row} controlId="formEmail">
                                           <Form.Label column md="4"> <b> Email: </b> </Form.Label>
                                           <Col>
                                             <Form.Control
                                                  plaintext
                                                  readOnly
                                                  defaultValue={this.state.userData.email}
                                                  className="col-user"
                                              />
                                           </Col>
                                         </Form.Group>
                                     </Col>

                                      <Col>
                                          <Form.Group as={Row} controlId="formCity">
                                              <Form.Label column > <b> City: </b> </Form.Label>
                                              <Col>
                                                  <Form.Control
                                                      plaintext
                                                      readOnly
                                                      defaultValue={this.state.userData.city}
                                                      className="col-user"
                                                  />
                                              </Col>
                                          </Form.Group>
                                      </Col>

                                      <Col>
                                          <Form.Group as={Row} controlId="formCountry">
                                              <Form.Label column> <b> Country: </b> </Form.Label>
                                              <Col>
                                                  <Form.Control
                                                      plaintext
                                                      readOnly
                                                      defaultValue={this.state.userData.country}
                                                      className="col-user"
                                                  />
                                              </Col>
                                          </Form.Group>
                                      </Col>
                                  </Form.Row>

                                  <Form.Row>
                                      <Col md={5}>
                                           <Form.Group as={Row} controlId="formFirstName">
                                              <Form.Label column md="4"> <b> First Name: </b> </Form.Label>
                                              <Col>
                                                  <Form.Control
                                                      plaintext
                                                      readOnly
                                                      defaultValue={this.state.userData.firstName}
                                                      className="col-user"
                                                  />
                                              </Col>
                                          </Form.Group>

                                           <Form.Group as={Row} controlId="formLastName">
                                              <Form.Label column md="4"> <b> Last Name: </b> </Form.Label>
                                              <Col>
                                                  <Form.Control
                                                      plaintext
                                                      readOnly
                                                      defaultValue={this.state.userData.lastName}
                                                      className="col-user"
                                                  />
                                              </Col>
                                          </Form.Group>

                                           <Form.Group as={Row} controlId="formPhone">
                                              <Form.Label column md="4"> <b> Phone Number: </b> </Form.Label>
                                              <Col>
                                                  <Form.Control
                                                      plaintext
                                                      readOnly
                                                      defaultValue={this.state.userData.phone}
                                                      className="col-user"
                                                  />
                                              </Col>
                                          </Form.Group>

                                           <Form.Group as={Row} controlId="formTin">
                                              <Form.Label column md="4"> <b> TIN: </b> </Form.Label>
                                              <Col>
                                                  <Form.Control
                                                      plaintext
                                                      readOnly
                                                      defaultValue={this.state.userData.tin}
                                                      className="col-user"
                                                  />
                                              </Col>
                                          </Form.Group>
                                      </Col>

                                      <Col md={7}>
                                          <div className="leaflet">
                                              <OpenStreetMapsWrapperLatLng lat={this.state.userData.geoLat} lng={this.state.userData.geoLong} />
                                          </div>
                                      </Col>
                                  </Form.Row>

                                  <br />

                                  <Form.Row>
                                      <Col md={{span: 6}}>
                                          <Button block variant="success" block onClick={this.approve}> <FaCheck /> </Button>
                                      </Col>


                                      <Col md={{ span: 6}}>
                                          <Button block variant="danger" block onClick={this.deny}> <FaTimes /> </Button>
                                      </Col>
                                  </Form.Row>

                              </Form>
                            </Card.Body>
                          </Card>
                      </Container>
                )
            }
        }
    }
}

Application.defaultProps = {
    action: '/app/users/',
    method: 'GET'
};