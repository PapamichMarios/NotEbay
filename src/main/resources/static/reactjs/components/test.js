import React from 'react';

import getRequestUnauth from './utils/requests/getRequestUnauthorized';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch('/app/items/1/photos?filename=item1image.png')
        .then(response => response.blob())
        .then(image => {
            let outside = window.URL.createObjectURL(image);
            console.log(outside);
        })
        .catch(error => console.error("Error: ", error));
    }

    render() {
        return (
            <h1> 'xa0' </h1>
        );
    }
}