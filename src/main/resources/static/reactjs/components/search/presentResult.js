import React from 'react';

import dateDecoder from '../utils/decoders/dateDecoder';
import timeDecoder from '../utils/decoders/timeDecoder';

import { Card, Row, Col, Breadcrumb } from 'react-bootstrap';
import { Link, withRouter} from 'react-router-dom';

class PresentResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        //each item is represented by a card
        let results = [];
        this.props.items.map( item => {

            //handle breadcrumbs
            let breadcrumbs = [];
            breadcrumbs.push(
                <Breadcrumb.Item
                    key='home'
                    onClick={ () => this.props.history.push('/categories') }
                >
                    <b>All</b>
                </Breadcrumb.Item>
            );

            item.categories.map( (category, index) => {

                //handle breadcrumbs before
                let breadcrumbsParents = [];
                for(let i=0; i<=index; i++){
                    breadcrumbsParents.push({
                        name: item.categories[i].name,
                        id: item.categories[i].id
                    });
                }

                //link to categories
                breadcrumbs.push(
                    <Breadcrumb.Item
                        style={{paddingLeft: '0px'}}
                        key={category.id}
                        onClick={ () => {
                            this.props.history.push({
                                pathname: '/categories',
                                state: {
                                    name: category.name,
                                    id: category.id,
                                    breadcrumbs: breadcrumbsParents
                                }
                            });
                        }}
                    >
                        <b>{category.name}</b>
                    </Breadcrumb.Item>
                );
            })

            //push item
            results.push (
                <div key={item.id}>
                    <Card border="black" style={{width: '100%'}} >
                        <Card.Body>
                            <Row>
                                <Col md="3">
                                    <div className="text-center">
                                        <img src={'/app/items/' + item.id + '/images/' + item.imageId} width='225' height= '200'/>
                                    </div>
                                </Col>

                                <Col md="9">
                                    <Row>
                                        <Col className="body-text">
                                            <Link to={'/auctions/' + item.id}>
                                                <h5> <b>{item.name}</b> </h5>
                                            </Link>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                             <Breadcrumb className="bg-transparent" style={{width:'100%'}}>
                                                {breadcrumbs}
                                            </Breadcrumb>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="5">
                                            <Row>
                                                <Col className="header" md="6">
                                                    Bids: <br/>
                                                    { item.bestBid ? 'Best Bid:' : 'Starting Bid:' }<br/>
                                                    Buy Price: <br/>
                                                </Col>

                                                <Col className="body-text" md="6">
                                                    {item.numOfBids} <br/>
                                                    { item.bestBid ? item.bestBid.bidAmount + '$' : item.firstBid + '$' } <br/>
                                                    { item.buyPrice ? item.buyPrice + '$' : '--' } <br/>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md="7">
                                            <Row>
                                                <Col className="header" md="4">
                                                    Location: <br/>
                                                    Seller: <br/>
                                                    Time Ending: <br/>
                                                </Col>

                                                <Col className="body-text" md="8">
                                                    {item.location}, {item.country} <br/>
                                                    <Link to={'/profile/' + item.sellerId}>
                                                        <b>{item.sellerName}</b>
                                                    </Link>
                                                    <br/>
                                                    {timeDecoder(item.timeEnds) + ', ' + dateDecoder(item.timeEnds)} <br/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <br/>
                </div>
            );
        });

        return (
            <div>
                {results}
            </div>
        );
    }
}

export default withRouter(PresentResult);