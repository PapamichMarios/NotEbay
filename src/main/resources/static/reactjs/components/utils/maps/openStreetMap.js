import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Loading from '../loading/loading.js';
import * as Constants from '../constants.js';

export default class OpenStreetMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zoom: 18,
        };
    }

    render() {
        const position = [this.props.lat, this.props.lng];
        return (
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Is this your location?
              </Popup>
            </Marker>
          </Map>
        );
    }
}