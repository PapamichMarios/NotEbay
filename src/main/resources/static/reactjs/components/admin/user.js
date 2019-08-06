import React from 'react';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData : null
        }

        console.log(this.props);
    }

    componentDidMount() {
        fetch(this.props.action + '/' + this.props.match.params.id,  {
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
               },
               method: this.props.method
            })
            .then(data => data.json())
            .then((data) => {
                console.log('data' + JSON.stringify(data));

                if (!data.error) {
                    this.setState({
                        userData: data
                    });
                }
            });
    }

    render() {


            if(this.state.userData === null || this.state.userData === undefined) {
                return (
                    <div>
                        <h3>ID: {this.props.match.params.id}</h3>
                        <h3> No user found in the database. </h3>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h3>ID: {this.props.match.params.id}</h3>
                        <h3> {this.state.userData.username}: {this.state.userData.firstName} {this.state.userData.lastName} </h3>
                    </div>
                )
            }
    }
}

User.defaultProps = {
    action: '/app/users',
    method: 'GET'
};