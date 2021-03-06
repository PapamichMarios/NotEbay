import React from 'react';

import PresentResult from './search/presentResult';
import PresentSidebar from './search/presentResultSidebar';

import Paging from './utils/paging';
import getRequestUnauth from './utils/requests/getRequestUnauthorized';
import Loading from './utils/loading/loading';
import * as Constants from './utils/constants';
import dateDecoder from './utils/decoders/dateDecoder';
import timeDecoder from './utils/decoders/timeDecoder';

import { Container, Row, Col, Card, Breadcrumb, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class Categories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            categories: [],
            breadcrumbs: [],

            items: [],
            activePage: 1,
            paging: ''
        };

        this.getItems = this.getItems.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
        this.getLocationProps = this.getLocationProps.bind(this);
    }

    //paging
    changeActivePage(pageNum) {
        this.setState({
            activePage: pageNum
        });
    }

    getLocationProps(props) {

        if(props.state !== undefined) {

            //set loading
            this.setState({loading: true});

            //make request
            const url = '/app/categories/' + this.props.location.state.id + '/subs';
            getRequestUnauth(url)
            .then(categories => {

                if(categories.length === 0) {

                    //redirect to searchResults
                    this.props.history.push({
                        pathname: '/searchResults/category=' + this.props.location.state.name,
                        state: {
                            category: this.props.location.state.name,
                            id: this.props.location.state.id,
                            breadcrumbs: this.props.location.state.breadcrumbs
                        }
                    });

                } else {

                    //keep on printing the children
                    this.setState({
                        categories: categories,
                        breadcrumbs: this.props.location.state.breadcrumbs
                    },
                    () => {
                        setTimeout( () => {
                            this.setState({loading: false})
                        }, Constants.TIMEOUT_DURATION);
                    });

                }

            })
            .catch(error => console.error('Error', error));

        } else {

            this.setState({
                categories: JSON.parse(localStorage.getItem('categories')),
                breadcrumbs: []
            },
            () => {
                setTimeout( () => {
                    this.setState({loading: false})
                }, Constants.TIMEOUT_DURATION);
            });

        }
    }

    getItems(pageNum) {

        //set loading
        this.setState({ loading: true });

        //make the request
        const url = '/app/search/' + this.props.location.state.id + '?page='
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

    //when a user chooses a new category
    componentDidUpdate(nextProps) {
        if (JSON.stringify(nextProps.location) !== JSON.stringify(this.props.location)) {

            //get children subcategories
            this.getLocationProps(this.props.location);

            //get items in the current category
            if(this.props.location.state != null) {
                this.getItems(this.state.activePage);
            }

        }
    }

    componentDidMount() {

        //get children subcategories
        this.getLocationProps(this.props.location);

        //get items in the current category
        if(this.props.location.state !== undefined) {
            this.getItems(this.state.activePage);
        }
    }

    render() {
        if(this.state.loading === true) {
            return <Loading />;
        } else {

            //handle breadcrumbs
            let breadcrumbBody = [];
            breadcrumbBody.push(
                <Breadcrumb.Item
                    key='00'
                    onClick={ () => {this.props.history.push('/categories')} }
                >
                    All Categories
                </Breadcrumb.Item>
            );

            this.state.breadcrumbs.map( (category, index) => {
                //handle the ones before it
                let breadcrumbsParents = [];
                for(let i=0; i<=index; i++){
                    breadcrumbsParents.push({
                        name: this.state.breadcrumbs[i].name,
                        id: this.state.breadcrumbs[i].id
                    });
                }

                //push breadcrumb
                breadcrumbBody.push(
                    <Breadcrumb.Item
                        key={category.id}
                        onClick={ () => {
                            this.props.history.push({
                                pathname: '/categories',
                                state: {
                                    name: category.name,
                                    id: category.id,
                                    breadcrumbs: breadcrumbsParents,
                                }
                            });
                        }}
                    >
                        {category.name}
                    </Breadcrumb.Item>
                );
            });

            //handle the categories appearing
            let childrenCategories = [];
            this.state.categories.map( category => {
                childrenCategories.push(
                    <Col md="3" key={category.id}>
                        <Button
                            size="lg"
                            block
                            style={{height: '150px', marginBottom: '5px', marginTop: '5px'}}
                            variant="dark"
                            onClick={ () => {
                                    let breadcrumbs = this.state.breadcrumbs;
                                    breadcrumbs.push({name: category.name, id: category.id});

                                    this.props.history.push({
                                        pathname: '/categories',
                                        state: {
                                            name: category.name,
                                            id: category.id,
                                            breadcrumbs: breadcrumbs,
                                        }
                                    });
                                }
                            }
                        >
                            {category.name}
                        </Button>
                    </Col>
                );
            });

            return (
                <Container className="navbar-margin">
                    <Row>
                        <Col>

                            {/* breadcrumbs */}
                            <Row>
                                <Col>
                                    <Breadcrumb>
                                        {breadcrumbBody}
                                    </Breadcrumb>
                                </Col>
                            </Row>

                            {/* categories */}
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title as='h4'>
                                                Category: <b> {this.props.location.state !== undefined ? this.props.location.state.name : 'All Categories'} </b>
                                            </Card.Title>

                                            <Row>
                                                {childrenCategories}
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <br />
                            <br />

                            {/* items for each category */}
                            {this.state.items.length > 0 && (
                                <Row>
                                    <Col>
                                        <PresentResult items={this.state.items} />

                                        <Paging
                                            totalPages={this.state.paging.totalPages}
                                            getData={this.getItems}
                                            activePage={this.state.activePage}
                                            changeActivePage={this.changeActivePage}
                                        />
                                    </Col>
                                </Row>
                            )}

                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default withRouter(Categories);