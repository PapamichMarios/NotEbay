import React from 'react';
import Loading from '../../utils/loading.js';
import * as Constants from '../../utils/constants.js';

import { Container, Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userData : null
        }

        console.log(this.props);
    }

    componentDidMount() {
        fetch(this.props.action + this.props.match.params.id,  {
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': Constants.ACCESS_TOKEN
               },
               method: this.props.method
            })
            .then(data => data.json())
            .then((data) => {
                console.log('data' + JSON.stringify(data));

                if (!data.error) {
                    this.setState({
                        userData: data
                    });
                }
            });

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
                )
            } else {
                return (
                  <Row>
                    <Col md={2}>
                        <Card className="full-vertical">
                            <Card.Header as="h5" className="text-center bg-dark" style={{color:'white'}}> {this.state.userData.username} </Card.Header>
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
                                            <th className="header"> Address </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        { this.state.userData.streetAddress == null ? (
                                            <tr>
                                                <td className="body-text"> Awaiting Address </td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td className="body-text"> { this.state.userData.streetAddress + ', '
                                                                                + this.state.userData.postalCode + ' '
                                                                                + this.state.userData.city + ', '
                                                                                + this.state.userData.country }
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={10}>
                        <Tabs defaultActiveKey="pastBids">
                          <Tab eventKey="pastBids" title="Past Bids" disabled> </Tab>
                          <Tab eventKey="activeBids" title="Active Bids" disabled> </Tab>
                        </Tabs>
                    </Col>
                </Row>
                )
            }
        }
    }
}

User.defaultProps = {
    action: '/app/users/',
    method: 'GET'
};