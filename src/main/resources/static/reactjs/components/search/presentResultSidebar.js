import React from 'react';

import { Card, Nav } from 'react-bootstrap';

export default class PresentSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card border="light">
                <ul style={{listStyleType: 'none', height:'100vh'}}>
                    <Nav.Link disabled className="text-center">
                        <b> Category </b>
                    </Nav.Link>

                    <li className='my-list'>
                        <Nav.Link style={{fontSize: '15px', color: 'Black'}} className="text-center">

                        </Nav.Link>
                    </li>

                    <Nav.Link disabled className="text-center">
                        <b> Item Location </b>
                    </Nav.Link>

                    <li className='my-list'>
                        <Nav.Link style={{fontSize: '15px', color: 'Black'}} >

                        </Nav.Link>
                    </li>

                    <Nav.Link disabled className="text-center">
                        <b> Price Range </b>
                    </Nav.Link>

                    <li className='my-list'>
                        <Nav.Link style={{fontSize: '15px', color: 'Black'}} >

                        </Nav.Link>
                    </li>
                </ul>
            </Card>
        );
    }
}