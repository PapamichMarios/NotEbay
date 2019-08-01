import '../../css/navbar.css';

const React = require('react');
const ReactDOM = require('react-dom');

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaHome } from 'react-icons/fa';
import { GoSignIn } from 'react-icons/go';

class NavBar extends React.Component{
    render() {
        return (
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
                  <NavItem>
                    <Nav.Link href="/home">
                        <Button variant="dark">
                          <FaHome/>
                        </Button>
                    </Nav.Link>
                  </NavItem>

                  <NavItem>
                    <Nav.Link href="/signup">
                      <Button variant="outline-warning">
                        Signup
                      </Button>
                    </Nav.Link>
                  </NavItem>

                  <NavItem>
                    <Nav.Link href="/login">
                       <Button variant="outline-info" >
                        Login <GoSignIn/>
                       </Button>
                    </Nav.Link>
                  </NavItem>
                </Nav>

              </Navbar.Collapse>
            </Navbar>
        );
    }
}

ReactDOM.render(
	<NavBar />,
	document.getElementById('navbar')
)
