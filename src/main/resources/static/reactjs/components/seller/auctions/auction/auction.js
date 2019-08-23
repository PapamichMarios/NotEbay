import React from 'react';

import CurrentAuction from './currentAuction';
import EditAuction from './editAuction';

import Loading from '../../../utils/loading/loading';
import * as Constants from '../../../utils/constants';

import splitDateAndTime from '../../../utils/decoders/splitDateAndTime';

import getRequest from '../../../utils/requests/getRequest';
import deleteRequest from '../../../utils/requests/deleteRequest';

import { withRouter } from 'react-router-dom';
import {FaEdit, FaSearchDollar, FaTrash, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default class Auction extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            edit: false,

            auction: '',

            name: '',
            description: '',
            dateEnds: '',
            timeEnds: '',
            firstBid: '',
            buyPrice: '',
            country: '',
            location: '',
            lat: '',
            lng: '',
        };

        this.checkBidders = this.checkBidders.bind(this);
        this.undoEditAuction = this.undoEditAuction.bind(this);
        this.editAuction = this.editAuction.bind(this);
        this.deleteAuction = this.deleteAuction.bind(this);
    }

    //=====================================bidders listing
    checkBidders() {
        const url = this.props.location.pathname + '/bids';
        this.props.history.push(url);
    }

    //=====================================delete auction
    deleteAuction() {
        if(this.state.auction.active) {
            alert('Cannot delete item after someone has placed a bid.');
        } else {
            if (window.confirm('Are you sure you want to delete the current item?')) {
                deleteRequest(this.props.action + this.props.match.params.id)
                .then((response) => {
                    console.log('denyResponse:' + JSON.stringify(response));

                    if (response.error) {
                        alert(response.message);
                    } else {
                        this.props.history.push('/auctions');
                        alert('Item has been deleted from the platform.');
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        }
    }

    //=====================================edit auction
    undoEditAuction() {
        this.setState({
            edit: false
        });
    }

    editAuction() {
        if(this.state.auction.active) {
            alert('Cannot edit item after someone has placed a bid.');
        } else {
            this.setState({
                edit: true
            });
        }
    }

    //=========================================get info on the item
    componentDidMount() {
        getRequest(this.props.action + this.props.match.params.id)
        .then(data => {
            console.log(JSON.stringify(data));

            const [date, time] = splitDateAndTime(data.timeEnds);
            this.setState({
                auction: data,
                name: data.name,
                description: data.description,
                timeEnds: time,
                dateEnds: date,
                firstBid: data.firstBid,
                buyPrice: data.buyPrice,
                country: data.country,
                location: data.location,
                lat: data.geoLat,
                lng: data.geoLong,
            });
        })
        .catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION)
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        } else {
            if(this.state.edit && !this.state.auction.active){
                const { name, description, timeEnds, dateEnds, firstBid, buyPrice, country, location, lat, lng} = this.state
                const editUser = { name, description, timeEnds, dateEnds, firstBid, buyPrice, country, location, lat, lng };

                return(
                    <EditAuction
                        user={editUser}
                        undoEditAuction={this.undoEditAuction}
                    />
                );
            } else {
                return (
                    <CurrentAuction
                        auction={this.state.auction}
                        editAuction={this.editAuction}
                        deleteAuction={this.deleteAuction}
                        checkBidders={this.checkBidders}
                    />
               );
            }
        }
    }
}

Auction.defaultProps = {
    action: '/app/items/',
};