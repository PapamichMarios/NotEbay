import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Loading from '../loading/loading.js';
import * as Constants from '../constants.js';
import OpenStreetMap from './openStreetMap.js';

export default class OpenStreetMapsWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: '',
            lng: '',

            loading:true
        };
    }

    componentDidMount() {
        fetch(this.props.action +
            'street=' + this.props.location.streetAddress +
            '&city='  + this.props.location.city +
            '&country=' + this.props.location.country +
            '&postalcode=' + this.props.location.postalCode +
            '&format=json', {
               headers: {
                   'Content-Type': 'application/json',
               },
               method: this.props.method
        })
        .then(data => data.json())
        .then((data) => {
            if(data.length === 0) {
                this.setState({
                    lat: -1,
                    lng: -1
                });

                if (this.props.set) {
                    this.props.setGeoLocation( -1, -1);
                }
            } else {
                this.setState({
                    lat: data[0].lat,
                    lng: data[0].lon
                });

                if (this.props.set) {
                    this.props.setGeoLocation(
                        data[0].lat,
                        data[0].lon
                    );
                }
            }
        });

        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION)
    }

    render() {
        if (this.state.loading){
            return <Loading />
        } else {
            return <OpenStreetMap lat={this.state.lat} lng={this.state.lng} />
        }
      }
}

OpenStreetMapsWrapper.defaultProps = {
    action: 'https://nominatim.openstreetmap.org/search?',
    method: 'GET'
};