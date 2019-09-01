import React from 'react';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import deleteRequest from '../../utils/requests/deleteRequest';
import getRequest from '../../utils/requests/getRequest';
import Paging from '../../utils/paging';
import dateDecoder from '../../utils/decoders/dateDecoder';
import timeDecoder from '../../utils/decoders/timeDecoder';

import Sidebar from './sidebar';

import { FaTrash, FaReply } from 'react-icons/fa';
import { Container, Row, Col, Card, Table, Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Inbox extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loadingInbox: false,
            paging: '',
            messages: [],
            activePage: 1
        };

        this.deleteMsg = this.deleteMsg.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
        this.getInbox = this.getInbox.bind(this);
    }

    //delete
    deleteMsg(id) {
        if (window.confirm('Are you sure you want to delete the current message?')) {
            const url = this.props.action + '/received/' + id;

            deleteRequest(url)
            .then(response => {
                if (response.error) {
                    alert(response.message);
                } else {
                    this.props.history.push('/messages/inbox');
                    alert('The message has been deleted from your inbox folder.');
                }
            })
            .catch(error => console.error("Error:", error));
        }
    }

    //paging
    changeActivePage(pageNum) {
        this.setState({
            activePage: pageNum
        });
    }

    getInbox(pageNum) {
        this.setState({loadingInbox: true})
        const url = this.props.action + '/received?page=' + (pageNum-1) + '&size=15';

        getRequest(url)
        .then( pages => {
            this.setState({
                paging: pages,
                messages: pages.content
            },
            () =>
                setTimeout(() => {
                  this.setState({loadingInbox: false})
                }, Constants.TIMEOUT_DURATION)
            );
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.getInbox(this.state.activePage);
    }

    render() {
        let inboxOrLoading;
        if(this.state.loadingInbox) {
            inboxOrLoading = (<Loading />);
        } else {
            let tableBody = [];
            this.state.messages.map( message => {
                if(message.seen) {
                    tableBody.push (
                        <tr key={message.timeSent} className="clickable" onClick={() => this.props.history.push('/messages/inbox/message/' + message.id)}>
                            <td>
                                <Button className="button-margin" variant="danger" onClick={ () => this.deleteMsg(message.id) }>
                                    <FaTrash style={{verticalAlign: 'baseline'}} />
                                </Button>
                            </td>
                            <td> {message.otherUser.username} ({message.otherUser.email})</td>
                            <td> {message.header}</td>
                            <td> {timeDecoder(message.timeSent)} - {dateDecoder(message.timeSent)} </td>
                        </tr>
                    );
                } else {
                    tableBody.push (
                        <tr key={message.timeSent} className="clickable my-list-not-seen" onClick={() => this.props.history.push('/messages/inbox/message/' + message.id)}>
                            <td>
                                <Button className="button-margin" variant="danger" onClick={ () => this.deleteMsg(message.id) }>
                                    <FaTrash style={{verticalAlign: 'baseline'}} />
                                </Button>
                            </td>
                            <td> <b>{message.otherUser.username} [{message.otherUser.email}]</b></td>
                            <td> <b>{message.header}</b></td>
                            <td> <b>{timeDecoder(message.timeSent)} - {dateDecoder(message.timeSent)}</b> </td>
                        </tr>
                    );
                }
            });

            inboxOrLoading = (
                <Card>
                    <Card.Body>
                        <Card.Title as="h3" className="text-center"> Inbox </Card.Title>
                        <Table striped hover size="sm">
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th> Sender </th>
                                    <th> Title </th>
                                    <th> Time Received </th>
                                </tr>
                            </thead>

                            <tbody>
                                {tableBody}
                            </tbody>
                        </Table>

                        <Paging
                            totalPages={this.state.paging.totalPages}
                            getData={this.getInbox}
                            activePage={this.state.activePage}
                            changeActivePage={this.changeActivePage}
                        />
                    </Card.Body>
                </Card>
            );
        }

        return (
            <Container fluid>
                <Row>
                    <Col md={2} style={{paddingLeft: '0px'}}>
                        <Sidebar inbox={true} />
                    </Col>

                    <Col md={10} className="navbar-margin">
                        {inboxOrLoading}
                    </Col>
                </Row>
            </Container>
        );
    }
}

Inbox.defaultProps = {
    action: '/app/messages'
};

export default withRouter(Inbox);