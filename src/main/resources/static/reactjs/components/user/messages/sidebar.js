import React from 'react';

import { Card, Nav, Button } from 'react-bootstrap';
import { FaTelegramPlane, FaInbox, FaPlus } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.showInbox = this.showInbox.bind(this);
        this.showSent = this.showSent.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }

    showInbox() {
        this.props.history.push('/messages/inbox');
    }

    showSent() {
        this.props.history.push('/messages/sent');
    }

    createMessage() {
        this.props.history.push('/messages/create-message');
    }

    render () {
        return (
            <Card border="light">
                <ul style={{listStyleType: 'none', height:'100vh'}}>
                    <Nav.Link disabled className="text-center">
                        <b> Messages </b>
                    </Nav.Link>

                    {this.props.inbox ? (
                        <div>
                            <li className='my-list-active'>
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
                        </div>
                    ) : (
                        <div>
                            <li className='my-list'>
                                <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.showInbox}>
                                    <FaInbox style={{verticalAlign: 'middle'}} size={25} />
                                    <span> &nbsp; &nbsp; </span>
                                    Inbox
                                </Nav.Link>
                            </li>

                            <li className='my-list-active'>
                                <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.showSent}>
                                    <FaTelegramPlane style={{verticalAlign: 'middle'}} size={25} />
                                    <span> &nbsp; &nbsp; </span>
                                    Sent
                                </Nav.Link>
                            </li>
                        </div>
                    )}


                    <br />
                    <Button variant="dark" size="lg" block onClick={this.createMessage}>
                         <FaPlus style={{verticalAlign: 'baseline'}}/>
                         <span> &nbsp; &nbsp; </span>
                         <b>Create Message</b>
                     </Button>
                </ul>
            </Card>
        );
    }
}

export default withRouter(Sidebar);