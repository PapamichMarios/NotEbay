import React from 'react';

import AsyncSelect from 'react-select/async';

import postRequest from '../utils/requests/postRequest';
import LoadingButton from '../utils/loading/loadingButton.js';
import * as Constants from '../utils/constants.js';

import { Container, Row, Col, Card, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { CountryDropdown } from 'react-country-region-selector';

export default class AdvancedSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            description: '',
            name: '',
            minPrice: '',
            maxPrice: '',
            country: '',
            city: '',
            loading: false,

            currId: '',
            root: true,

            hasError: false,
            errorMsg: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(selectedOption) {

        //when deleting the first selected category
        if(selectedOption == null) {

            this.setState({
                categories: [],
                currId: '',
                root: true
            })

        } else {

            //when resetting
            if(selectedOption.length === 0) {

                this.setState({
                    categories: [],
                    currId: '',
                    root: true
                })

            } else {

                this.setState({
                    categories: selectedOption,
                    currId: selectedOption[selectedOption.length-1].value
                });

            }

        }
    }

    mapOptionsToValues(options){
        return options.map(option => ({
            value: option.id,
            label: option.name
        }));
    };

    getOptions(inputValue, callback) {

        //parent categories
        if(this.state.root) {

            fetch('/app/categories/rootSubs')
            .then( response => response.json())
            .then( response => {
                //map response to multi select
                this.setState({
                    root: false
                },
                    () => {
                        callback(this.mapOptionsToValues(response));
                    }
                )
            });

        } else {

            fetch('/app/categories/' + this.state.currId + '/subs')
            .then( response => response.json())
            .then( response => {
                //map response to multi select
                callback(this.mapOptionsToValues(response));
            });

        }
    }

    selectCountry (val) {
        this.setState({
            country: val
        });
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(){
        //set loading
        this.setState({loading: true});

        //check if prices are correct
        if(this.state.minPrice > this.state.maxPrice) {

            //error
            this.setState({
                hasError: true,
                errorMsg: 'The minimum price field has to be less or equal than the maximum price field.',
                loading: false
            });

        } else {

            //redirect to searchResults
            setTimeout( () => {

                const catName = (this.state.categories.length > 0)
                    ? this.state.categories[this.state.categories.length-1].label
                    : '';

                this.props.history.push({
                    pathname: '/searchResults'
                               + '?category='       + catName
                               + '&name='           + this.state.name
                               + '&description='    + this.state.description
                               + '&minPrice='       + this.state.minPrice
                               + '&maxPrice='       + this.state.maxPrice
                               + '&city='           + this.state.city
                               + '&country='        + this.state.country,
                    state: {
                        category: this.state.categories,
                        name: this.state.name,
                        description: this.state.description,
                        minPrice: this.state.minPrice,
                        maxPrice: this.state.maxPrice,
                        city: this.state.city,
                        country: this.state.country
                    }
                })
            }, Constants.TIMEOUT_DURATION);

        }
    }

    render() {
        return (
            <Container className="navbar-margin">
                <Row>
                    <Col>
                        <Card>
                            <Card.Header as="h4" className="text-center bg-dark" style={{color:'white' }}> Advanced Search </Card.Header>
                            <Card.Body>
                                <Form
                                    action={this.props.action}
                                    method={this.props.method}
                                    onSubmit={this.onSubmit}
                                >

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>
                                                        <FaSearch style={{verticalAlign: 'baseline'}}/>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    size="lg"
                                                    type="text"
                                                    placeholder="Search here..."
                                                    name="name"
                                                    onChange={this.onChange}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label> <b>Categories</b> </Form.Label>
                                            <AsyncSelect
                                                key={JSON.stringify(this.state.currId)}
                                                isMulti
                                                cacheOptions
                                                value={this.state.categories}
                                                defaultOptions
                                                loadOptions={this.getOptions}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Row>
                                                <Col>
                                                    <Form.Label> <b>City</b> </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="eg. Athens"
                                                        name="city"
                                                        onChange={this.onChange}
                                                    />
                                                </Col>

                                                <Col>
                                                    <Form.Label> <b>Country</b> </Form.Label>
                                                    <Form.Control as={CountryDropdown}
                                                        name='country'
                                                        value={this.state.country}
                                                        onChange={(val) => this.selectCountry(val)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label> <b>Description</b> </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="3"
                                                placeholder= "eg. Some pretty good jeans!"
                                                name="description"
                                                onChange={this.onChange}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label> <b>Price Range</b> </Form.Label>

                                            <Row>
                                                <Col>
                                                    <InputGroup>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder= "eg. 100"
                                                            name="minPrice"
                                                            onChange={this.onChange}
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text> &#36; </InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </Col>

                                                <Col>
                                                    <InputGroup>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder= "eg. 1000"
                                                            name="maxPrice"
                                                            onChange={this.onChange}
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text> &#36; </InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                      { this.state.loading ? (
                                        <Button variant="dark" block disabled>
                                          <b> Loading </b>
                                          <LoadingButton />
                                        </Button>
                                      ) : (
                                        <Button variant="dark" block onClick={this.onSubmit}> <b> Search it! </b> </Button>
                                      )}
                                    </Form.Row>

                                    <br />

                                    {this.state.hasError ? (
                                        <Form.Row>
                                            <Col>
                                                <Alert variant="danger">
                                                    <p>
                                                        {this.state.errorMsg}
                                                    </p>
                                                </Alert>
                                            </Col>
                                        </Form.Row>
                                    ) : (
                                        null
                                    )}

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}