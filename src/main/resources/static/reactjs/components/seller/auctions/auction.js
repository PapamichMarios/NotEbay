import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import GetTomorrowDate from '../../utils/date/getTomorrowDate';

import decodeTime from '../../utils/decoders/timeDecoder';
import decodeDate from '../../utils/decoders/dateDecoder';
import getRequest from '../../utils/requests/getRequest';
import deleteRequest from '../../utils/requests/deleteRequest';
import putRequest from '../../utils/requests/putRequest';
import OpenStreetMap from '../../utils/maps/openStreetMapLarge';

import '../../../../css/signup/confirmation.css';
import '../../../../css/utils/map.css';

import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, Nav, NavItem, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {FaEdit, FaSearchDollar, FaTrash } from 'react-icons/fa';

export default class Auction extends React.Component{
    constructor(props) {
        super(props);

        var minDate = GetTomorrowDate();
        this.state = {
            auction : '',
            loading: true,
            edit: false,

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
        };

        this.checkBidders = this.checkBidders.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editAuction = this.editAuction.bind(this);
        this.deleteAuction = this.deleteAuction.bind(this);
    }

    checkBidders() {
        const url = this.props.location.pathname + '/bids';
        this.props.history.push(url);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit() {
        //set loading
        this.setState({loading: true});

        //fetch request
        const bodyObj = {
            name: this.state.name,
            description: this.state.description,
            timeEnds: this.state.dateEnds + ' ' + this.state.timeEnds + ':00',
            firstBid: this.state.firstBid,
            buyPrice: this.state.buyPrice,
            country: this.state.country,
            location: this.state.location
        };

        putRequest(this.props.action + this.props.match.params.id, bodyObj)
        //handle success
        .then(response => {
            console.log('editAuctionResponse: ' + JSON.stringify(response));
            if (response.error){
                this.setState({
                    hasError: true,
                    errorMsg: response.message,
                    loading: false
                })
            } else {

                //redirect
            }
        })
        .catch(error => console.error('Error:', error));
    }

    editAuction() {
        if(this.state.auction.active) {
            alert('Cannot edit item after someone has placed a bid.');
        } else {
            this.setState({
                edit: true
            })
        }
    }

    deleteAuction() {
        if(this.state.auction.active) {
            alert('Cannot delete item after someone has placed a bid.');
        } else {
            if (window.confirm('Are you sure you want to delete the current item?')) {
                deleteRequest(this.props.action + this.props.match.params.id)
                .then((response) => {
                    console.log('denyResponse:' + JSON.stringify(response));

                    if (response.error) {
                        alert(response.message);
                    } else {
                        this.props.history.push('/auctions');
                        alert('Item has been deleted from the platform.');
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        }
    }

    componentDidMount() {
        getRequest(this.props.action + this.props.match.params.id)
        .then(data => {
            console.log(JSON.stringify(data));
            this.setState({
                auction: data
            });
        })
        .catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION)
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        } else {
            if(this.state.edit && !this.state.auction.active){
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
                              location: Yup.string().label('Location').required()
                });

                return(
                    <Container>
                        <Card border="dark">
                            <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Edit item for auction </Card.Header>
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

                                          <Form.Group as={Row} controlId="formCountry">
                                            <Col md={3}>
                                                <Form.Label title="required" >
                                                    <b> Country: *</b>
                                                </Form.Label>
                                            </Col>
                                            <Col>
                                              <Form.Control
                                                  type="text"
                                                  name="country"
                                                  placeholder="e.g. USA"
                                                  onChange={e => {
                                                      handleChange(e)
                                                      this.onChange(e);
                                                  }}
                                                  value={values.country}
                                                  onBlur={handleBlur}
                                                  isValid={!errors.country && touched.country}
                                                  isInvalid={errors.country && touched.country}
                                              />
                                              <Form.Control.Feedback type="invalid"> {errors.country}</Form.Control.Feedback>
                                            </Col>
                                          </Form.Group>

                                          <Form.Group as={Row} controlId="formLocation">
                                            <Col md={3}>
                                                <Form.Label title="required">
                                                    <b> Location: *</b>
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
                                      </Col>
                                  </Form.Row>

                                  { this.state.loading ? (
                                      <ButtonToolbar size="lg">
                                        <Button type="submit" variant="success" block disabled>
                                          <b> Loading... </b>
                                          <LoadingButton />
                                        </Button>
                                      </ButtonToolbar>
                                  ) : (
                                      <ButtonToolbar size="lg">
                                        <Button type="submit" variant="success" block> <b> Save </b> </Button>
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
            } else {
                return (
                    <Container fluid style={{paddingLeft:'0px'}}>
                        <Row>
                            <Col md={1}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title className="text-center"> <b> Actions </b> </Card.Title>
                                    </Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item action onClick={this.checkBidders}>
                                            <FaSearchDollar style={{verticalAlign: 'baseline'}} />
                                            <span> &ensp; </span>
                                            <b> Bids </b>
                                        </ListGroup.Item>

                                        <ListGroup.Item action onClick={this.editAuction}>
                                            <FaEdit style={{verticalAlign: 'baseline'}} />
                                            <span> &ensp; </span>
                                            <b> Edit </b>
                                        </ListGroup.Item>

                                        <ListGroup.Item action onClick={this.deleteAuction}>
                                            <FaTrash style={{verticalAlign: 'baseline', color:'FireBrick'}} />
                                            <span> &ensp; </span>
                                            <b style={{color:'FireBrick'}}> Delete </b>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>

                            <Col>
                                <Card border="dark">
                                    <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Item #{this.state.auction.id} </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col md={3}>
                                                <Row>
                                                    <h3> To put Image </h3>
                                                </Row>
                                            </Col>

                                            <Col md={6}>
                                                <Tabs defaultActiveKey="details">
                                                    <Tab eventKey="details" title="Item Details">
                                                        <br/>
                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Name: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.auction.name}
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Description: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.auction.description}
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        { this.state.auction.bestBid ? (
                                                            <Form.Group as={Row}>
                                                                <Form.Label column md="5"> <b> Current Best Bid: </b> </Form.Label>
                                                                <Col>
                                                                    <Form.Control
                                                                        plaintext
                                                                        readOnly
                                                                        defaultValue= {this.state.auction.bestBid.bidAmount}
                                                                        className="col-user"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                        ) : (
                                                            <Form.Group as={Row}>
                                                                <Form.Label column md="5"> <b> Current Best Bid: </b> </Form.Label>
                                                                <Col>
                                                                    <Form.Control
                                                                        plaintext
                                                                        readOnly
                                                                        defaultValue= '--'
                                                                        className="col-user"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                        )}

                                                        { this.state.auction.buyPrice ? (
                                                            <Form.Group as={Row}>
                                                                <Form.Label column md="5"> <b> Buy Price: </b> </Form.Label>
                                                                <Col>
                                                                    <Form.Control
                                                                        plaintext
                                                                        readOnly
                                                                        defaultValue= '--'
                                                                        className="col-user"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                        ) : (
                                                            <Form.Group as={Row}>
                                                                <Form.Label column md="5"> <b> Buy Price: </b> </Form.Label>
                                                                <Col>
                                                                    <Form.Control
                                                                        plaintext
                                                                        readOnly
                                                                        defaultValue= {this.state.auction.buyPrice}
                                                                        className="col-user"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                        )}

                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Number of bids: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.auction.numOfBids}
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Time Started: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= { decodeTime(this.state.auction.timeStarted) +
                                                                                    ' ' +
                                                                                    decodeDate(this.state.auction.timeStarted) }
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Time Ending: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= { decodeTime(this.state.auction.timeEnds) +
                                                                                    ' ' +
                                                                                    decodeDate(this.state.auction.timeEnds) }
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Country: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.auction.country}
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row}>
                                                            <Form.Label column md="5"> <b> Location: </b> </Form.Label>
                                                            <Col>
                                                                <Form.Control
                                                                    plaintext
                                                                    readOnly
                                                                    defaultValue= {this.state.auction.location}
                                                                    className="col-user"
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Tab>
                                                </Tabs>
                                            </Col>

                                            <Col>
                                                <Row>
                                                    <h3> to put seller </h3>
                                                </Row>

                                                <Row>
                                                    <div className="leaflet">
                                                        <OpenStreetMap lat={this.state.auction.geoLat} lng={this.state.auction.geoLong} />
                                                    </div>
                                                </Row>
                                            </Col>
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
}

Auction.defaultProps = {
    action: '/app/items/',
};