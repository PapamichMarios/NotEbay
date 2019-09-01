import React from 'react';

import Loading from '../../utils/loading/loading';
import LoadingButton from '../../utils/loading/loadingButton';
import * as Constants from '../../utils/constants';
import deleteRequest from '../../utils/requests/deleteRequest';
import getRequest from '../../utils/requests/getRequest';
import postRequest from '../../utils/requests/postRequest';
import Paging from '../../utils/paging';
import dateDecoder from '../../utils/decoders/dateDecoder';
import timeDecoder from '../../utils/decoders/timeDecoder';

import Sidebar from './sidebar';

import { Card, Table, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaReply, FaTrash, FaPaperPlane } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

class Message extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            reply: false,
            loadingMessage: true,
            loadingMessageSend: false,
            hasError: false,
            success: false,
            errorMsg: '',
            message: '',
            replyMessage: ''
        }

        this.sendReply = this.sendReply.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteMsg = this.deleteMsg.bind(this);
        this.replyMsg = this.replyMsg.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
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

    //reply
    replyMsg() {
        this.setState({
            reply: true,
            replyMessage: '\n\n--------> '
                + timeDecoder(this.state.message.timeSent) + '-'
                + dateDecoder(this.state.message.timeSent) + '\n'
                + this.state.message.message
        });
    }

    sendReply() {
        this.setState({loadingMessageSend: true})
        const bodyObj = {
            receiverUsername: this.state.message.otherUser.username,
            header: this.state.message.header,
            message: this.state.replyMessage
        };

        postRequest(this.props.action, bodyObj)
        .then(response => {
            if(response.error) {
                this.setState({
                    hasError: true,
                    errorMsg: response.message
                });
            } else {
                this.setState({
                    success: true
                });
            }
        })
        .catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loadingMessageSend: false})
        }, Constants.TIMEOUT_DURATION)
    }

    componentDidMount() {
        this.setState({loadingMessage: true});

        let endpoint = this.props.location.pathname.split('/');
        endpoint[2] === "inbox" ? endpoint[2]='received' : endpoint[2]='sent';
        const url = this.props.action + endpoint[2] + '/' + this.props.match.params.id;

        getRequest(url)
        .then(message => {
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
                            {this.state.success ? (
                                <Alert variant="success">
                                    <p> Email has been sent successfully </p>
                                </Alert>
                            ) : (
                                <div>
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

                                                        {inbox ? (
                                                            <Col md={2}>
                                                                {this.state.message.header}
                                                                <br/>
                                                                {this.state.message.otherUser.email} [{this.state.message.otherUser.username}]
                                                                <br/>
                                                                Me
                                                                <br/>
                                                                {timeDecoder(this.state.message.timeSent)} - {dateDecoder(this.state.message.timeSent)}
                                                            </Col>
                                                        ) : (
                                                            <Col md={2}>
                                                                {this.state.message.header}
                                                                <br/>
                                                                Me
                                                                <br/>
                                                                {this.state.message.otherUser.email} [{this.state.message.otherUser.username}]
                                                                <br/>
                                                                {timeDecoder(this.state.message.timeSent)} - {dateDecoder(this.state.message.timeSent)}
                                                            </Col>
                                                        )}

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
                                                    {this.state.reply ? (
                                                        <Form>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows="15"
                                                                    name="replyMessage"
                                                                    value={this.state.replyMessage}
                                                                    onChange={this.onChange}
                                                                />
                                                            </Form.Group>

                                                            {this.state.loadingMessageSend ? (
                                                                <Button variant="dark" onClick={this.sendReply}>
                                                                    <b>Loading</b>
                                                                    <LoadingButton />
                                                                </Button>
                                                            ) : (
                                                                <Button variant="dark" onClick={this.sendReply}>
                                                                    <b> Send </b>
                                                                    <FaPaperPlane style={{verticalAlign:'baseline'}} />
                                                                </Button>
                                                            )}
                                                        </Form>
                                                    ) : (
                                                        <p>
                                                            {this.state.message.message}
                                                        </p>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                    {this.state.hasError ? (
                                        <Row>
                                            <Col>
                                                <Alert variant="danger">
                                                    <pre> {this.state.errorMsg} </pre>
                                                </Alert>
                                            </Col>
                                        </Row>
                                    ) : (
                                        null
                                    )}
                                </div>
                            )}
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