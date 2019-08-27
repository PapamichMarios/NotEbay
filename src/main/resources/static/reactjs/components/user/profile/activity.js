import React from 'react';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import getRequest from '../../utils/requests/getRequest';
import OpenStreetMap from '../../utils/maps/openStreetMap';
import Paging from '../../utils/paging';
import dateDecoder from '../../utils/decoders/dateDecoder';
import timeDecoder from '../../utils/decoders/timeDecoder';

import '../../../../css/user/profile.css';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Activity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingActivity: true,
            loadingBids: false,
            loadingItems: false,
            activePageBids: 1,
            activePageItems: 1,
            pagingBids: '',
            pagingItems: ''
        }

        this.changeActivePageBids = this.changeActivePageBids.bind(this);
        this.changeActivePageItems = this.changeActivePageItems.bind(this);
        this.getBids = this.getBids.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    changeActivePageBids(pageNum) {
        this.setState({
            activePageBids: pageNum
        });
    }

    changeActivePageItems(pageNum) {
        this.setState({
            activePageItems: pageNum
        });
    }

    getBids(pageNum) {
        this.setState({loadingBids: true});
        const url = '/app/users/' + this.props.id + '/activity?page='
            + (pageNum-1) + '&size=5';

        getRequest(url)
        .then(pages => {
            this.setState({
                pagingBids: pages.pagedResponse2,
            },() =>
                setTimeout(() => {
                  this.setState({loadingBids: false})
                }, Constants.TIMEOUT_DURATION));

        })
        .catch(error => console.error('Error:', error));
    }

    getItems(pageNum) {
        this.setState({loadingItems: true});
        const url = '/app/users/' + this.props.id + '/activity?page='
            + (pageNum-1) + '&size=5';

        getRequest(url)
        .then(pages => {
            this.setState({
                pagingItems: pages.pagedResponse1
            },
            () =>
                setTimeout(() => {
                  this.setState({loadingItems: false})
                }, Constants.TIMEOUT_DURATION));

        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        const url = '/app/users/' + this.props.id + '/activity?page=0&size=5';

        getRequest(url)
        .then(pages => {
            console.log(pages);
            this.setState({
                pagingBids: pages.pagedResponse2,
                pagingItems: pages.pagedResponse1
            }, () => this.setState({loadingActivity: false}));
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        if(this.state.loadingActivity) {
            return <Loading />;
        } else {
            const bidList = [];
            this.state.pagingBids.content.map(bid => {
                bidList.push(
                    <div key={bid.bidTime}>
                        <li>
                            You have placed a bid of <b>{bid.bidAmount}</b> on &nbsp;
                            <Link to={`/auctions/${bid.id}`}>
                                item #{bid.id}
                            </Link>.
                            <br />
                            <span style={{color: 'DimGray', fontSize: '12px'}}>
                                {timeDecoder(bid.bidTime)} - {dateDecoder(bid.bidTime)}
                            </span>
                        </li>

                        <br />
                    </div>
                );
            });

            const itemList = [];
            this.state.pagingItems.content.map(item => {
                itemList.push(
                    <div key={item.timeStarted}>
                        <li>
                            You have submitted item
                            <Link to={`/my-auctions/${item.id}`}>
                                <b> {item.name} </b>
                            </Link>
                            for auction, with the starting bid being that of <b>{item.firstBid}</b>.
                            <br />
                            <span style={{color: 'DimGray', fontSize: '12px'}}>
                                {timeDecoder(item.timeStarted)} - {dateDecoder(item.timeStarted)}
                            </span>
                        </li>

                        <br />
                    </div>
                );
            });

            return (
                <Container>
                    <Row>
                        <Col>
                            <h4 className="text-center"> <b>Bids Bet</b> </h4>
                            {this.state.loadingBids ? (
                                <Loading />
                            ) : (
                                <ul style={{listStyleType: 'none'}}>
                                    {bidList}
                                </ul>
                            )}
                        </Col>

                        <Col>
                            <h4 className="text-center"> <b>Items Submitted</b> </h4>
                            {this.state.loadingItems ? (
                                <Loading />
                            ) : (
                                <ul style={{listStyleType: 'none'}}>
                                    {itemList}
                                </ul>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Paging
                                totalPages={this.state.pagingBids.totalPages}
                                getData={this.getBids}
                                activePage={this.state.activePageBids}
                                changeActivePage={this.changeActivePageBids}
                            />
                        </Col>

                        <Col>
                            <Paging
                                totalPages={this.state.pagingItems.totalPages}
                                getData={this.getItems}
                                activePage={this.state.activePageItems}
                                changeActivePage={this.changeActivePageItems}
                            />
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}