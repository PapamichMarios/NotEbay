import React from 'react';
import ReactDOM from 'react-dom';

import { Container, Row, Col, Nav } from 'react-bootstrap';

class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid style={{position: 'relative', bottom:'0', backgroundColor: 'GhostWhite'}}>

                <hr style={{border: 'solid 1px DimGray', width:'100%'}} />

                <Row>
                  <Col style={{paddingLeft:'75px'}}>
                    <Nav className="flex-column">
                        <Nav.Link disabled className="text-center"> <b> Info </b> </Nav.Link>

                        <Nav.Item style={{fontSize: '15px', color: 'Black'}}>
                            We are a new application caring for the needs of users making transactions across the world.
                            We accept the users using the platform, reducing scam accounts.
                        </Nav.Item>
                    </Nav>
                  </Col>

                  <Col>
                    <Nav className="flex-column">
                        <Nav.Link disabled className="text-center"> <b> Buy </b> </Nav.Link>

                        <Nav.Item style={{fontSize: '15px', color: 'Black'}}>
                            Buy products safely and with privacy. We do not track your transactions or sell
                            your private information to third parties.
                        </Nav.Item>
                    </Nav>
                  </Col>

                  <Col>
                    <Nav className="flex-column">
                        <Nav.Link disabled className="text-center"> <b> Sell </b> </Nav.Link>

                        <Nav.Item style={{fontSize: '15px', color: 'Black'}}>
                            Sell scam-free and with no problems regarding money transactions.
                        </Nav.Item>
                    </Nav>
                  </Col>

                  <Col>
                    <Nav className="flex-column">
                        <Nav.Link disabled className="text-center"> <b> Help & Contact </b> </Nav.Link>

                        <Nav.Item className="text-center">
                            <Nav.Link style={{fontSize: '15px', color: 'Black'}}>
                                Contact us
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                  </Col>
                </Row>

                <br />

                <Row>
                    <Col>
                        <i> Department of Informatics and Telecommunications, University of Athens </i>
                    </Col>

                    <br/>
                </Row>
            </Container>
        );
    }
}

ReactDOM.render(
	<Info />,
	document.getElementById('footer')
);
