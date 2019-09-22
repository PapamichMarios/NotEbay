import React from 'react';

import Loading from '../utils/loading/loadingButton';
import * as Constants from '../utils/constants';
import getRequest from '../utils/requests/getRequest';

import { Container, Card, Row, Col, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { FaUserFriends, FaSignInAlt, FaLock, FaUser } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';

class Recommendation extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loading: true
        };
    }

    componentDidMount() {
        getRequest('/app/recommend')
        .then(items => {

            this.setState({
                items: items
            },
            () => {
                //redirect
                setTimeout( () => {
                    this.setState({loading: false})
                }, Constants.TIMEOUT_DURATION);
            });
        })
        .catch(error => console.error("Error: ", error));
    }

    render() {
        if(this.state.loading) {
            return <Loading />
        } else {

            let recommendation = [];
            this.state.items.map( item => {
                recommendation.push(
                    <Col key={item.id} className="text-center">
                        <Link to={"/auctions/" + item.id}> <h5> <b> {item.name} </b> </h5> </Link>
                        <br />
                        <img src={'/app/items/' + item.id + '/images/' + item.imageId} width='275' height= '250'/>
                    </Col>
                );
            });

            return (
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title as="h4"> <b>Our recommendations for you:</b> </Card.Title>
                                <Row>
                                    {recommendation}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        }
    }
}

export default withRouter(Recommendation);