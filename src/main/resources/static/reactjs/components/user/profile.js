import React    from 'react';
import { Container, Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';

import '../../../css/user/profile.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
                <Row>
                    <Col md={2}>
                        <Card className="full-vertical">
                            <Card.Header as="h5" className="text-center bg-dark" style={{color:'white'}}> {localStorage.getItem('username')} </Card.Header>
                            <Card.Body>
                                <Table borderless size="sm">
                                    <thead>
                                        <tr>
                                            <th className="header"> Name </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="body-text"> {localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')} </td>
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
                                        <tr>
                                            <td className="body-text"> Awaiting Address </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={10}>
                        <Tabs defaultActiveKey="profile">
                          <Tab eventKey="profile" title="Profile"> </Tab>
                          <Tab eventKey="bids" title="Bids" disabled> </Tab>
                          <Tab eventKey="auctions" title="Auctions" disabled> </Tab>
                        </Tabs>
                    </Col>
                </Row>
        );
    }
}