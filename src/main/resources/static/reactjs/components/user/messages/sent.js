import React from 'react';

import { Card, Table } from 'react-bootstrap';

export default class Sent extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title as="h3" className="text-center"> Sent </Card.Title>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th> Receiver </th>
                                <th> Title </th>
                                <th> Time Sent </th>
                            </tr>
                        </thead>

                        <tbody>

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}