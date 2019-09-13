import React from 'react';

import postRequest from './utils/requests/postRequest';
import LoadingButton from './utils/loading/loadingButton.js';
import * as Constants from './utils/constants.js';

import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { CountryDropdown } from 'react-country-region-selector';

export default class AdvancedSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        //category
            description: '',
            name: '',
            minPrice: '',
            maxPrice: '',
            country: '',
            city: '',
            loading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit(e){
        e.preventDefault();

        //set loading
         this.setState({loading: true});
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
                                            <Form.Control
                                                type="select"
                                                name="category"
                                                onChange={this.onChange}
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
                                                    <Form.Control
                                                        type="number"
                                                        placeholder= "eg. 100"
                                                        name="minPrice"
                                                        onChange={this.onChange}
                                                    />
                                                </Col>

                                                <Col>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder= "eg. 1000"
                                                        name="maxPrice"
                                                        onChange={this.onChange}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                      { this.state.loading ? (
                                        <Button type="submit" variant="dark" block disabled>
                                          <b> Loading </b>
                                          <LoadingButton />
                                        </Button>
                                      ) : (
                                        <Button type="submit" variant="dark" block> <b> Search it! </b> </Button>
                                      )}
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}