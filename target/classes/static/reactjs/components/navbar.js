import '../../css/navbar.css';

const React = require('react');
const ReactDOM = require('react-dom');

import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button, br } from 'react-bootstrap';

import { FaSearch, FaHome, FaUser, FaEnvelope } from 'react-icons/fa';
import { GoSignIn, GoSignOut } from 'react-icons/go';

export default class NavBar extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        if(localStorage.getItem('accessToken') !== null) {
            return (
              <div className="navbar-margin">
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="/welcome">NotEbay</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="mr-auto">
                      <NavItem>
                        <Form inline>
                          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                          <Button variant="outline-success">
                            <FaSearch />
                          </Button>
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
                                <FaEnvelope />
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
                  <Navbar.Brand href="/welcome">NotEbay</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="mr-auto">
                      <NavItem>
                        <Form inline>
                          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                          <Button variant="outline-success">
                            <FaSearch/>
                          </Button>
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

                        <NavLink to="/signup">
                          <NavItem className="button-margin">
                              <Button variant="outline-warning">
                                Signup
                              </Button>
                          </NavItem>
                        </NavLink>

                        <NavLink to="/login">
                          <NavItem className="button-margin">
                               <Button variant="outline-info" >
                                Login <GoSignIn />
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