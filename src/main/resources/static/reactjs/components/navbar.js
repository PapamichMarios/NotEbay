import '../../css/navbar.css';

const React = require('react');
const ReactDOM = require('react-dom');

import { NavLink } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button, InputGroup } from 'react-bootstrap';

import { FaSearch, FaHome, FaUser, FaComments, FaDatabase, FaSignInAlt, FaSignOutAlt, FaTasks, FaPlus } from 'react-icons/fa';
import { MdPlaylistAddCheck, MdGavel } from 'react-icons/md';

export default class NavBar extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        if((localStorage.getItem('accessToken') !== null) && (localStorage.getItem('accessToken') !== undefined)) {
            return (
              <div className="navbar-margin">
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="/welcome"> <b> BidIt </b> </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="mr-auto">
                      <NavItem>
                        <Form inline>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <FaSearch style={{verticalAlign: 'baseline'}}/>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text" placeholder="Search here.." />
                            </InputGroup>
                        </Form>
                      </NavItem>
                    </Nav>

                    <Nav className="justify-content-end">

                        { localStorage.getItem("isAdmin") === 'true' ? (
                                <NavLink to="/users">
                                  <NavItem className="button-margin">
                                      <Button title="User Database" style={{borderWidth:'0px', borderRadius: '50%'}} variant="outline-primary">
                                        <FaDatabase style={{verticalAlign: 'baseline'}} />
                                      </Button>
                                  </NavItem>
                                </NavLink>
                          ) : (
                            null
                          )
                        }

                        { localStorage.getItem("isAdmin") === 'true' ? (
                            <NavLink to="/applications">
                              <NavItem className="button-margin">
                                  <Button title="Applications" style={{borderWidth:'0px', borderRadius: '50%'}} variant="outline-primary">
                                    <FaTasks style={{verticalAlign: 'baseline'}} />
                                  </Button>
                              </NavItem>
                            </NavLink>
                          ) : (
                            null
                          )
                        }

                        <NavLink to="/home">
                          <NavItem className="button-margin">
                              <Button title="Home" variant="dark" style={{borderRadius: '50%'}}>
                                <FaHome style={{verticalAlign: 'baseline'}} />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/my-auctions">
                          <NavItem className="button-margin">
                              <Button title="My Auctions" variant="dark" style={{borderRadius: '50%'}}>
                                <MdGavel style={{verticalAlign: 'baseline'}} />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/submit-auction">
                          <NavItem className="button-margin">
                              <Button title="Create an auction" variant="dark" style={{borderRadius: '50%'}}>
                                <FaPlus style={{verticalAlign: 'baseline'}} />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/profile">
                          <NavItem className="button-margin">
                              <Button title="Profile" variant="dark" style={{borderRadius: '50%'}}>
                                <FaUser style={{verticalAlign: 'baseline'}} />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/inbox">
                          <NavItem className="button-margin">
                              <Button title="Inbox" variant="dark" style={{borderRadius: '50%'}}>
                                <FaComments style={{verticalAlign: 'baseline'}} />
                              </Button>
                          </NavItem>
                        </NavLink>

                          <NavItem className="button-margin">
                               <Button title="Log Out" variant="outline-danger" onClick={this.props.onLogout} style={{borderRadius: '12px'}}>
                                <b> Logout </b> <FaSignOutAlt style={{verticalAlign: 'baseline'}} />
                               </Button>
                          </NavItem>
                    </Nav>

                  </Navbar.Collapse>
                </Navbar>

                <Container fluid style={{paddingRight: '0px'}}>
                    <Row>
                        <Col md={{offset:11}}>
                            Signed in as: <b>{localStorage.getItem('username')}</b>
                        </Col>
                    </Row>
                </Container>
              </div>
            );
        } else {
            return (
              <div className="navbar-margin">
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="/welcome"> <b> BidIt </b> </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="mr-auto">
                      <NavItem>
                        <Form inline>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <FaSearch style={{verticalAlign: 'baseline'}} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text" placeholder="Search here.." />
                            </InputGroup>
                        </Form>
                      </NavItem>
                    </Nav>

                    <Nav className="justify-content-end">
                        <NavLink to="/home">
                          <NavItem className="button-margin">
                              <Button title="Home" variant="dark" style={{borderRadius: '50%'}}>
                                <FaHome style={{verticalAlign: 'baseline'}} />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/login">
                          <NavItem className="button-margin">
                               <Button title="Log In" variant="outline-light" style={{borderRadius: '12px'}}>
                               <b> Login </b> <FaSignInAlt style={{verticalAlign: 'baseline'}} />
                               </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/signup">
                          <NavItem className="button-margin" >
                              <Button title="Sign Up" variant="dark" style={{borderRadius: '12px'}}>
                                <b> Signup </b>
                              </Button>
                          </NavItem>
                        </NavLink>
                    </Nav>

                  </Navbar.Collapse>
                </Navbar>
              </div>
            );
        }
    }
}