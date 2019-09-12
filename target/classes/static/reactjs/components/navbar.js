import '../../css/navbar.css';

const React = require('react');
const ReactDOM = require('react-dom');

import ExportAuction from './admin/auction/exportAuction';

import { NavLink, Link } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaSearch, FaHome, FaUser, FaComments, FaDatabase, FaSignInAlt, FaSignOutAlt, FaTasks, FaPlus, FaFileExport } from 'react-icons/fa';
import { MdPlaylistAddCheck, MdGavel } from 'react-icons/md';

export default class NavBar extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        //categories dropdown
        const categories = (
            <DropdownButton title="Categories" variant="dark">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>

              <Dropdown.Divider />

                <Dropdown.Item>
                    <Link to="/categories">
                        <b>All categories</b>
                    </Link>
                </Dropdown.Item>

            </DropdownButton>
        );

        //left part of the navbar
        const navLeft = (
            <Nav className="mr-auto">
              <NavItem className="button-margin-left">
                  {categories}
              </NavItem>

              <NavItem>
                <Form inline>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FaSearch style={{verticalAlign: 'baseline'}}/>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Search here..." />
                    </InputGroup>
                </Form>
              </NavItem>

              <NavItem>
                <Link to="/advanced-search">
                    <Button title="Advanced Search" variant="dark">
                        Advanced Search
                    </Button>
                </Link>
              </NavItem>
            </Nav>
        );

        if(localStorage.getItem('loggedIn') === 'true') {
            return (
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="/welcome"> <b> BidIt </b> </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">

                    {navLeft}

                    { localStorage.getItem("isAdmin") === 'true' ? (
                        <Nav className="justify-content-end">
                          <NavItem className="button-margin">
                             <b style={{color:'white'}}>JSON</b>
                             &nbsp;
                             <ExportAuction format='json' all={true} />
                          </NavItem>

                          <NavItem className="button-margin">
                             <b style={{color:'white'}}>XML</b>
                             &nbsp;
                             <ExportAuction format='xml' all={true} />
                          </NavItem>

                          <NavItem className="button-margin">
                            <NavLink to="/users">
                              <Button title="User Database" style={{borderWidth:'0px', borderRadius: '50%'}} variant="outline-primary">
                                <FaDatabase style={{verticalAlign: 'baseline'}} />
                              </Button>
                            </NavLink>
                          </NavItem>

                          <NavItem className="button-margin">
                            <NavLink to="/applications">
                              <Button title="Applications" style={{borderWidth:'0px', borderRadius: '50%'}} variant="outline-primary">
                                <FaTasks style={{verticalAlign: 'baseline'}} />
                              </Button>
                            </NavLink>
                          </NavItem>

                          <NavItem className="button-margin">
                            <NavLink to="/home">
                              <Button title="Home" variant="dark" style={{borderRadius: '50%'}}>
                                <FaHome style={{verticalAlign: 'baseline'}} />
                              </Button>
                            </NavLink>
                          </NavItem>

                          <NavItem className="button-margin">
                               <Button title="Log Out" variant="outline-danger" onClick={this.props.onLogout} style={{borderRadius: '12px'}}>
                                <b> Logout </b> <FaSignOutAlt style={{verticalAlign: 'baseline'}} />
                               </Button>
                          </NavItem>
                        </Nav>
                     ) : (
                        <Nav className="justify-content-end">
                            <NavItem className="button-margin">
                                <NavLink to="/home">
                                  <Button title="Home" variant="dark" style={{borderRadius: '50%'}}>
                                    <FaHome style={{verticalAlign: 'baseline'}} />
                                  </Button>
                                </NavLink>
                            </NavItem>

                            <NavItem className="button-margin">
                              <DropdownButton title={<FaUser style={{verticalAlign: 'baseline'}}/>} variant="dark" style={{borderRadius: '50px'}}>

                                <Dropdown.Item as={Link} to="/profile" className="text-center">
                                    <b style={{color: '#20A5CA'}}> {localStorage.getItem('username')} </b>
                                </Dropdown.Item>

                                <Dropdown.Item as={Link} to="/submit-auction">
                                    <FaPlus style={{verticalAlign: 'baseline'}} />
                                    <span> &nbsp; </span>
                                    Create Auction
                                </Dropdown.Item>

                                <Dropdown.Item as={Link} to="/my-auctions">
                                    <MdGavel style={{verticalAlign: 'baseline'}} />
                                    <span> &nbsp; </span>
                                    My Auctions
                                </Dropdown.Item>

                              </DropdownButton>
                            </NavItem>

                            <NavItem className="button-margin">
                              <NavLink to="/messages/inbox">
                                  <Button title="Messages" variant="dark" style={{borderRadius: '50%'}}>
                                    <FaComments style={{verticalAlign: 'baseline'}} />
                                  </Button>
                              </NavLink>
                            </NavItem>

                            <NavItem className="button-margin">
                                 <Button title="Log Out" variant="outline-danger" onClick={this.props.onLogout} style={{borderRadius: '12px'}}>
                                  <b> Logout </b> <FaSignOutAlt style={{verticalAlign: 'baseline'}} />
                                 </Button>
                            </NavItem>
                        </Nav>
                     )}
                  </Navbar.Collapse>
                </Navbar>
            );
        } else {
            return (
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="/welcome"> <b> BidIt </b> </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">

                    {navLeft}

                    <Nav className="justify-content-end">
                        <NavItem className="button-margin">
                          <NavLink to="/home">
                              <Button title="Home" variant="dark" style={{borderRadius: '50%'}}>
                                <FaHome style={{verticalAlign: 'baseline'}} />
                              </Button>
                          </NavLink>
                        </NavItem>

                        <NavItem className="button-margin">
                          <NavLink to="/login">
                               <Button title="Log In" variant="outline-light" style={{borderRadius: '12px'}}>
                               <b> Login </b> <FaSignInAlt style={{verticalAlign: 'baseline'}} />
                               </Button>
                          </NavLink>
                        </NavItem>

                        <NavItem className="button-margin" >
                          <NavLink to="/signup">
                              <Button title="Sign Up" variant="dark" style={{borderRadius: '12px'}}>
                                <b> Signup </b>
                              </Button>
                          </NavLink>
                        </NavItem>
                    </Nav>

                  </Navbar.Collapse>
                </Navbar>
            );
        }
    }
}