import React from 'react';

import { Container, Row, Col, Card, Nav, Table } from 'react-bootstrap';
import { FaInbox, FaTelegramPlane } from 'react-icons/fa';

export default class Inbox extends React.Component {
    constructor(props) {
        super(props);

        this.showInbox = this.showInbox.bind(this);
        this.showSent = this.showSent.bind(this);
    }

    showInbox() {

    }

    showSent() {

    }

    render() {
      return (
        <Container fluid>
            <Row>
                <Col style={{paddingLeft: '0px'}} md={2}>
                    <Card>
                        <ul style={{listStyleType: 'none', height:'100vh'}}>
                            <Nav.Link disabled className="text-center">
                                <b> Messages </b>
                            </Nav.Link>

                            <li className='my-list'>
                                <Nav.Link onClick={this.showInbox}>
                                    <FaInbox style={{verticalAlign: 'middle'}} size={25} />
                                    <span> &nbsp; &nbsp; </span>
                                    <b> Inbox </b>
                                </Nav.Link>
                            </li>

                            <li className='my-list'>
                                <Nav.Link onClick={this.showSent}>
                                    <FaTelegramPlane style={{verticalAlign: 'middle'}} size={25} />
                                    <span> &nbsp; &nbsp; </span>
                                    <b> Sent </b>
                                </Nav.Link>
                            </li>
                        </ul>
                    </Card>
                </Col>

                <Col>
                    <Card>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th> Sender </th>
                                    <th> Title </th>
                                    <th> Time Send </th>
                                </tr>
                            </thead>

                            <tbody>

                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Container>
      );
    }
}