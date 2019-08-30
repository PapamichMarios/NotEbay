import React from 'react';

import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap';
import {FaExternalLinkAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import decodeTime from '../utils/decoders/timeDecoder';
import decodeDate from '../utils/decoders/dateDecoder';
import Loading from '../utils/loading/loading';
import * as Constants from '../utils/constants';
import getRequest from '../utils/requests/getRequest';
import Paging from '../utils/paging';

import '../../../css/auctions/auctions.css';

export default class AuctionsHomepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            loading: true,
            myAuctions: [],
            paging: ''
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
        const url = '/app/items?page='+ (pageNum-1) +
                    '&size=5';

        getRequest(url)
        .then(data => {
            this.setState({
                myAuctions: data.content,
                paging: data
            });
        })
        .catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION);
    }

    componentDidMount() {
        this.getData(this.state.activePage);
    }

    render() {
        if(this.state.loading) {
            return <Loading />;
        } else {
            return(
                <Container className="navbar-margin">
                    <Card style={{width:'100%'}} border="dark">
                        <Card.Header as="h3" className="text-center bg-dark" style={{color:'white'}}> My Pending Auctions </Card.Header>
                        <Card.Body>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>    </th>
                                        <th> ID </th>
                                        <th> Name </th>
                                        <th> Best Bid </th>
                                        <th> Buy Price </th>
                                        <th> Time Ending  </th>
                                        <th> Number of Bids </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.myAuctions.map(myAuction =>
                                        <tr key={myAuction.id.toString()}>
                                            <td>
                                                <Link to={`/my-auctions/${myAuction.id.toString()}`} >
                                                    <FaExternalLinkAlt />
                                                </Link>
                                            </td>
                                            <td> {myAuction.id.toString()} </td>
                                            <td> {myAuction.name} </td>
                                            { myAuction.bestBid !== null? (
                                                <td> {myAuction.bestBid.bidAmount.toString()} </td>
                                            ) : (
                                                <td> -- </td>
                                            )}
                                            <td> {myAuction.buyPrice.toString()} </td>
                                            <td> {decodeTime(myAuction.timeEnds) + ' ' + decodeDate(myAuction.timeEnds)} </td>
                                            <td> {myAuction.numOfBids.toString()} </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            <Paging totalPages={this.state.paging.totalPages}
                                    getData={this.getData}
                                    activePage={this.state.activePage}
                                    changeActivePage={this.changeActivePage}
                            />

                        </Card.Body>
                    </Card>
                </Container>
            );
        }
    }
}

AuctionsHomepage.defaultProps = {
    action: '/app/items'
};