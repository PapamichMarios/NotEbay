import React    from 'react';
import UserListing from './userListing.js'

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users : []
        }
    }

    componentDidMount() {
        fetch(this.props.action, {
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
               },
               method: this.props.method
            })
            .then(data => data.json())
            .then((data) => {
                console.log('data' + JSON.stringify(data));
                this.setState({
                    users: data
                });
            });
    }

    render() {
      return <UserListing users={this.state.users} />
    }
}

Users.defaultProps = {
    action: 'app/users/all',
    method: 'GET'
};