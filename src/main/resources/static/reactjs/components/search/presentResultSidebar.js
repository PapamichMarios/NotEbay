import React from 'react';

import { Card, Nav } from 'react-bootstrap';

export default class PresentSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        //get the item locations on all items
        let locations = [];
        this.props.items.map( item => {

            //check if item location and country is already in locations list
            let already = false;
            locations.map( location => {
                if(location.city === item.location) {
                    already = true;
                }
            });

            if(!already) {
                locations.push({
                    country: item.country,
                    city: item.location
                })
            }
        });

        let locationsRender = [];
        locations.map( location => {
            locationsRender.push (
                <li className='my-list text-center' key={location.city}>
                    {location.city}, {location.country}
                </li>
            );
        })

        //get the price range
        let minPrice = Number.MAX_SAFE_INTEGER;
        let maxPrice = Number.MIN_SAFE_INTEGER;
        this.props.items.map( item => {

            if(item.buyPrice != null) {
                if(minPrice > item.buyPrice) {
                    minPrice = item.buyPrice;
                }
            }

            if(item.buyPrice != null) {
                if(maxPrice < item.buyPrice) {
                    maxPrice = item.buyPrice;
                }
            }
        });

        return (
            <Card border="light">
                <ul style={{listStyleType: 'none', height:'100vh'}}>

                    <Nav.Link disabled className="text-center">
                        <b> Item Location </b>
                    </Nav.Link>

                    {locationsRender}

                    <Nav.Link disabled className="text-center">
                        <b> Price Range </b>
                    </Nav.Link>

                    <li className='my-list text-center'>
                        <b>From:</b> {minPrice} <b>To:</b> {maxPrice}
                    </li>
                </ul>
            </Card>
        );
    }
}