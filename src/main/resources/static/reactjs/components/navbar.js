import '../../css/navbar.css';

const React = require('react');
const ReactDOM = require('react-dom');
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button} from 'react-bootstrap';

class NavBar extends React.Component{
    render() {
        return (
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/welcome">NotEbay</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto">
                  <NavItem>
                    <Nav.Link href="#home">Αρχική Σελίδα</Nav.Link>
                  </NavItem>

                  <NavItem>
                    <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                      <Button variant="outline-info">Search</Button>
                    </Form>
                  </NavItem>
                </Nav>

                <Nav className="justify-content-right">
                  <NavItem>
                    <Nav.Link href="#">
                      <Button variant="info">
                        Signup
                      </Button>
                    </Nav.Link>
                  </NavItem>

                  <NavItem>
                    <Nav.Link href="#">
                       <Button variant="dark">
                        Login
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
