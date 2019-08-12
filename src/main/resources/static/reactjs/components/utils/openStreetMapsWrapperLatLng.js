import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Loading from './loading.js';
import * as Constants from './constants.js';
import OpenStreetMap from './openStreetMap.js';

export default class OpenStreetMapsWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <OpenStreetMap lat={this.props.lat} lng={this.props.lng} />
    }
}