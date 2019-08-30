import React from 'react';

import { Card, Table } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

export default class Inbox extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {

        let tableBody = [];
        tableBody.push (
            <tr key='key' className="clickable" onClick={() => this.props.showMessage(1)}>
                <td> Delis </td>
                <td> Thesis </td>
                <td> Timestamp </td>
            </tr>
        );

        return (
            <Card>
                <Card.Body>
                    <Card.Title as="h3" className="text-center"> Inbox </Card.Title>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th> Sender </th>
                                <th> Title </th>
                                <th> Time Received </th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableBody}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}