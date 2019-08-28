import React from 'react';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import getRequest from '../../utils/requests/getRequest';
import Paging from '../../utils/paging';

import { FaExternalLinkAlt } from 'react-icons/fa';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../../../css/user/profile.css';

export default class ActiveBids extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            paging: '',
            bids: [],
            loadingActiveBids: false
        };

        this.changeActivePage = this.changeActivePage.bind(this);
        this.getActiveBids = this.getActiveBids.bind(this);
    }

    changeActivePage(pageNum) {
        this.setState({
            activePage: pageNum
        });
    }

    getActiveBids(pageNum) {
        this.setState({loadingActiveBids: true});
        const url = '/app/items/bestBidItems?page='
            + (pageNum-1) + '&size=5';

        getRequest(url)
        .then(pages => {
            this.setState({
                bids: pages.content,
                paging: pages
            }, () =>
                setTimeout(() => {
                    this.setState({loadingActiveBids: false})
                }, Constants.TIMEOUT_DURATION)
            );
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.getActiveBids(this.state.activePage)
    }

    render() {
        if(this.state.loadingActiveBids) {
            return <Loading />
        } else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th> Item Name </th>
                                        <th> Country </th>
                                        <th> Your Current Bid <span>(&#36;)</span> </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.bids.map(bid =>
                                        <tr key={bid.id}>
                                            <td>
                                                <Link to={`/auctions/${bid.id}`} >
                                                    <FaExternalLinkAlt />
                                                </Link>
                                            </td>
                                            <td> {bid.name} </td>
                                            <td> {bid.country} </td>
                                            <td> {bid.bestBid.bidAmount} </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            <Paging
                                totalPages={this.state.paging.totalPages}
                                getData={this.getActiveBids}
                                activePage={this.state.activePage}
                                changeActivePage={this.changeActivePage}
                            />
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}