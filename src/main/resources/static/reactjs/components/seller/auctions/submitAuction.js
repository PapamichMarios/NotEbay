import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import GetTomorrowDate from '../../utils/date/getTomorrowDate';
import LoadingButton from '../../utils/loading/loadingButton.js';
import * as Constants from '../../utils/constants.js';

import postRequest from '../../utils/requests/postRequest';

import { Container, Card, Form, Col, InputGroup, Button, Row, ButtonToolbar, Alert } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';

export default class SubmitAuction extends React.Component {
    constructor(props) {
        super(props);

        var minDate = GetTomorrowDate();
        this.state = {
            name: '',
            description: '',
            dateEnds: minDate,
            timeEnds: '12:00',
            firstBid: '',
            buyPrice: '',
            country: '',
            location: '',
            lat: '',
            lng: '',

            hasError: false,
            errorMsg: '',
            loading: false,
            locationFailed: false
        };

        this.fetchAgain = this.fetchAgain.bind(this);
        this.createItem = this.createItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createItem() {
        //if buy price input was null
        if(this.state.buyPrice === '') {
            this.setState({
                buyPrice: -1
            });
        }

        const bodyObj = {
            name: this.state.name,
            description: this.state.description,
            timeEnds: this.state.dateEnds + ' ' + this.state.timeEnds + ':00',
            firstBid: this.state.firstBid,
            buyPrice: this.state.buyPrice,
            country: this.state.country,
            location: this.state.location,
            jgp: {
                geoLat: this.state.lat,
                geoLong: this.state.lng
            },
            categoriesNames: ['xa0']
        };

        postRequest(this.props.action, bodyObj)
        .then(response => {
            if (response.error){
                this.setState({
                    hasError: true,
                    errorMsg: response.message,
                    loading: false
                })
            } else {
                //redirect
                this.props.history.push('/my-auctions/' + response.object.id);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    onSubmit(e){
        //set loading
        this.setState({loading: true});

        //get lat lng
        fetch('https://nominatim.openstreetmap.org/search?' +
            'city=' + this.state.location +
            '&country=' + this.state.country +
            '&format=json', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET'
        })
        .then(data => data.json())
        .then(data => {
            if(data.length === 0) {
                this.setState({
                    locationFailed: true
                },
                this.fetchAgain);
            } else {
                this.setState({
                    lat: data[0].lat,
                    lng: data[0].lon
                },
                this.createItem);
            }
        });
    }

    fetchAgain() {
        //redo fetch for location but with only country in case the first failed
        fetch('https://nominatim.openstreetmap.org/search?' +
            '&country=' + this.state.country +
            '&format=json', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET'
        })
        .then(data => data.json())
        .then(data => {
            this.setState({
                lat: data[0].lat,
                lng: data[0].lon
            },
            this.createItem);
        });
    }

    render(){
        const minDate = GetTomorrowDate();
        const SubmitItemSchema = Yup.object({
            name: Yup.string().label('Product Name').min(4, 'Too short!').required(),
            description: Yup.string().label('Description').min(4, 'Too short!').max(300, 'Too long!'),
            dateEnds: Yup.date().label('Auction Ending Date').required()
                        .min(new Date(), 'The ending date of an auction must be ' + minDate + '(yyyy/mm/dd) or later!'),
            timeEnds: Yup.string().label('Auction Ending Time').required(),
            firstBid: Yup.number().label('Initial Bid').required(),
            buyPrice: Yup.number().label('Buy Directly'),
            country: Yup.string().label('Country').required(),
            location: Yup.string().label('City').required()
        });

        return(
            <Container>
                <Card border="dark">
                    <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Submit an item for auction </Card.Header>
                    <Card.Body>
                      <Formik
                          initialValues={{
                              name: this.state.name,
                              description: this.state.description,
                              dateEnds: this.state.dateEnds,
                              timeEnds: this.state.timeEnds,
                              firstBid: this.state.firstBid,
                              buyPrice: this.state.buyPrice,
                              country: this.state.country,
                              location: this.state.location
                          }}
                          validationSchema={SubmitItemSchema}
                          onSubmit={this.onSubmit}
                      >
                      {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          isValid,
                          isInvalid,
                          errors,
                          touched,
                          values
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                          <Form.Row>
                              <Col>
                                  <Form.Group as={Row} controlId="formName">
                                    <Col md={3}>
                                        <Form.Label title="required">
                                            <b> Product Name: *</b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          type="text"
                                          name="name"
                                          placeholder="e.g. jeans boy's 18-24 M (months)"
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.name}
                                          onBlur={handleBlur}
                                          isValid={!errors.name && touched.name}
                                          isInvalid={errors.name && touched.name}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.name}</Form.Control.Feedback>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group as={Row} controlId="formDescription">
                                    <Col md={3}>
                                        <Form.Label >
                                            <b> Product Description: </b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          as="textarea" rows="3"
                                          name="description"
                                          placeholder="e.g. A really nice pair of Tommy Hilfiger denim jeans used once."
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.description}
                                          onBlur={handleBlur}
                                          isValid={!errors.description && touched.description}
                                          isInvalid={errors.description && touched.description}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.description}</Form.Control.Feedback>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group as={Row} controlId="formDate">
                                    <Col md={3}>
                                        <Form.Label title="required" >
                                            <b> Auction Ending Date: *</b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          type="date"
                                          name="dateEnds"
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.dateEnds}
                                          onBlur={handleBlur}
                                          isValid={!errors.dateEnds && touched.dateEnds}
                                          isInvalid={errors.dateEnds && touched.dateEnds}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.dateEnds}</Form.Control.Feedback>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group as={Row} controlId="formTime">
                                    <Col md={3}>
                                        <Form.Label title="required">
                                            <b> Auction Ending Time: *</b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          type="time"
                                          name="timeEnds"
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.timeEnds}
                                          onBlur={handleBlur}
                                          isValid={!errors.timeEnds && touched.timeEnds}
                                          isInvalid={errors.timeEnds && touched.timeEnds}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.timeEnds}</Form.Control.Feedback>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group as={Row} controlId="formFirstBid">
                                    <Col md={3}>
                                        <Form.Label title="required">
                                            <b> Starting Bid: *</b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          type="text"
                                          name="firstBid"
                                          placeholder="e.g. 0.01"
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.firstBid}
                                          onBlur={handleBlur}
                                          isValid={!errors.firstBid && touched.firstBid}
                                          isInvalid={errors.firstBid && touched.firstBid}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.firstBid}</Form.Control.Feedback>
                                      <Form.Text className="text-muted"> Starting Bid field is in dollars </Form.Text>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group as={Row} controlId="formBuyPrice">
                                    <Col md={3}>
                                        <Form.Label >
                                            <b> Buy Directly: </b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          type="text"
                                          name="buyPrice"
                                          placeholder="e.g. 0.01"
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.buyPrice}
                                          onBlur={handleBlur}
                                          isValid={!errors.buyPrice && touched.buyPrice}
                                          isInvalid={errors.buyPrice && touched.buyPrice}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.buyPrice}</Form.Control.Feedback>
                                      <Form.Text className="text-muted"> Buy Directly field is in dollars </Form.Text>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group as={Row} controlId="formLocation">
                                    <Col md={3}>
                                        <Form.Label title="required">
                                            <b> City: *</b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          type="text"
                                          name="location"
                                          placeholder="e.g. New York"
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.location}
                                          onBlur={handleBlur}
                                          isValid={!errors.location && touched.location}
                                          isInvalid={errors.location && touched.location}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.location}</Form.Control.Feedback>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group as={Row} controlId="formCountry">
                                    <Col md={3}>
                                        <Form.Label title="required" >
                                            <b> Country: *</b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control as={CountryDropdown}
                                          name="country"
                                          onChange={ (_, e) => {
                                              handleChange(e)
                                              this.onChange(e)
                                          }}
                                          value={values.country}
                                          onBlur={handleBlur}
                                          isValid={!errors.country && touched.country}
                                          isInvalid={errors.country && touched.country}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.country}</Form.Control.Feedback>
                                    </Col>
                                  </Form.Group>
                              </Col>
                          </Form.Row>

                          { this.state.loading ? (
                              <ButtonToolbar size="lg">
                                <Button type="submit" variant="dark" block disabled>
                                  <b> Loading... </b>
                                  <LoadingButton />
                                </Button>
                              </ButtonToolbar>
                          ) : (
                              <ButtonToolbar size="lg">
                                <Button type="submit" variant="dark" block> <b> Submit </b> </Button>
                              </ButtonToolbar>
                          )}

                          { this.state.hasError ? (
                              <Form.Row>
                                <Col>
                                  <br />
                                  <Alert variant="danger">
                                      {this.state.errorMsg}
                                  </Alert>
                                </Col>
                              </Form.Row>
                          ) : (
                               null
                          )}

                        </Form>
                      )}
                      </Formik>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

SubmitAuction.defaultProps= {
    action: 'app/items',
    method: 'POST'
}