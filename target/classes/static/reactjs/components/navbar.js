import '../../css/navbar.css';

const React = require('react');
const ReactDOM = require('react-dom');

import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button, InputGroup, Col } from 'react-bootstrap';

import { FaSearch, FaHome, FaUser, FaComments, FaDatabase } from 'react-icons/fa';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { GoSignIn, GoSignOut, GoChecklist } from 'react-icons/go';

export default class NavBar extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        if((localStorage.getItem('accessToken') !== null) && (localStorage.getItem('accessToken') !== undefined)) {
            return (
              <div className="navbar-margin">
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="/welcome">BidIt</Navbar.Brand>
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

                        { localStorage.getItem("isAdmin") ? (
                            <NavLink to="/users">
                              <NavItem className="button-margin">
                                  <Button variant="outline-primary">
                                    <FaDatabase />
                                  </Button>
                              </NavItem>
                            </NavLink>
                          ) : (
                            null
                          )
                        }

                        { localStorage.getItem("isAdmin") ? (
                            <NavLink to="/applications">
                              <NavItem className="button-margin">
                                  <Button variant="outline-primary">
                                    <GoChecklist />
                                  </Button>
                              </NavItem>
                            </NavLink>
                          ) : (
                            null
                          )
                        }



                        <NavLink to="/home">
                          <NavItem className="button-margin">
                              <Button variant="dark">
                                <FaHome />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/profile">
                          <NavItem className="button-margin">
                              <Button variant="dark">
                                <FaUser />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/inbox">
                          <NavItem className="button-margin">
                              <Button variant="dark">
                                <FaComments />
                              </Button>
                          </NavItem>
                        </NavLink>

                          <NavItem className="button-margin">
                               <Button variant="outline-danger" onClick={this.props.onLogout}>
                                Logout <GoSignOut />
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
                  <Navbar.Brand href="/welcome">BidIt</Navbar.Brand>
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
                              <Button variant="dark">
                                <FaHome />
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/login">
                          <NavItem className="button-margin">
                               <Button variant="outline-light" >
                                Login <GoSignIn />
                               </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/signup">
                          <NavItem className="button-margin">
                              <Button variant="dark">
                                Signup
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