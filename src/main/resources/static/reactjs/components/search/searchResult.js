import React from 'react';

import '../../../css/user/profile.css';

import getRequestUnauth from '../utils/requests/getRequestUnauthorized';
import Loading from '../utils/loading/loading';
import * as Constants from '../utils/constants';
import Paging from '../utils/paging';
import dateDecoder from '../utils/decoders/dateDecoder';
import timeDecoder from '../utils/decoders/timeDecoder';

import { Container, Row, Col, Card, Nav, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            items: [],
            activePage: 1,
            paging: ''
        };

        this.changeActivePage = this.changeActivePage.bind(this);
        this.searchCategory = this.searchCategory.bind(this);
        this.whatToSearch = this.whatToSearch.bind(this);
    }

    //paging
    changeActivePage(pageNum) {
        this.setState({
            activePage: pageNum
        });
    }

    //search a category
    searchCategory(pageNum, id) {

        this.setState({loading: true});

        const url = '/app/search/' + id + '?page='
                    + (pageNum-1) + '&size=10';

        getRequestUnauth(url)
        .then(items =>  {
            if(items.error) {

                if(items.status === 500) {
                    this.props.history.push('/internal-server-error');
                }

                if(items.status === 404) {
                    this.props.history.push('/items-not-found');
                }

            } else {

                this.setState({
                    items: items.content,
                    paging: items
                },
                () => {
                    //set loading
                    setTimeout(() => {
                      this.setState({loading: false})
                    }, Constants.TIMEOUT_DURATION)
                })

            }
        })
        .catch(error => console.error('Error', error));
    }

    //search an item name
    searchName(pageNum, name) {

        this.setState({loading: true});

        //make the request
        const url = '/app/search/itemName?page=' + (pageNum-1) + '&size=10' + '&name=' + name;

        getRequestUnauth(url)
        .then(items =>  {
            if(items.error) {

                if(items.status === 500) {
                    this.props.history.push('/internal-server-error');
                }

                if(items.status === 404) {
                    this.props.history.push('/items-not-found');
                }

            } else {

                console.log(items);
                this.setState({
                    items: items.content,
                    paging: items
                },
                () => {
                    //set loading
                    setTimeout(() => {
                      this.setState({loading: false})
                    }, Constants.TIMEOUT_DURATION)
                })

            }
        })
        .catch(error => console.error('Error', error));
    }

    whatToSearch(pageNum) {
        if(this.props.location.state.category !== undefined) {
            this.searchCategory(pageNum, this.props.location.state.id)
        } else if (this.props.location.state.name !== undefined) {
            this.searchName(pageNum, this.props.location.state.name)
        }
    }

    componentDidUpdate(nextProps) {
        if (JSON.stringify(nextProps.location) !== JSON.stringify(this.props.location)) {
            this.whatToSearch(this.state.activePage);
        }
    }

    componentDidMount() {
        this.whatToSearch(this.state.activePage);
    }

    render() {
        if(this.state.loading) {
            return <Loading />
        } else {

            //each item is represented by a card
            let results = [];
            this.state.items.map( item => {
                results.push (
                    <div>
                        <Card border="black" style={{width: '100%'}} key={item.id}>
                            <Card.Body>
                                <Row>
                                    <Col md="3">
                                        to put image
                                    </Col>

                                    <Col md="9">
                                        <Row>
                                            <Col className="body-text">
                                                <b> {item.name} </b>
                                            </Col>
                                        </Row>

                                        <br/>

                                        <Row>
                                            <Col md="4">
                                                <Row>
                                                    <Col className="header" md="6">
                                                        Bids: <br/>
                                                        Best Bid: <br/>
                                                        Buy Price: <br/>
                                                    </Col>

                                                    <Col className="body-text" md="6">
                                                        {item.numOfBids} <br/>
                                                        { item.bestBid ? item.bestBid.bidAmount + '$' : '--' } <br/>
                                                        { item.buyPrice ? item.buyPrice + '$' : '--' } <br/>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col md="8">
                                                <Row>
                                                    <Col className="header" md="4">
                                                        Location: <br/>
                                                        Seller: <br/>
                                                        Time Ending: <br/>
                                                    </Col>

                                                    <Col className="body-text" md="8">
                                                        {item.location} <br/>
                                                        to put seller <br/>
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
                <Container fluid>
                    <Row>

                        {/* sidebar */}
                        <Col md={2} style={{paddingLeft: '0px'}}>
                            <Card border="light">
                                <ul style={{listStyleType: 'none', height:'100vh'}}>
                                    <Nav.Link disabled className="text-center">
                                        <b> Category </b>
                                    </Nav.Link>

                                    <li className='my-list'>
                                        <Nav.Link style={{fontSize: '15px', color: 'Black'}} className="text-center">
                                            <b>{this.props.location.state.category}</b>
                                        </Nav.Link>
                                    </li>

                                    <Nav.Link disabled className="text-center">
                                        <b> Item Location </b>
                                    </Nav.Link>

                                    <li className='my-list'>
                                        <Nav.Link style={{fontSize: '15px', color: 'Black'}} >

                                        </Nav.Link>
                                    </li>

                                    <Nav.Link disabled className="text-center">
                                        <b> Price Range </b>
                                    </Nav.Link>

                                    <li className='my-list'>
                                        <Nav.Link style={{fontSize: '15px', color: 'Black'}} >

                                        </Nav.Link>
                                    </li>
                                </ul>
                            </Card>
                        </Col>


                        {/* item representation */}
                        <Col md="9" className="navbar-margin">

                            {results}

                            <br />

                            <Paging
                                totalPages={this.state.paging.totalPages}
                                getData={this.whatToSearch}
                                activePage={this.state.activePage}
                                changeActivePage={this.changeActivePage}
                            />

                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}