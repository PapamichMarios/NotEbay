import React from 'react';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import deleteRequest from '../../utils/requests/deleteRequest';
import getRequest from '../../utils/requests/getRequest';
import postRequest from '../../utils/requests/postRequest';
import Paging from '../../utils/paging';
import dateDecoder from '../../utils/decoders/dateDecoder';
import timeDecoder from '../../utils/decoders/timeDecoder';

import Sidebar from './sidebar';

import { Card, Table, Container, Row, Col, Form } from 'react-bootstrap';
import { FaReply, FaTrash } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

class Message extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            reply: false,
            loadingMessage: true,
            message: ''
        }

        this.deleteMsg = this.deleteMsg.bind(this);
        this.replyMsg = this.replyMsg.bind(this);
    }

    deleteMsg() {
        if (window.confirm('Are you sure you want to delete the current message?')) {
            let endpoint = this.props.location.pathname.split('/');
            let whereTo;
            endpoint[2] === "inbox" ? whereTo='received' : whereTo='sent';
            const url = this.props.action + whereTo + '/' + this.props.match.params.id;

            deleteRequest(url)
            .then(response => {
                if (response.error) {
                    alert(response.message);
                } else {
                    this.props.history.push('/messages/' + endpoint[2]);
                    alert('The message has been deleted from your ' + endpoint[2] + ' folder.');
                }
            })
            .catch(error => console.error("Error:", error));
        }
    }

    replyMsg() {
        this.setState({reply: true});
    }

    componentDidMount() {
        this.setState({loadingMessage: true});

        let endpoint = this.props.location.pathname.split('/');
        endpoint[2] === "inbox" ? endpoint[2]='received' : endpoint[2]='sent';
        const url = this.props.action + endpoint[2] + '/' + this.props.match.params.id;

        getRequest(url)
        .then(message => {
            console.log(message);
            this.setState({
                message: message
            },
            () =>
                setTimeout(() => {
                  this.setState({loadingMessage: false})
                }, Constants.TIMEOUT_DURATION)
            );
        })
        .catch(error => console.error("Error:", error));
    }

    render() {
        let active = this.props.location.pathname.split('/');
        let inbox;
        active[2] === 'inbox' ? inbox = true : inbox = false;

        return (
            <Container fluid>
                <Row>
                    <Col md={2} style={{paddingLeft: '0px'}}>
                        <Sidebar inbox={inbox} />
                    </Col>

                    {this.state.loadingMessage ? (
                        <Col className="navbar-margin">
                            <Loading />
                        </Col>
                    ) : (
                        <Col className="navbar-margin">
                            <Row>
                                <Col>
                                    <Card border="light">
                                        <Card.Body>
                                            <Row>
                                                <Col md={1} className="text-right">
                                                    <b>Title:</b>
                                                    <br/>
                                                    <b>From:</b>
                                                    <br/>
                                                    <b>To:</b>
                                                    <br/>
                                                    <b>Date:</b>
                                                </Col>

                                                <Col md={2}>
                                                    {this.state.message.header}
                                                    <br/>
                                                    {this.state.message.otherUser.email} [{this.state.message.otherUser.username}]
                                                    <br/>
                                                    Me
                                                    <br/>
                                                    {timeDecoder(this.state.message.timeSent)} - {dateDecoder(this.state.message.timeSent)}
                                                </Col>

                                                <Col md={{offset:7}}>
                                                    <ul style={{listStyleType: 'none'}}>
                                                        <li>
                                                            <span className='clickable' onClick={this.replyMsg}>
                                                                Reply <FaReply style={{verticalAlign: 'baseline'}} />
                                                            </span>
                                                        </li>

                                                        <li>
                                                            <span className='clickable text-danger' onClick={this.deleteMsg}>
                                                                Delete <FaTrash style={{verticalAlign: 'baseline'}} />
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Card border="light">
                                        <Card.Body>
                                            <p>
                                                {this.state.message.message}
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    }
}

Message.defaultProps = {
    action: '/app/messages/'
};

export default withRouter(Message);