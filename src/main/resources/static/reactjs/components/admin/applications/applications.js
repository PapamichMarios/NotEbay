import React from 'react';
import ApplicationListing from './applicationListing.js';
import Loading from '../../utils/loading/loading.js';
import * as Constants from '../../utils/constants.js';
import getRequest from '../../utils/requests/getRequest';

export default class Applications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
        getRequest(this.props.action)
        .then((data) => {
            this.setState({
                users: data
            });
        })
        .catch(error => console.error('Error:', error));

        //set loading
        setTimeout(() => {
          this.setState({loading: false})
        }, Constants.TIMEOUT_DURATION)
    }

    render() {
      if (this.state.loading) {
        return <Loading />
      } else {
        return <ApplicationListing users={this.state.users} />
      }
    }
}

Applications.defaultProps = {
    action: 'app/users/all',
    method: 'GET'
};