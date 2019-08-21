import '../../css/navbar.css';

const React = require('react');
const ReactDOM = require('react-dom');

import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button, InputGroup, Col } from 'react-bootstrap';

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
                                        <FaSearch/>
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
                                      <Button title="User Database" style={{borderWidth:'0px'}} variant="outline-primary">
                                        <FaDatabase />
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
                                  <Button title="Applications" style={{borderWidth:'0px'}} variant="outline-primary">
                                    <FaTasks />
                                  </Button>
                              </NavItem>
                            </NavLink>
                          ) : (
                            null
                          )
                        }

                        <NavLink to="/home">
                          <NavItem className="button-margin">
                              <Button title="Home" variant="dark circle">
                                <FaHome />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/auctions">
                          <NavItem className="button-margin">
                              <Button title="My Auctions" variant="dark">
                                <MdGavel />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/submitAuction">
                          <NavItem className="button-margin">
                              <Button title="Create an auction" variant="dark">
                                <FaPlus />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/profile">
                          <NavItem className="button-margin">
                              <Button title="Profile" variant="dark">
                                <FaUser />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/inbox">
                          <NavItem className="button-margin">
                              <Button title="Inbox" variant="dark">
                                <FaComments />
                              </Button>
                          </NavItem>
                        </NavLink>

                          <NavItem className="button-margin">
                               <Button title="Log Out" variant="outline-danger" onClick={this.props.onLogout}>
                                <b> Logout </b> <FaSignOutAlt />
                               </Button>
                          </NavItem>
                    </Nav>

                  </Navbar.Collapse>
                </Navbar>
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
                                        <FaSearch/>
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
                              <Button title="Home" variant="dark">
                                <FaHome />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/login">
                          <NavItem className="button-margin">
                               <Button title="Log In" variant="outline-light" >
                               <b> Login </b> <FaSignInAlt />
                               </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/signup">
                          <NavItem className="button-margin">
                              <Button title="Sign Up" variant="dark">
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