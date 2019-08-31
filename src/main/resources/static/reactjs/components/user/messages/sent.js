import React from 'react';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import deleteRequest from '../../utils/requests/deleteRequest';
import getRequest from '../../utils/requests/getRequest';
import Paging from '../../utils/paging';
import dateDecoder from '../../utils/decoders/dateDecoder';
import timeDecoder from '../../utils/decoders/timeDecoder';

import Sidebar from './sidebar';

import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FaReply, FaTrash } from 'react-icons/fa';

class Sent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loadingSent: false,
            paging: '',
            messages: [],
            activePage: 1
        };

        this.deleteMsg = this.deleteMsg.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
        this.getSent = this.getSent.bind(this);
    }

    //delete
    deleteMsg(id) {
        if (window.confirm('Are you sure you want to delete the current message?')) {
            const url = this.props.action + '/sent/' + id;

            deleteRequest(url)
            .then(response => {
                if (response.error) {
                    alert(response.message);
                } else {
                    this.props.history.push('/messages/sent');
                    alert('The message has been deleted from your sent folder.');
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

    getSent(pageNum) {
        this.setState({loadingSent: true})
        const url = this.props.action + '/sent?page=' + (pageNum-1) + '&size=15';

        getRequest(url)
        .then( pages => {
            this.setState({
                paging: pages,
                messages: pages.content
            },
            () =>
                setTimeout(() => {
                  this.setState({loadingSent: false})
                }, Constants.TIMEOUT_DURATION)
            );
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.getSent(this.state.activePage);
    }

    render() {
        let inboxOrLoading;
        if(this.state.loadingSent) {
            inboxOrLoading = (<Loading />);
        } else {
            let tableBody = [];
            this.state.messages.map( message => {
                tableBody.push (
                    <tr key={message.timeSent} className="clickable" onClick={() => this.props.history.push('/messages/sent/message/' + message.id)}>
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
            });

            inboxOrLoading = (
                <Card>
                    <Card.Body>
                        <Card.Title as="h3" className="text-center"> Sent </Card.Title>
                        <Table striped hover size="sm">
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th> Receiver </th>
                                    <th> Title </th>
                                    <th> Time Sent </th>
                                </tr>
                            </thead>

                            <tbody>
                                {tableBody}
                            </tbody>
                        </Table>

                        <Paging
                            totalPages={this.state.paging.totalPages}
                            getData={this.getSent}
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
                        <Sidebar inbox={false} />
                    </Col>

                    <Col className="navbar-margin">
                        {inboxOrLoading}
                    </Col>
                </Row>
            </Container>
        );
    }
}

Sent.defaultProps = {
    action: '/app/messages'
};

export default withRouter(Sent);