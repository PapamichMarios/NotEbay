import React from 'react';

import { Card, Nav, Button } from 'react-bootstrap';
import { FaTelegramPlane, FaInbox, FaPlus } from 'react-icons/fa';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
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
                                <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.props.showInbox}>
                                    <FaInbox style={{verticalAlign: 'middle'}} size={25} />
                                    <span> &nbsp; &nbsp; </span>
                                    Inbox
                                </Nav.Link>
                            </li>

                            <li className='my-list'>
                                <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.props.showSent}>
                                    <FaTelegramPlane style={{verticalAlign: 'middle'}} size={25} />
                                    <span> &nbsp; &nbsp; </span>
                                    Sent
                                </Nav.Link>
                            </li>
                        </div>
                    ) : (
                        <div>
                            <li className='my-list'>
                                <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.props.showInbox}>
                                    <FaInbox style={{verticalAlign: 'middle'}} size={25} />
                                    <span> &nbsp; &nbsp; </span>
                                    Inbox
                                </Nav.Link>
                            </li>

                            <li className='my-list-active'>
                                <Nav.Link style={{fontSize: '15px', color: 'Black'}} onClick={this.props.showSent}>
                                    <FaTelegramPlane style={{verticalAlign: 'middle'}} size={25} />
                                    <span> &nbsp; &nbsp; </span>
                                    Sent
                                </Nav.Link>
                            </li>
                        </div>
                    )}


                    <br />
                    <Button variant="dark" size="lg" block onClick={this.props.createMessage}>
                         <FaPlus style={{verticalAlign: 'baseline'}}/>
                         <span> &nbsp; &nbsp; </span>
                         <b>Create Message</b>
                     </Button>
                </ul>
            </Card>
        );
    }
}