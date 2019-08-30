import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

export default class Home extends React.Component {
    render() {
      return (
        <Container className="navbar-margin">
          <h3>
            Welcome to our application!
          </h3>
        </Container>
      );
    }
}