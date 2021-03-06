import React    from 'react';

import ApplicationItem from './applicationItem.js';
import Paging from '../../utils/paging';

import { Container, Table, Card, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

export default class ApplicationListing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <Container fluid className="navbar-margin">
            <Card border="dark">
                <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Applications Pending </Card.Header>
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

                        <Paging
                            totalPages={this.props.paging.totalPages}
                            getData={this.props.getData}
                            activePage={this.props.activePage}
                            changeActivePage={this.props.changeActivePage}
                        />
                    </Card.Body>
            </Card>
        </Container>
       );
    }
}