import React from 'react';

import getRequest from '../utils/requests/getRequest';
import Loading from '../utils/loading/loading';
import * as Constants from '../utils/constants';
import Paging from '../utils/paging';

import '../../../css/signup/confirmation.css';

import { Container, Row, Col, Button, Pagination, Card, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class BidList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            bidders: [],
            paging:'',
            activePage: 1
        };

        this.changeActivePage = this.changeActivePage.bind(this);
        this.getData = this.getData.bind(this);
    }

    //paging
    changeActivePage(pageNum) {
        this.setState({
            activePage: pageNum
        });
    }

    getData(pageNum) {
        this.setState({loading: true});
        const url = '/app/items/owner/'+
                    this.props.match.params.id +
                    '/bids?page=' + (pageNum-1) +
                    '&size=5';

        getRequest(url)
        .then(data => {
            if(data.error) {
                if(data.status === 500) {
                    this.props.history.push('/internal-server-error');
                }

                if(data.status === 404) {
                    this.props.history.push('/bidders-not-found');
                }
            } else {
                this.setState({
                    bidders: data.content,
                    paging: data
                });

                //set loading
                setTimeout(() => {
                  this.setState({loading: false})
                }, Constants.TIMEOUT_DURATION)
            }
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.getData(this.state.activePage);
    }

    render() {
        if(this.state.loading) {
            return <Loading />;
        } else {
            return (
                <Container className="navbar-margin">
                    <Row>
                        <Col>
                            <Card border="dark" style={{width:'100%'}}>
                                <Card.Header className="text-center bg-dark" style={{color:'white'}}> List of Bidders </Card.Header>
                                <Card.Body>
                                    <Table striped hover>
                                        <thead>
                                            <tr>
                                                <th> Bidding <span>(&#36;)</span> </th>
                                                <th> Username </th>
                                                <th> First Name </th>
                                                <th> Last Name </th>
                                                <th> Email Address</th>
                                                <th> City  </th>
                                                <th> Country </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.bidders.map(bidder =>
                                                <tr key={bidder.bidAmount}>
                                                    <td> {bidder.bidAmount} </td>
                                                    <td> {bidder.user.username} </td>
                                                    <td> {bidder.user.firstName} </td>
                                                    <td> {bidder.user.lastName} </td>
                                                    <td> {bidder.user.email} </td>
                                                    <td> {bidder.user.city} </td>
                                                    <td> {bidder.user.country} </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>

                                    <Paging
                                        totalPages={this.state.paging.totalPages}
                                        getData={this.getData}
                                        activePage={this.state.activePage}
                                        changeActivePage={this.changeActivePage}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default withRouter(BidList);