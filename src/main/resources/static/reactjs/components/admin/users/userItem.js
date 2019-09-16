import React from 'react';

import ExportAuction from '../auction/exportAuction';

import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FaExternalLinkAlt, FaUserCheck, FaUserTimes } from 'react-icons/fa';

class UserItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.value.enabled) {
            return (
                <tr>
                    <td>
                        <Button
                            size="sm"
                            style={{borderWidth:'0px'}}
                            variant="outline-primary"
                            onClick={ () => this.props.history.push('/users/' + this.props.value.id)}
                        >
                            <FaExternalLinkAlt style={{verticalAlign: 'baseline'}} className="text-primary"/>
                        </Button>
                    </td>
                    <td> <ExportAuction format='json' id={this.props.value.id} /> </td>
                    <td> <ExportAuction format='xml'  id={this.props.value.id} /> </td>
                    <td> {this.props.value.username} #{this.props.value.id}</td>
                    <td> {this.props.value.firstName} </td>
                    <td> {this.props.value.lastName} </td>
                    <td> {this.props.value.email} </td>
                    <td> {this.props.value.city} </td>
                    <td> {this.props.value.country} </td>
                    <td style={{textAlign: 'center'}}> <FaUserCheck /> </td>
                </tr>
            );
        } else {
            return (
                <tr style={{color: 'red'}}>
                    <td>
                        <Button
                            size="sm"
                            style={{borderWidth:'0px'}}
                            variant="outline-primary"
                            onClick={ () => this.props.history.push('/applications/' + this.props.value.id)}
                        >
                            <FaExternalLinkAlt style={{verticalAlign: 'baseline'}}/>
                        </Button>
                    </td>
                    <td> </td>
                    <td> </td>
                    <td> {this.props.value.username} #{this.props.value.id} </td>
                    <td> {this.props.value.firstName} </td>
                    <td> {this.props.value.lastName} </td>
                    <td> {this.props.value.email} </td>
                    <td> {this.props.value.city} </td>
                    <td> {this.props.value.country} </td>
                    <td style={{textAlign: 'center'}}> <FaUserTimes /> </td>
                </tr>
            )
        }
    }
}

export default withRouter(UserItem);