import React from 'react';

import AccountDetails from './accountDetails.js';
import UserDetails from './userDetails.js';
import LocationConfirmation from './locationConfirmation.js';
import Confirmation from './confirmation.js';

import { ButtonGroup, ButtonToolbar, Container, Row, Col, Form, Button, Card, InputGroup, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHome, FaGlobe, FaFile } from 'react-icons/fa';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username:       '',
            password:       '',
            repassword:     '',
            firstName:      '',
            lastName:       '',
            email:          '',
            phone:          '',
            streetAddress:  '',
            country:        '',
            tin:            '',
            city:           '',
            postalCode:     '',
            lat:            '',
            lng:            '',

            success:        false,
            step:           1
        };

        //binding this to submethods
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setGeoLocation = this.setGeoLocation.bind(this);
    }

    //set geo location
    setGeoLocation(lat, lng) {
        this.setState ({
            lat: lat,
            lng: lng
        });

        console.log(this.state.lat + ' ' + this.state.lng);
    }
    //sign up process steps
    nextStep() {
        const {step} = this.state;
        this.setState ({
            step: step + 1
        });
    }

    prevStep() {
        const { step } = this.state;
        this.setState({
            step : step - 1
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        if (this.state.success) {
            return <SignUpSuccess />
        } else {
            const {step} = this.state;
            const { username, password, repassword, firstName, lastName, email, phone, tin, lat, lng, streetAddress, city, country, postalCode } = this.state;
            const location = { streetAddress, city, country, postalCode };
            const values = { username, email, password, repassword, firstName, lastName, phone, tin, lat, lng, streetAddress, city, country, postalCode };

            switch(step) {
                case 1:
                    return  <AccountDetails
                                nextStep={this.nextStep}
                                onChange={this.onChange}
                                values={values}
                                />
                case 2:
                    return <UserDetails
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                onChange={this.onChange}
                                values={values}
                                />
                case 3:
                    return <LocationConfirmation
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                onChange={this.onChange}
                                setGeoLocation={this.setGeoLocation}
                                location={location}
                                />
                case 4:
                    return <Confirmation
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                values={values}
                                location={location}
                                />
                case 5:
            }
        }
    }
}