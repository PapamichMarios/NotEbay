import React from 'react';

import Loading from '../../../utils/loading/loading';
import * as Constants from '../../../utils/constants';
import getRequest from '../../../utils/requests/getRequest';
import Paging from '../../../utils/paging';

import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class BidderRatings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingBidderRatings : true,
            paging: '',
            bidderRatings: [],
            activePage: 1
        }

        this.changeActivePage = this.changeActivePage.bind(this);
        this.getBidderRatings = this.getBidderRatings.bind(this);
    }

    changeActivePage(pageNum) {
        this.setState({
            activePage: pageNum
        });
    }

    getBidderRatings(pageNum) {

        this.setState({ loadingBidderRatings: true });

        const url = this.props.action + this.props.id + '/bidderRatings'
            + '?page=' + (pageNum-1) + '&size=10';

        getRequest(url)
        .then(ratings => {
            console.log(ratings);

            this.setState({
                bidderRatings: ratings.content,
                paging: ratings
            },
            () => {
                setTimeout(() => {
                  this.setState({loadingBidderRatings: false})
                }, Constants.TIMEOUT_DURATION)
            });
        })
        .catch(error => console.error('Error:', error));

    }

    componentDidMount() {
        this.getBidderRatings(this.state.activePage);
    }

    render() {
        if(this.state.loadingBidderRatings) {
            return <Loading />
        } else {

            let bidderRatings = [];
            console.log(this.state.bidderRatings);
            this.state.bidderRatings.map( rating => {
                bidderRatings.push(
                    <div key={rating.itemId}>
                        <li className='my-list' >
                            User <b>{this.props.username}</b> has received a rating of <b style={{color: 'SandyBrown'}}>{rating.rating}</b> from &nbsp;
                            <Link to={'/'}>
                                <b>{rating.username}</b>
                            </Link>
                            &nbsp; for item: &nbsp;
                            <Link to={'/auctions/' + rating.itemId}>
                                <b>to put item</b>
                            </Link>
                        </li>

                        <br/>

                    </div>
                );
            })

            return (
                <Row>
                    <Col>

                        <h4 className="text-center"> <b>Ratings received from sellers</b> </h4>
                        <hr />
                        <ul style={{listStyleType: 'none'}}>
                            {bidderRatings}
                        </ul>

                        <br />

                        <Paging
                            totalPages={this.state.paging.totalPages}
                            getData={this.getBidderRatings}
                            activePage={this.state.activePage}
                            changeActivePage={this.changeActivePage}
                        />
                    </Col>
                </Row>
            );
        }
    }
}

BidderRatings.defaultProps = {
    action: '/app/users/'
}