import React from 'react';

import StarRatings from 'react-star-ratings';
import * as Constants from '../../utils/constants';

import { Table } from 'react-bootstrap';

import '../../../../css/user/profile.css';

export default class Ratings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Table borderless size="sm">
                    <thead>
                        <tr>
                            <th className="header"> Rating as Seller </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="body-text">

                            {this.props.sellerRating != null ? (
                                <td>
                                    <StarRatings
                                      name="sellerRating"
                                      numberOfStars={Constants.RATING_STARS}
                                      rating={this.props.sellerRating}
                                      starRatedColor="SandyBrown"
                                      starDimension="18px"
                                      starSpacing="2px"
                                    />
                                    <br />
                                    [<b style={{fontSize: '15px'}}>{this.props.sellerRating}</b> out of <span style={{color:'SteelBlue'}}>5</span>]
                                    <br />
                                    <b style={{fontSize: '15px'}}>{this.props.sellerReputation} reputation</b>
                                </td>
                            ) : (
                                <td>
                                    <StarRatings
                                      name="sellerRating"
                                      numberOfStars={Constants.RATING_STARS}
                                      rating={0}
                                      starRatedColor="SandyBrown"
                                      starDimension="18px"
                                      starSpacing="2px"
                                    />
                                    <br />
                                    <b style={{fontSize:'15px', color:'SandyBrown'}}> No rating yet! </b>
                                </td>
                            )}

                        </tr>
                    </tbody>
                </Table>

                <Table borderless size="sm">
                    <thead>
                        <tr>
                            <th className="header"> Rating as Bidder </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="body-text">

                            {this.props.bidderRating != null ? (
                                <td>
                                    <StarRatings
                                      name="sellerRating"
                                      numberOfStars={Constants.RATING_STARS}
                                      rating={this.props.bidderRating}
                                      starRatedColor="SandyBrown"
                                      starDimension="18px"
                                      starSpacing="2px"
                                    />
                                    <br />
                                    [<b style={{fontSize: '15px'}}>{this.props.bidderRating}</b> out of <span style={{color:'SteelBlue'}}>5</span>]
                                    <br />
                                    <b style={{fontSize: '15px'}}>{this.props.bidderReputation} reputation</b>
                                </td>
                            ) : (
                                <td>
                                    <StarRatings
                                      name="sellerRating"
                                      numberOfStars={Constants.RATING_STARS}
                                      rating={0}
                                      starRatedColor="SandyBrown"
                                      starDimension="18px"
                                      starSpacing="2px"
                                    />
                                    <br />
                                    <b style={{fontSize:'15px', color:'SandyBrown'}}> No rating yet! </b>
                                </td>
                            )}

                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}