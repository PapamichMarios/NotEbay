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
            loadingInbox: true,
            paging: '',
            messages: [],
            activePage: 1,
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
                    //refresh
                    this.props.history.push("/");
                    this.props.history.push({
                        pathname: '/messages/inbox',
                        state: { deleted: true }
                    })
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
                        <tr key={message.timeSent} className="clickable">
                            <td>
                                <Button className="button-margin" variant="danger" onClick={ () => this.deleteMsg(message.id) }>
                                    <FaTrash style={{verticalAlign: 'baseline'}} />
                                </Button>
                            </td>
                            <td onClick={() => this.props.history.push('/messages/inbox/message/' + message.id)}> {message.otherUser.username} ({message.otherUser.email})</td>
                            <td onClick={() => this.props.history.push('/messages/inbox/message/' + message.id)}> {message.header}</td>
                            <td onClick={() => this.props.history.push('/messages/inbox/message/' + message.id)}> {timeDecoder(message.timeSent)} - {dateDecoder(message.timeSent)} </td>
                        </tr>
                    );
                } else {
                    tableBody.push (
                        <tr key={message.timeSent} className="clickable my-list-not-seen">
                            <td>
                                <Button className="button-margin" variant="danger" onClick={ () => this.deleteMsg(message.id) }>
                                    <FaTrash style={{verticalAlign: 'baseline'}} />
                                </Button>
                            </td>
                            <td onClick={() => this.props.history.push('/messages/inbox/message/' + message.id)}> <b>{message.otherUser.username} [{message.otherUser.email}]</b></td>
                            <td onClick={() => this.props.history.push('/messages/inbox/message/' + message.id)}> <b>{message.header}</b></td>
                            <td onClick={() => this.props.history.push('/messages/inbox/message/' + message.id)}> <b>{timeDecoder(message.timeSent)} - {dateDecoder(message.timeSent)}</b> </td>
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

        let confirmation;
        if(this.props.location.state !== undefined) {
            if(this.props.location.state.deleted) {
                confirmation = (
                    <Alert variant="success">
                        <p> Email has been deleted from <b>Inbox</b> folder. </p>
                    </Alert>
                );
            }
        }

        return (
            <Container fluid>
                <Row>
                    <Col md={2} style={{paddingLeft: '0px'}}>
                        <Sidebar inbox={true} />
                    </Col>

                    <Col md={10} className="navbar-margin">
                        {this.props.location.state !== undefined ? (
                            confirmation
                        ) : (
                            null
                        )}

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