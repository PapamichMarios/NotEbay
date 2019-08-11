import React    from 'react';
import { Container, Table, Card, Button } from 'react-bootstrap';

import ApplicationItem from './applicationItem.js';

export default class ApplicationListing extends React.Component {
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
                                    <th> </th>
                                    <th> User ID </th>
                                    <th> Username </th>
                                    <th> First Name </th>
                                    <th> Last Name </th>
                                    <th> Email  </th>
                                    <th> Phone </th>
                                    <th> Street Address </th>
                                    <th> Postal Code </th>
                                    <th> City </th>
                                    <th> Country </th>
                                    <th> Approve </th>
                                    <th> Deny </th>
                                </tr>
                            </thead>

                            <tbody>
                                    {this.props.users.map(user => <ApplicationItem
                                                                        key={user.id}
                                                                        value={user}
                                                                   />)}
                            </tbody>
                        </Table>
                    </Card.Body>
            </Card>
        </Container>
       );
    }
}