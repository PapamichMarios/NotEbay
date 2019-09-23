import React from 'react';

import getRequest from '../../utils/requests/getRequest';
import * as Constants from '../../utils/constants';

import { Button } from 'react-bootstrap';
import { FaFileExport } from 'react-icons/fa';

export default class ExportAuction extends React.Component {
    constructor(props) {
        super(props);

        this.exportAuctionUser = this.exportAuctionUser.bind(this);
        this.exportAuctionAll = this.exportAuctionAll.bind(this);
    }

    exportAuctionAll() {
        const url = '/app/items/';

        if(this.props.format === 'json') {
            fetch(url + 'json', {
                headers: {
                    'Authorization': Constants.ACCESS_TOKEN
                }
            })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'all_auctions.json';
                a.click();
            })
            .catch(error => console.error("Error: ", error));
        } else {
            fetch(url + 'xml', {
                headers: {
                    'Authorization': Constants.ACCESS_TOKEN
                }
            })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'all_auctions.xml';
                a.click();
            })
            .catch(error => console.error("Error: ", error));
        }
    }

    exportAuctionUser() {
        const url = this.props.action + this.props.id + '/items/';

        if(this.props.format === 'json') {
            fetch(url + 'json', {
                headers: {
                    'Authorization': Constants.ACCESS_TOKEN
                }
            })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'user' + this.props.id + '_items.json';
                a.click();
            })
            .catch(error => console.error("Error: ", error));
        } else {
            fetch(url + 'xml', {
                headers: {
                    'Authorization': Constants.ACCESS_TOKEN
                }
            })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'user' + this.props.id + '_items.xml';
                a.click();
            })
            .catch(error => console.error("Error: ", error));
        }
    }

    render() {
        if(this.props.all) {
            return (
               <Button onClick={this.exportAuctionAll} style={{borderWidth:'0px'}} variant="outline-primary">
                    <FaFileExport style={{verticalAlign: 'baseline'}} />
               </Button>
            );
        } else {
            return (
               <Button size="sm" onClick={this.exportAuctionUser} style={{borderWidth:'0px'}} variant="outline-primary">
                    <FaFileExport style={{verticalAlign: 'baseline'}} />
               </Button>
            );
        }
    }
}

ExportAuction.defaultProps = {
    action: '/app/users/'
}