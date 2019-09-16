import React from 'react';

import Loading from '../../utils/loading/loading';
import * as Constants from '../../utils/constants';
import getRequest from '../../utils/requests/getRequest';
import Paging from '../../utils/paging';

import { FaExternalLinkAlt } from 'react-icons/fa';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class BidsWon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            loadingBidsWon: false,
            paging: '',
            bids: []
        }

        this.changeActivePage = this.changeActivePage.bind(this);
        this.getBidsWon = this.getBidsWon.bind(this);
    }

    changeActivePage(pageNum) {
        this.setState({
            activePage: pageNum
        });
    }

    getBidsWon(pageNum) {
        this.setState({loadingBidsWon: true});
        const url = '/app/items/bidsWonItems?page='
            + (pageNum-1) + '&size=5';

        getRequest(url)
        .then(pages => {
            this.setState({
                paging: pages,
                bids: pages.content
            },() =>
                setTimeout(() => {
                    this.setState({loadingBidsWon: false})
                }, Constants.TIMEOUT_DURATION)
            );
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.getBidsWon(this.state.activePage)
    }

    render() {
        if (this.state.loadingBidsWon) {
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
                                        <th> Your Bid <span>(&#36;)</span> </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.bids.map(bid =>
                                        <tr
                                            key={bid.id}
                                            className="clickable"
                                            onClick={ () => this.props.history.push('/auctions/' + bid.id)}
                                        >
                                            <td> <FaExternalLinkAlt style={{verticalAlign: 'baseline'}} className="text-primary"/> </td>
                                            <td> {bid.name} </td>
                                            <td> {bid.country} </td>
                                            <td> {bid.bestBid.bidAmount} </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            <Paging
                                totalPages={this.state.paging.totalPages}
                                getData={this.getBidsWon}
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

export default withRouter(BidsWon);