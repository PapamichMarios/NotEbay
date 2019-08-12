import  React from 'react';

import * as Constants from '../../utils/constants.js';

import { Container, Table, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

class ApplicationItem extends React.Component {
    constructor(props) {
        super(props);

        this.approve = this.approve.bind(this);
        this.deny = this.deny.bind(this);
    }

    approve(e) {
        e.preventDefault();
        fetch(this.props.action + this.props.value.id, {
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': Constants.ACCESS_TOKEN
               },
               method: 'PUT',
               body: JSON.stringify({
                         enable: true
                     })
            })
            .then(response => response.json())

            //handle success
            .then((response) => {
                console.log('approveResponse:' + JSON.stringify(response));

                if (response.error) {
                    alert(response.message);
                } else {
                    this.props.history.push('/users');
                    alert('User has been approved access to the platform.');
                }
            })

            //handle error in promise
            .catch(error => console.error('Error:', error));
    }

    deny(e) {
        e.preventDefault();

        fetch(this.props.action + this.props.value.id, {
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': Constants.ACCESS_TOKEN
               },
               method: 'DELETE'
            })

            .then(response => response.json())

            .then((response) => {
                console.log('denyResponse:' + JSON.stringify(response));

                if (response.error) {
                    alert(response.message);
                } else {
                    this.props.history.push('/users');
                    alert('User has been deleted from the platform.');
                }
            });
    }

    render() {
        if (!this.props.value.enabled) {
            return (
                <tr>
                    <td>
                        <Link to={`/applications/${this.props.value.id}`} >
                            <FaExternalLinkAlt />
                        </Link>
                    </td>
                    <td> {this.props.value.id} </td>
                    <td> {this.props.value.username} </td>
                    <td> {this.props.value.firstName} </td>
                    <td> {this.props.value.lastName} </td>
                    <td> {this.props.value.email} </td>
                    <td> {this.props.value.phone} </td>
                    <td> {this.props.value.streetAddress} </td>
                    <td> {this.props.value.postalCode} </td>
                    <td> {this.props.value.city} </td>
                    <td> {this.props.value.country} </td>

                    <td style={{textAlign: 'center'}}>
                        <Button size="sm" variant="outline-success" onClick={this.approve} style={{borderWidth:'0px'}}>
                            <FaCheck />
                        </Button>
                    </td>

                    <td style={{textAlign: 'center'}}>
                        <Button size="sm" variant="outline-danger" onClick={this.deny} style={{borderWidth:'0px'}}>
                            <FaTimes />
                        </Button>
                    </td>
                </tr>
            );
        } else {
            return null;
        }
    }
}

ApplicationItem.defaultProps = {
    action: 'app/users/'
}

export default withRouter(ApplicationItem);