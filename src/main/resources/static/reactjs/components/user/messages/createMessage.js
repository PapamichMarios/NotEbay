import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import LoadingButton from '../../utils/loading/loadingButton';
import Loading from '../../utils/loading/loading';
import Sidebar from './sidebar';
import * as Constants from '../../utils/constants';
import postRequest from '../../utils/requests/postRequest';

import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaTelegramPlane } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

class CreateMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            to: '',
            msg: '',
            loadingMessage: false,
            hasError: false,
            errorMsg: '',
            loading: true,
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
        const bodyObj = {
            receiverUsername: this.state.to,
            header: this.state.title,
            message: this.state.msg
        };

        postRequest(this.props.action, bodyObj)
        .then(response => {
            if(response.error) {
                this.setState({
                    errorMsg: response.message,
                    hasError: true
                });
            } else {
                this.props.history.push({
                    pathname: '/messages/sent',
                    state: { sent: true }
                })
            }
        })
        .catch(error => console.error('Error:' , error));

        setTimeout(() => {
          this.setState({loadingMessage: false})
        }, Constants.TIMEOUT_DURATION)
    }

    componentDidMount() {
        if(this.props.location.state != null) {
            this.setState({
                to: this.props.location.state.messageTo
            });
        }

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION);
    }

    render() {
        if(this.state.loading) {
            return <Loading />;
        } else {
            const messageSchema = Yup.object({
                title: Yup.string().label('Title').min(4, 'Too short!').max(30, 'Too long!').required(),
                to: Yup.string().label('To').required(),
                msg: Yup.string().label('Message').min(4, 'Too short!').max(400, 'Too long!').required()
            });


            let sendTo = [];
             if(this.props.location.state == null) {
                sendTo.push(
                    <option key='buyer'> Select Buyer </option>
                );
             } else {
                sendTo.push(
                    <option key='buyer'> {this.props.location.state.messageTo} </option>
                );
             }

            return (
                <Container fluid>
                    <Row>
                        <Col md={2} style={{paddingLeft: '0px'}}>
                            <Sidebar />
                        </Col>

                        <Col className="navbar-margin">
                            <Card>
                                <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> <b>Send Message</b> </Card.Header>
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
                                                  { this.state.loadingMessage ? (
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
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

CreateMessage.defaultProps = {
    action: '/app/messages'
};

export default withRouter(CreateMessage);