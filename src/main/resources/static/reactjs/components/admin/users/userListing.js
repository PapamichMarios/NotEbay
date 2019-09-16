import React    from 'react';

import UserItem from './userItem';

import { Container, Table, Card, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class UserListing extends React.Component {
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
                                    <th> JSON </th>
                                    <th> XML </th>
                                    <th> Username </th>
                                    <th> First Name </th>
                                    <th> Last Name </th>
                                    <th> Email  </th>
                                    <th> City </th>
                                    <th> Country </th>
                                    <th> Approved </th>
                                </tr>
                            </thead>

                            <tbody>
                                    {this.props.users.map(user => <UserItem key={user.id} value={user}/>)}
                            </tbody>
                        </Table>
                    </Card.Body>
            </Card>
        </Container>
       );
    }
}

export default withRouter(UserListing);