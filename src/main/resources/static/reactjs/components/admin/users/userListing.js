import React    from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaUserCheck, FaUserTimes } from 'react-icons/fa';

function UserItem(props) {

    if (props.value.enabled) {
        return (
            <tr>
                <td>
                    <Link to={`/users/${props.value.id}`} >
                        <FaExternalLinkAlt />
                    </Link>
                </td>
                <td> {props.value.username} #{props.value.id}</td>
                <td> {props.value.firstName} </td>
                <td> {props.value.lastName} </td>
                <td> {props.value.email} </td>
                <td> {props.value.phone} </td>
                <td> {props.value.streetAddress} </td>
                <td> {props.value.city} </td>
                <td> {props.value.country} </td>
                <td style={{textAlign: 'center'}}> <FaUserCheck /> </td>
            </tr>
        );
    } else {
        return (
            <tr style={{color: 'red'}}>
                <td>
                    <Link to={`/applications/${props.value.id}`} >
                        <FaExternalLinkAlt />
                    </Link>
                </td>
                <td> {props.value.username} #{props.value.id} </td>
                <td> {props.value.firstName} </td>
                <td> {props.value.lastName} </td>
                <td> {props.value.email} </td>
                <td> {props.value.phone} </td>
                <td> {props.value.streetAddress} </td>
                <td> {props.value.city} </td>
                <td> {props.value.country} </td>
                <td style={{textAlign: 'center'}}> <FaUserTimes /> </td>
            </tr>
        )
    }
}

export default class UserListing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <Container fluid className="navbar-margin">
            <Card border="dark">
                <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> User Database </Card.Header>
                    <Card.Body>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th> Username </th>
                                    <th> First Name </th>
                                    <th> Last Name </th>
                                    <th> Email  </th>
                                    <th> Phone </th>
                                    <th> Street Address </th>
                                    <th> City </th>
                                    <th> Country </th>
                                    <th> Approved </th>
                                </tr>
                            </thead>

                            <tbody>
                                    {this.props.users.map(user => <UserItem key={user.id} value={user} />)}
                            </tbody>
                        </Table>
                    </Card.Body>
            </Card>
        </Container>
       );
    }
}