import React from 'react';

import Sidebar from './sidebar';
import Inbox from './inbox';
import Sent from './sent';
import Message from './message';
import CreateMessage from './createMessage';

import Loading from '../../utils/loading/loading';
import getRequest from '../../utils/requests/getRequest';

import { Container, Row, Col, Card, Nav, Table, Button } from 'react-bootstrap';
import { FaInbox, FaTelegramPlane, FaPlus } from 'react-icons/fa';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            mailLoading: false,
            inbox: true,
            inboxSentMessage: 0
        }

        this.showMessage = this.showMessage.bind(this);
        this.showInbox = this.showInbox.bind(this);
        this.showSent = this.showSent.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }

    //refresh

    showInbox() {
        this.setState({mailLoading: true});

        this.setState({mailLoading: false, inbox: true, inboxSentMessage:0});
    }

    showSent() {
        this.setState({mailLoading: true});

        this.setState({mailLoading: false, inbox: false, inboxSentMessage:1});d
    }

    showMessage(id) {
        this.setState({mailLoading: true});

        this.setState({mailLoading: false, inboxSentMessage:2});
        alert(id);
    }

    createMessage() {
        this.setState({mailLoading: false, inboxSentMessage:3});
    }

    componentDidMount() {
        this.setState({loading: true});
        this.showInbox();
        this.setState({loading: false});
    }

    render() {

        let toShow = null;
        switch(this.state.inboxSentMessage) {
            case 0:
                toShow = <Inbox showMessage={this.showMessage} />
                break;
            case 1:
                toShow = <Sent showMessage={this.showMessage} />
                break;
            case 2:
                toShow = <Message />
                break;
            case 3:
                toShow= <CreateMessage />
                break;
        }

        if (this.state.loading) {
            return <Loading />
        } else {
            return (
                <Container fluid>
                    <Row>
                        <Col style={{paddingLeft: '0px'}} md={2}>
                            <Sidebar
                                showInbox= {this.showInbox}
                                showSent= {this.showSent}
                                inbox= {this.state.inbox}
                                createMessage={this.createMessage}
                            />
                        </Col>

                        {this.state.mailLoading ? (
                            <Col className="navbar-margin">
                                <Loading />
                            </Col>
                        ) : (
                            <Col className="navbar-margin">
                                {toShow}
                            </Col>
                        )}

                    </Row>
                </Container>
            );
        }
    }
}

Inbox.defaultProps = {
    action: '/app/messages'
};