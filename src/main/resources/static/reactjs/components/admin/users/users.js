import React    from 'react';
import UserListing from './userListing.js';
import Loading from '../../utils/loading.js';
import * as Constants from '../../utils/constants.js';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
        fetch(this.props.action, {
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': Constants.ACCESS_TOKEN
               },
               method: this.props.method
            })
            .then(data => data.json())
            .then(data => {
                this.setState({
                    users: data
                });
            });

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