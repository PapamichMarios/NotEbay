import React from 'react';

import { Row, Col, Carousel, Image } from 'react-bootstrap';

import firstImage  from './privacy.png';
import secondImage from './safety.png';
import thirdImage  from './admin.jpg';

export default class InfoCarousel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col>
                    <Carousel fade style={{backgroundColor: 'DimGray'}}>
                        <Carousel.Item>

                            <div className="text-center">
                                <img src={firstImage} width='600' height= '600'/>
                            </div>

                            <Carousel.Caption>
                                <h3 style={{textShadow: 'black 1px 1px 12px'}}> <b> Privacy </b> </h3>
                                <p style={{textShadow: 'black 1px 1px 12px'}}> We do not sell your info to third-parties or harm your privacy in any way </p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item >

                            <div className="text-center">
                                <img src={secondImage} width='600' height= '600'/>
                            </div>

                            <Carousel.Caption>
                                <h3 style={{textShadow: 'black 1px 1px 12px'}}> Eliminate Scamming </h3>
                                <p style={{textShadow: 'black 1px 1px 12px'}}> All users using the platform are first reviewed from our admin staff </p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item className="carousel">

                            <div className="text-center">
                                <img src={thirdImage} width='600' height= '600' />
                            </div>

                            <Carousel.Caption>
                                <h3 style={{textShadow: 'black 1px 1px 12px'}}> Constant Monitoring </h3>
                                <p style={{textShadow: 'black 1px 1px 12px'}}> Our staff are constantly monitoring the auctions taking place and they are here to help you 24/7 </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        );
    }
}