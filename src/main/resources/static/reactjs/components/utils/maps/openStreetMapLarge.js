import React from 'react';

import Loading from '../loading/loading.js';
import * as Constants from '../constants.js';

import { Alert } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';

export default class OpenStreetMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zoom: 9,
        };
    }

    render() {
        const position = [this.props.lat, this.props.lng];
        return (
          <Map ref="map" center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Somewhere in the area.
                </Popup>
            </Marker>
            <Circle center={[this.props.lat, this.props.lng]}  radius={5000} />
          </Map>

        );
    }
}