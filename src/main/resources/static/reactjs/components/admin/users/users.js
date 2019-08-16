import React    from 'react';
import UserListing from './userListing.js';
import Loading from '../../utils/loading/loading.js';
import * as Constants from '../../utils/constants.js';
import getRequest from '../../utils/requests/getRequest';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
        getRequest(this.props.action)
        .then(data => {
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
        return <UserListing users={this.state.users} />
      }
    }
}

Users.defaultProps = {
    action: '/app/users/all',
    method: 'GET'
};