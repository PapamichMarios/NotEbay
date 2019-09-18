import React from 'react';

import '../../../css/user/profile.css';

import PresentResult from './presentResult';
import PresentSidebar from './presentResultSidebar';

import getRequestUnauth from '../utils/requests/getRequestUnauthorized';
import Loading from '../utils/loading/loading';
import * as Constants from '../utils/constants';
import Paging from '../utils/paging';

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

        this.multiSearch = this.multiSearch.bind(this);
        this.searchName = this.searchName.bind(this);
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

    //advanced search
    multiSearch(pageNum, state) {
        console.log(state);
        this.setState({loading: true});

        let url = '/app/search';

        //add categories to link
        (state.category.length > 0) ? (url += '/' + state.category[state.category.length-1].value) : null;

        url += '/mulFields?page=' + (pageNum-1) + '&size=10';

        //add name to the request
        (state.name  !== '') ? (url += '&name=' + state.name) : null;

        //add the rest likewise
        (state.minPrice !== ''    ) ? (url += '&minM=' + state.minPrice)     : null;
        (state.maxPrice !== ''    ) ? (url += '&maxM=' + state.maxPrice)     : null;
        (state.country !== ''     ) ? (url += '&cnt=' + state.country)       : null;
        (state.city !== ''        ) ? (url += '&loc=' + state.city)          : null;
        (state.description !== '' ) ? (url += '&descr=' + state.description) : null;

        //make the request
        getRequestUnauth(url)
        .then(items => {
            console.log(items);
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
        //console.log("dfafsfafafer23");
        //make the request
        const url = '/app/search/itemName?page=' + (pageNum-1) + '&size=10' + '&name=' + name;
        console.log(url);
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

        //need to see if we have advanced search
        if(this.props.location.state.category != null) {

            //meaning we have advanced search
            if(this.props.location.state.name != null) {

                this.multiSearch(pageNum, this.props.location.state)

            } else {

                //simple category search
                this.searchCategory(pageNum, this.props.location.state.id)

            }

        } else if (this.props.location.state.name != null) {

            this.searchName(pageNum, this.props.location.state.name)

        }
    }

    componentDidUpdate(nextProps) {
        if (JSON.stringify(nextProps.location) !== JSON.stringify(this.props.location)) {
            this.whatToSearch(this.state.activePage);
        }
    }

    componentDidMount() {
        if(this.props.location.state != null) {
            this.whatToSearch(this.state.activePage);
        } else {
            this.props.history.push('/items-not-found');
        }

    }

    render() {
        if(this.state.loading) {
            return <Loading />
        } else {

            return (
                <Container fluid>
                    <Row>

                        {/* sidebar */}
                        <Col md={2} style={{paddingLeft: '0px'}}>
                            <PresentSidebar
                                items={this.state.items}
                            />
                        </Col>


                        {/* item representation */}
                        <Col md="9" className="navbar-margin">

                            <PresentResult
                                items={this.state.items}
                            />

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