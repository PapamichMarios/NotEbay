import React from 'react';

import ImageUploader from 'react-images-upload';

import LoadingButton from '../../utils/loading/loadingButton';
import * as Constants from '../../utils/constants';

import { Container, Row, Col, Form, Button, Card, ButtonToolbar, Alert, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

class UploadPhotos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            loadingButton: false
        };

        this.onDrop = this.onDrop.bind(this);
        this.back = this.back.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onDrop(picture) {
        this.setState({
            images: picture,
        });
    }

    back() {
        location.reload();
    }

    onSubmit(e) {
        e.preventDefault();

        //set loading
        this.setState({loadingButton: true});

        //fetch request
        const url = '/app/items/' + this.props.id + '/images/multiUpload';

        var formData = new FormData();
        this.state.images.map( image => {
            formData.append('file', image)
        });

        fetch(url, {
            headers: {
                'Authorization': Constants.ACCESS_TOKEN
            },
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(response => {

            //redirect
            location.reload()
        })
        .catch(error => console.error('Error', error));
    }

    render() {
        return (
            <Container className="navbar-margin">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Row>
                                        <Col md={3}>
                                            <Form.Label >
                                                <b> Upload more images: </b>
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <ImageUploader
                                                withIcon={true}
                                                withPreview={true}
                                                buttonText='Choose images'
                                                onChange={this.onDrop}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                maxFileSize={5242880}
                                            />
                                        </Col>
                                    </Form.Row>

                                    { this.state.loadingButton ? (
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
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(UploadPhotos);