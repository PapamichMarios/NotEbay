import React from 'react';

import getRequest from '../../utils/requests/getRequest';
import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';

import '../../../../css/signup/confirmation.css';

import { Container, Row, Col, Button, Pagination, Card, Form } from 'react-bootstrap';

export default class Bid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            bidders: [],
            paging:'',
            activePage: 1
        };

        this.getData = this.getData.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    getData(pageNum) {
        this.setState({loading: true});
        const url = '/app/items/'+
                    this.props.location.pathname.slice(10, 11) +
                    '/bids?page=' + (pageNum-1) +
                    '&size=5';

        getRequest(url)
        .then(data => {
            console.log(data);
            this.setState({
                bidders: data.content,
                paging: data
            });
        })
        .catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION)
    }

    handlePrev() {
        if(this.state.activePage > 1) {
            const {activePage} = this.state;
            this.setState({
                activePage: activePage - 1
            });

            this.getData(activePage-1);
        }
    }

    handleNext() {
        const {totalPages} = this.state.paging
        if(this.state.activePage < totalPages) {
            const {activePage} = this.state;
            this.setState({
                activePage: activePage + 1
            });

            this.getData(activePage+1);
        }
    }

    handleFirst() {
        this.setState({
            activePage: 1
        });

        this.getData(1);
    }

    handleLast() {
        const {totalPages} = this.state.paging
        this.setState({
            activePage: totalPages
        });

        this.getData(totalPages);
    }

    handlePageChange(event) {
        this.setState({
            activePage: Number(event.target.id)
        });

        this.getData(Number(event.target.id));
    }

    componentDidMount() {
        this.getData(this.state.activePage);
    }

    render() {
        if(this.state.loading) {
            return <Loading />;
        } else {
            //pagination
            let active= this.state.activePage;
            let items= [];
            for(let i=1; i<=this.state.paging.totalPages; i++) {
                items.push(
                    <Pagination.Item key={i} id={i} active={i === active} onClick={this.handlePageChange}>
                        {i}
                    </Pagination.Item>,
                );
            }

            const pagination = (
                <Pagination>
                    <Pagination.First onClick={this.handleFirst} />
                    <Pagination.Prev onClick={this.handlePrev} />

                    {items}

                    <Pagination.Next onClick={this.handleNext} />
                    <Pagination.Last onClick={this.handleLast} />
                </Pagination>
            );

            return (
                <Container>

                    {this.state.bidders.map(bidder =>
                        <div key={bidder.bidAmount}>
                            <Row>
                                <Card border="dark" style={{width:'100%'}}>
                                    <Card.Header className="text-center bg-dark" style={{color:'white'}}> Amount of bidding: {bidder.bidAmount} <span> &#36; </span> </Card.Header>
                                    <Card.Body>
                                        <Form>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group as={Row} controlId="formUsername">
                                                     <Form.Label column md="5"> <b> Username: </b> </Form.Label>
                                                     <Col>
                                                       <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue={bidder.user.username}
                                                            className="col-user"
                                                       />
                                                     </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId="formFirstName">
                                                     <Form.Label column md="5"> <b> First Name: </b> </Form.Label>
                                                     <Col>
                                                       <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue={bidder.user.firstName}
                                                            className="col-user"
                                                       />
                                                     </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId="formLastName">
                                                     <Form.Label column md="5"> <b> Last Name: </b> </Form.Label>
                                                     <Col>
                                                       <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue={bidder.user.lastName}
                                                            className="col-user"
                                                       />
                                                     </Col>
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group as={Row} controlId="formEmail">
                                                     <Form.Label column md="5"> <b> Email Address: </b> </Form.Label>
                                                     <Col>
                                                       <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue={bidder.user.email}
                                                            className="col-user"
                                                       />
                                                     </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId="formCity">
                                                     <Form.Label column md="5"> <b> City: </b> </Form.Label>
                                                     <Col>
                                                       <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue={bidder.user.city}
                                                            className="col-user"
                                                       />
                                                     </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId="formCountry">
                                                     <Form.Label column md="5"> <b> Country: </b> </Form.Label>
                                                     <Col>
                                                       <Form.Control
                                                            plaintext
                                                            readOnly
                                                            defaultValue={bidder.user.country}
                                                            className="col-user"
                                                       />
                                                     </Col>
                                                </Form.Group>
                                            </Col>
                                            </Form.Row>
                                        </Form>

                                    </Card.Body>
                                </Card>
                            </Row>

                            <br/>
                        </div>
                    )}

                    <Row>
                        {pagination}
                    </Row>
                </Container>
            );
        }
    }
}