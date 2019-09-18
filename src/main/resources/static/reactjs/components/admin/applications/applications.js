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
            paging: '',
            loading: true,
            activePage: 1
        }

        this.changeActivePage = this.changeActivePage.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    //paging
    changeActivePage(pageNum) {
        this.setState({
            activePage: pageNum
        });
    }

    getUsers(pageNum) {
        this.setState({loading: true});
        const url = this.props.action + '?page=' + (pageNum-1) + '&size=10';

        getRequest(url)
        .then(data => {
            this.setState({
                users: data.content,
                paging: data
            },
            () => {
                setTimeout(() => {
                  this.setState({loading: false})
                }, Constants.TIMEOUT_DURATION)
            });
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.getUsers(this.state.activePage);
    }

    render() {
      if (this.state.loading) {
        return <Loading />
      } else {
        return (
            <ApplicationListing
                users={this.state.users}
                paging={this.state.paging}
                activePage={this.state.activePage}
                getData={this.getUsers}
                changeActivePage={this.changeActivePage}
            />
        );
      }
    }
}

Applications.defaultProps = {
    action: 'app/users/all',
    method: 'GET'
};