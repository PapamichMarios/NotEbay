import React from 'react';

import ImageUploader from 'react-images-upload';
import putRequest from './utils/requests/putRequest';
import * as Constants from './utils/constants';

import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default class TestUpload extends React.Component {

    constructor(props) {
        super(props);
         this.state = {
            pictures: [],
            image: ''
         };

         this.onChange= this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.onDrop = this.onDrop.bind(this);
    }

    onChange(e){
        console.log(this.state.image)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onDrop(picture) {
        this.setState({
            pictures: picture,
        });
    }

    onSubmit() {
        var formData = new FormData();

        formData.append('image', this.state.pictures[0].name);

        fetch('/app/items/1/images/upload', {
            method: 'PUT',
            body: {
                image: formData
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => console.error('Error', error));
    }

    render() {
        console.log(this.state.pictures);
        return (
            <Container>
                <Row>
                    <Col md="4">
                        <h1> xa0xa0xa0xa0xa </h1>
                    </Col>
                </Row>

                <br/>
                <br/>
                <Row>
                    <Col md="4">
                        <Card>
                            <Card.Body>
                                <br/>
                                <ImageUploader
                                    withIcon={true}
                                    withPreview={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />

                              <Form.Control
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={this.onChange}
                              />

                                <Button onClick={this.onSubmit}>
                                    Submit
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}