import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import putRequest from '../../../utils/requests/putRequest';

import GetTomorrowDate from '../../../utils/date/getTomorrowDate';
import LoadingButton from '../../../utils/loading/loadingButton';
import * as Constants from '../../../utils/constants';

import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import { CountryDropdown } from 'react-country-region-selector';

class EditAuction extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            hasError: false,
            errorMsg: '',

            name: this.props.user.name,
            description: this.props.user.description,
            dateEnds: this.props.user.dateEnds,
            timeEnds: this.props.user.timeEnds,
            firstBid: this.props.user.firstBid,
            buyPrice: this.props.user.buyPrice,
            country: this.props.user.country,
            location: this.props.user.location
        };

        this.onChange = this.onChange.bind(this);
        this.back = this.back.bind(this);
        this.save = this.save.bind(this);
    }

    back() {
        this.props.undoEditAuction();
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    save() {
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
                //refresh
                location.reload();
            }
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
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
                                            <b> Location: *</b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          disabled
                                          type="text"
                                          name="location"
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
                                          disabled
                                          name="country"
                                          onChange={ (_, e) => {
                                              handleChange(e)
                                              this.props.onChange(e)
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
                            <Form.Row>
                                <Col md={2}>
                                  <ButtonToolbar size="lg">
                                    <Button variant="danger" disabled block>
                                        <FaAngleLeft style={{verticalAlign: 'baseline'}} />
                                        <b> Back </b>
                                    </Button>
                                  </ButtonToolbar>
                                </Col>

                                <Col md={{offset:8, span:2}}>
                                  <ButtonToolbar size="lg">
                                    <Button variant="dark" disabled block>
                                        <b> Loading... </b>
                                        <LoadingButton />
                                    </Button>
                                  </ButtonToolbar>
                                </Col>
                            </Form.Row>
                          ) : (
                            <Form.Row>
                                <Col md={2}>
                                    <ButtonToolbar size="lg">
                                      <Button variant="danger" onClick={this.back} block>
                                          <FaAngleLeft />
                                          <b> Back </b>
                                      </Button>
                                    </ButtonToolbar>
                                </Col>

                                <Col md={{offset:8, span:2}}>
                                    <ButtonToolbar size="lg">
                                      <Button variant="dark" onClick={this.save} block>
                                          <b> Save </b>
                                          <FaAngleRight />
                                      </Button>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Row>
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

EditAuction.defaultProps = {
    action: '/app/items/',
};

export default withRouter(EditAuction);