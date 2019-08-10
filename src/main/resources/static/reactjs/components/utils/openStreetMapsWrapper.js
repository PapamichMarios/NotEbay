import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Loading from './loading.js';
import * as Constants from './constants.js';
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
        fetch('https://nominatim.openstreetmap.org/search?q=+'
                + this.props.location.streetAddress + ', '
                + this.props.location.city + ' ' + this.props.location.postalCode + ', '
                + this.props.location.country
                + '&format=geojson', {
               headers: {
                   'Content-Type': 'application/json',
               },
               method: this.props.method
            })
            .then(data => data.json())
            .then((data) => {
                this.setState({
                    lat: data.features[0].geometry.coordinates[1],
                    lng: data.features[0].geometry.coordinates[0]
                })

                if (this.props.set) {
                    this.props.setGeoLocation(
                        data.features[0].geometry.coordinates[1],
                        data.features[0].geometry.coordinates[0]
                    );
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

OpenStreetMap.defaultProps = {
    action: 'https://nominatim.openstreetmap.org/search?q=',
    method: 'GET'
};