import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaTelegramPlane } from 'react-icons/fa';

export default class CreateMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            to: '',
            msg: '',
            loadingMessage: false,
            hasError: false,
            errorMsg: ''
        }

        this.onChange = this.onChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    sendMessage() {
        this.setState({loadingMessage: true});

        this.setState({loadingMessage: false});
    }

    render() {
        const messageSchema = Yup.object({
            title: Yup.string().label('Title').min(4, 'Too short!').max(30, 'Too long!').required(),
            to: Yup.string().label('To').required(),
            msg: Yup.string().label('Message').min(4, 'Too short!').max(30, 'Too long!').required()
        });

        let sendTo = [];
        sendTo.push(
            <option key='key'> Select Buyer </option>
        );

        return (
            <Card>
                <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> Send Message </Card.Header>
                <Card.Body>
                    <Formik
                        initialValues= {{
                            title: this.state.title,
                            to: this.state.to,
                            msg: this.state.msg
                        }}
                        validationSchema={messageSchema}
                        onSubmit={this.sendMessage}
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
                                  <Form.Group as={Row}>
                                    <Col md={3}>
                                        <Form.Label > <b> To: </b> </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          as="select"
                                          name="to"
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.to}
                                          onBlur={handleBlur}
                                          isValid={!errors.to && touched.to}
                                          isInvalid={errors.to && touched.to}
                                      >

                                          {sendTo}

                                      </Form.Control>
                                      <Form.Control.Feedback type="invalid"> {errors.to}</Form.Control.Feedback>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group as={Row}>
                                    <Col md={3}>
                                        <Form.Label> <b> Title: </b> </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          type="text"
                                          name="title"
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.title}
                                          onBlur={handleBlur}
                                          isValid={!errors.title && touched.title}
                                          isInvalid={errors.title && touched.title}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.title}</Form.Control.Feedback>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group as={Row}>
                                    <Col md={3}>
                                        <Form.Label> <b> Message: </b> </Form.Label>
                                    </Col>
                                    <Col>
                                      <Form.Control
                                          as="textarea" rows="5"
                                          name="msg"
                                          onChange={e => {
                                              handleChange(e)
                                              this.onChange(e);
                                          }}
                                          value={values.msg}
                                          onBlur={handleBlur}
                                          isValid={!errors.msg && touched.msg}
                                          isInvalid={errors.msg && touched.msg}
                                      />
                                      <Form.Control.Feedback type="invalid"> {errors.msg}</Form.Control.Feedback>
                                    </Col>
                                  </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                  { this.state.loading ? (
                                    <Button variant="dark" disabled block>
                                        <b> Loading... </b>
                                        <LoadingButton />
                                    </Button>
                                    ) : (
                                      <Button variant="dark" onClick={this.sendMessage} block>
                                          <b> Submit </b>
                                          <FaTelegramPlane />
                                      </Button>
                                  )}
                                </Col>
                            </Form.Row>

                            { this.state.hasError ? (
                              <Form.Row>
                                <Col>
                                  <Alert variant="danger">
                                      <p> {this.state.errorMsg} </p>
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
        );
    }
}