import React    from 'react';
import { Container, Table, Card } from 'react-bootstrap';

function UserItem(props) {
    return (
        <tr>
            <td> {props.value.username} </td>
            <td> {props.value.firstName} </td>
            <td> {props.value.lastName} </td>
            <td> {props.value.email} </td>
            <td> {props.value.phone} </td>
            <td> {props.value.streetAddress} </td>
            <td> {props.value.postalCode} </td>
            <td> {props.value.city} </td>
            <td> {props.value.country} </td>
        </tr>
    )
}

export default class UserListing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <Container fluid>
            <Card border="dark">
                <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> User Database </Card.Header>
                    <Card.Body>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th> Username </th>
                                    <th> First Name </th>
                                    <th> Last Name </th>
                                    <th> Email  </th>
                                    <th> Phone </th>
                                    <th> Street Address </th>
                                    <th> Postal Code </th>
                                    <th> City </th>
                                    <th> Country </th>
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