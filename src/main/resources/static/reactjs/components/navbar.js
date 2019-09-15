import '../../css/navbar.css';

const React = require('react');
const ReactDOM = require('react-dom');

import ExportAuction from './admin/auction/exportAuction';

import { NavLink, Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaSearch, FaHome, FaUser, FaComments, FaDatabase, FaSignInAlt, FaSignOutAlt, FaTasks, FaPlus, FaFileExport } from 'react-icons/fa';
import { MdPlaylistAddCheck, MdGavel } from 'react-icons/md';

class NavBar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        //categories dropdown
        let categoriesBody1 = [];
        let categoriesBody2 = [];
        let categoriesBody3 = [];
        this.props.categories.map( (category, index) => {

            let breadcrumbs = [{name: category.name, id: category.id}];

            switch(index % 3) {
                case 0:
                    categoriesBody1.push(
                        <Dropdown.Item
                            onClick={() => {
                                    this.props.history.push({
                                        pathname: '/categories',
                                        state: {
                                            name: category.name,
                                            id: category.id,
                                            breadcrumbs: breadcrumbs
                                        }
                                    });
                                }
                            }
                            key={category.id}
                        >
                            {category.name}
                        </Dropdown.Item>
                    );
                    break;

                case 1:
                    categoriesBody2.push(
                        <Dropdown.Item
                            onClick={() => {
                                    this.props.history.push({
                                        pathname: '/categories',
                                        state: {
                                            name: category.name,
                                            id: category.id,
                                            breadcrumbs: breadcrumbs
                                        }
                                    });
                                }
                            }
                            key={category.id}
                        >
                            {category.name}
                        </Dropdown.Item>
                    );
                    break;

                case 2:
                    categoriesBody3.push(
                        <Dropdown.Item
                            onClick={() => {
                                    this.props.history.push({
                                        pathname: '/categories',
                                        state: {
                                            name: category.name,
                                            id: category.id,
                                            breadcrumbs: breadcrumbs,
                                        }
                                    });
                                }
                            }
                            key={category.id}
                        >
                            {category.name}
                        </Dropdown.Item>
                    );
                    break;
            }
        });

        const categories = (
            <Dropdown>
                <Dropdown.Toggle variant="dark">
                    <b> Categories </b>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{	width: '800px', fontSize: '14px'}}>
                    <Row>
                        <Col>
                            {categoriesBody2}
                        </Col>

                        <Col>
                            {categoriesBody1}
                        </Col>

                        <Col>
                            {categoriesBody3}
                        </Col>
                    </Row>

                    <Dropdown.Divider />

                    <Dropdown.Item
                        onClick={() => { this.props.history.push('/categories')} }
                        className="text-primary"
                    >
                        <b>Click here to see all the categories!</b>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );

        //left part of the navbar
        const navLeft = (
            <Nav className="mr-auto">
              <NavItem className="button-margin">
                  {categories}
              </NavItem>

              <NavItem>
                <Form inline>
                    <Form.Control
                        type="text"
                        name="search"
                        placeholder="Search here..."
                        onChange={ this.onChange }
                        style={{width:'450px'}}
                    />

                    <Button
                        variant="outline-success"
                        onClick={ () => {

                            //redirect to searchResults
                            this.props.history.push({
                                pathname: '/searchResults?name=' + this.state.search,
                                state: {
                                    name: this.state.search
                                }
                            })

                        }}
                    >
                        <b> Search </b>
                        <FaSearch style={{verticalAlign: 'baseline'}}/>
                    </Button>
                </Form>
              </NavItem>

              <NavItem className="button-margin-left">
                <Link to="/advanced-search">
                    <Button title="Advanced Search" variant="dark">
                        Advanced Search
                    </Button>
                </Link>
              </NavItem>
            </Nav>
        );

        //for the logged in users
        if(localStorage.getItem('loggedIn') === 'true') {

            return (
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="/welcome"> <b> BidIt </b> </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">

                    {navLeft}

                    {/* for the admins */}
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

            //for visitors
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

export default withRouter(NavBar);