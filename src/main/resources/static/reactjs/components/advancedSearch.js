import React from 'react';

import postRequest from './utils/requests/postRequest';
import LoadingButton from './utils/loading/loadingButton.js';
import * as Constants from './utils/constants.js';

import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default class AdvancedSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        //category
            description: '',
            minPrice: '',
            maxPrice: '',
            location: '',
            loading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
                            <Card.Body>
                                <Form
                                    action={this.props.action}
                                    method={this.props.method}
                                    onSubmit={this.onSubmit}
                                >

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label> <b>Categories</b> </Form.Label>
                                            <Form.Control
                                                type="select"
                                                name="category"
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label> <b>Location</b> </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder= "eg. Athens"
                                                name="location"
                                            />
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
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label className="text-center"> <b>Price Range</b> </Form.Label>

                                            <Row>
                                                <Col>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder= "eg. 100"
                                                        name="minPrice"
                                                    />
                                                </Col>

                                                <Col>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder= "eg. 1000"
                                                        name="maxPrice"
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