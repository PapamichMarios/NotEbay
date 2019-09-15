import React from 'react';

import getRequestUnauth from './utils/requests/getRequestUnauthorized';
import Loading from './utils/loading/loading';
import * as Constants from './utils/constants';

import { Container, Row, Col, Card, Breadcrumb, Button } from 'react-bootstrap';

export default class Categories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            categories: [],
            breadcrumbs: []
        };

        this.getLocationProps = this.getLocationProps.bind(this);
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
                        pathname: '/searchResults?category=' + this.props.location.state.name,
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

    //when a user chooses a new category
    componentDidUpdate(nextProps) {
        if (JSON.stringify(nextProps.location) !== JSON.stringify(this.props.location)) {
            this.getLocationProps(this.props.location);
        }
    }

    componentDidMount() {
        this.getLocationProps(this.props.location);
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
                    All
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
                            <Card>
                                <Breadcrumb>
                                    {breadcrumbBody}
                                </Breadcrumb>

                                <Card.Body>
                                    <Card.Title as='h4'>
                                        Category: <b> {this.props.location.state !== undefined ? this.props.location.state.name : 'All'} </b>
                                    </Card.Title>

                                    <Row>
                                        {childrenCategories}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}