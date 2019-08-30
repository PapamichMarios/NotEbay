import React from 'react';

import Loading from '../utils/loading/loading';
import getRequest from '../utils/requests/getRequest';

import { Container, Row, Col, Card, Nav, Table } from 'react-bootstrap';
import { FaInbox, FaTelegramPlane } from 'react-icons/fa';

export default class Inbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }

        this.showInbox = this.showInbox.bind(this);
        this.showSent = this.showSent.bind(this);
    }

    showInbox() {
        this.setState({loading: true});

        this.setState({loading: false});
    }

    showSent() {
        this.setState({loading: true});

        this.setState({loading: false});
    }

    componentDidMount() {
        this.showInbox();
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        } else {
            return (
                <Container fluid>
                    <Row>
                        <Col style={{paddingLeft: '0px'}} md={2}>
                            <Card border="light">
                                <ul style={{listStyleType: 'none', height:'100vh'}}>
                                    <Nav.Link disabled className="text-center">
                                        <b> Messages </b>
                                    </Nav.Link>

                                    <li className='my-list'>
                                        <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.showInbox}>
                                            <FaInbox style={{verticalAlign: 'middle'}} size={25} />
                                            <span> &nbsp; &nbsp; </span>
                                            Inbox
                                        </Nav.Link>
                                    </li>

                                    <li className='my-list'>
                                        <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.showSent}>
                                            <FaTelegramPlane style={{verticalAlign: 'middle'}} size={25} />
                                            <span> &nbsp; &nbsp; </span>
                                            Sent
                                        </Nav.Link>
                                    </li>
                                </ul>
                            </Card>
                        </Col>

                        <Col className="navbar-margin">
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
}