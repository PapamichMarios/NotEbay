import React from 'react';

import Loading from '../loading/loading.js';
import * as Constants from '../constants.js';

import { Alert } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class OpenStreetMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zoom: 18,
        };
    }

    render() {
        const position = [this.props.lat, this.props.lng];

        if(this.props.lat === -1 && this.props.lng === -1) {
            return (
                <Alert variant="danger">
                    Could not resolve location for the information given. Please return and check your fields regarding
                    your address (<b> Street Address, City, Postal Code, Country </b>) in <b> step 2 </b> .
                    If you are sure you have given the correct information contact an admin after submitting your
                    application to the platform.
                </Alert>
            );
        } else {
            return (
              <Map ref="map" center={position} zoom={this.state.zoom}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        Your location.
                    </Popup>
                </Marker>
              </Map>
            );
        }
    }
}