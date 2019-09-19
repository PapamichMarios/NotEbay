import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncSelect from 'react-select/async';

import putRequest from '../../utils/requests/putRequest';

import GetTomorrowDate from '../../utils/date/getTomorrowDate';
import LoadingButton from '../../utils/loading/loadingButton';
import * as Constants from '../../utils/constants';

import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import { CountryDropdown } from 'react-country-region-selector';

class EditAuction extends React.Component {

    constructor(props) {
        super(props);

        let defaultOptions = [];
        this.props.user.categories.map( category => {
            defaultOptions.push({
                value: category.id,
                label: category.name
            });
        })

        if(this.props.user.buyPrice === null) {
            this.state = {
                loading: false,
                hasError: false,
                errorMsg: '',

                name: this.props.user.name,
                description: this.props.user.description,
                dateEnds: this.props.user.dateEnds,
                timeEnds: this.props.user.timeEnds,
                firstBid: this.props.user.firstBid,
                country: this.props.user.country,
                location: this.props.user.location,
                buyPrice: '',

                categories: defaultOptions,
                currId: this.props.user.categories[this.props.user.categories.length-1].id,
                root: false
            };
        } else {
            this.state = {
                loading: false,
                hasError: false,
                errorMsg: '',

                name: this.props.user.name,
                description: this.props.user.description,
                dateEnds: this.props.user.dateEnds,
                timeEnds: this.props.user.timeEnds,
                firstBid: this.props.user.firstBid,
                country: this.props.user.country,
                location: this.props.user.location,
                buyPrice: this.props.user.buyPrice,

                categories: defaultOptions,
                currId: this.props.user.categories[this.props.user.categories.length-1].id,
                root: false
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.mapOptionsToValues = this.mapOptionsToValues.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.onChange = this.onChange.bind(this);
        this.back = this.back.bind(this);
        this.save = this.save.bind(this);
    }

    //categories
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

    back() {
        this.props.undoEditAuction();
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    save(e) {
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
            location: this.state.location,
            jgp: {
                geoLat: this.props.user.lat,
                geoLong: this.props.user.lng
            },
            active: false,
            lastCategoryId: this.state.categories[this.state.categories.length-1].value
        };

        putRequest(this.props.action + this.props.match.params.id, bodyObj)
        //handle success
        .then(response => {
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
                      location: Yup.string().label('Location').required(),
                      categories: Yup.array().of(
                          Yup.object().shape({
                              value: Yup.string().required(),
                              label: Yup.string().required()
                          })
                      ).label('Categories').required()
        });

        return(
            <Container className="navbar-margin">
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
                              location: this.state.location,
                              categories: this.state.categories
                          }}
                          validationSchema={SubmitItemSchema}
                          onSubmit={this.save}
                      >
                      {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          isValid,
                          isInvalid,
                          errors,
                          touched,
                          values,
                          setFieldTouched,
                          setFieldValue
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

                                  <Form.Group as={Row}>
                                    <Col md={3}>
                                        <Form.Label >
                                            <b> Categories: *</b>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                      <AsyncSelect
                                          key={JSON.stringify(this.state.currId)}
                                          isMulti
                                          cacheOptions
                                          options={this.state.categories}
                                          loadOptions={this.getOptions}
                                          defaultOptions
                                          value={values.categories}
                                          onChange={value => {
                                              setFieldValue("categories", value);
                                              this.handleChange(value);
                                            }
                                          }
                                          placeholder='Select Categories...'
                                          onBlur={ () => setFieldTouched("categories", true)}
                                      />
                                      {!!errors.categories && touched.categories && (
                                        <div className="text-danger" style={{ marginTop: ".5rem", fontSize:'13px' }}>
                                          {errors.categories}
                                        </div>
                                      )}
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
                                        <b> Loading </b>
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
                                      <Button variant="dark" type="submit" block>
                                          <b> Save </b>
                                          <FaAngleRight />
                                      </Button>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Row>
                          )}

                          { this.state.hasError && (
                              <Form.Row>
                                <Col>
                                  <br />
                                  <Alert variant="danger">
                                      {this.state.errorMsg}
                                  </Alert>
                                </Col>
                              </Form.Row>
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