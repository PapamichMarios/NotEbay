import React from 'react';

import Loading from '../../../utils/loading/loading';
import * as Constants from '../../../utils/constants';
import getRequest from '../../../utils/requests/getRequest';
import Paging from '../../../utils/paging';

import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class SellerRatings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingSellerRatings : true,
            sellerRatings : [],
            paging: '',
            activePage: 1
        }

        this.changeActivePage = this.changeActivePage.bind(this);
        this.getSellerRatings = this.getSellerRatings.bind(this);
    }

    changeActivePage(pageNum) {
        this.setState({
            activePage: pageNum
        });
    }

    getSellerRatings(pageNum) {

        this.setState({ loadingSellerRatings: true });

        const url = this.props.action + this.props.id + '/sellerRatings'
            + '?page=' + (pageNum-1) + '&size=10';

        getRequest(url)
        .then(ratings => {

            this.setState({
                sellerRatings: ratings.content,
                paging: ratings
            },
            () => {
                setTimeout(() => {
                  this.setState({loadingSellerRatings: false})
                }, Constants.TIMEOUT_DURATION)
            });
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.getSellerRatings(this.state.activePage);
    }

    render() {
        if(this.state.loadingSellerRatings) {
            return <Loading />
        } else {

            let sellerRatings = [];
            this.state.sellerRatings.map( rating => {
                sellerRatings.push(
                    <div key={rating.itemId}>
                        <li className='my-list' >
                            You have received a rating of <b style={{color: 'SandyBrown'}}>{rating.rating}</b> from &nbsp;
                            <Link to={'/'}>
                                <b>{rating.username}</b>
                            </Link>
                            &nbsp; for item: &nbsp;
                            <Link to={'/auctions/' + rating.itemId}>
                                <b>{rating.itemName}</b>
                            </Link>
                        </li>

                        <br/>
                    </div>
                );
            })

            return (
                <Row>
                    <Col>

                        <h4 className="text-center"> <b>Ratings received from bidders</b> </h4>
                        <hr />
                        <ul style={{listStyleType: 'none'}}>
                            {sellerRatings}
                        </ul>

                        <br />

                        <Paging
                            totalPages={this.state.paging.totalPages}
                            getData={this.getSellerRatings}
                            activePage={this.state.activePage}
                            changeActivePage={this.changeActivePage}
                        />
                    </Col>
                </Row>
            );
        }
    }
}

SellerRatings.defaultProps = {
    action: '/app/users/'
}