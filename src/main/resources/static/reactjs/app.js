class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		    users: [],
		    isLoaded : false,
		    error : null
		};
	}

	componentDidMount() {
		fetch("http://localhost:8080/api/users")
              .then(
                (response) => response.json())
              .then(
                (response) => {
                  this.setState({
                    users: response._embedded.users,
                    isLoaded : true
                  });
                },
                (error) => {
                  this.setState({
                    isLoaded : true,
                    error : error
                  });
                }
              );
	}

	render() {

	    const { error, isLoaded, users } = this.state;

        if (error) {
            return(
                <div>Error: {error.message}</div>
            )
        }
        else if (!isLoaded) {
            return (
                <div>Loading...</div>
            )
        }
        else {
		    return (
			    <UserList users={this.state.users}/>
			)
	    }
	}
}

class UserList extends React.Component{
	render() {
		const users = this.props.users.map(
		    user =>
			    <User key={user._links.self.href} user={user}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>E-mail</th>
						<th>Username</th>
					</tr>
					{users}
				</tbody>
			</table>
		)
	}
}

class User extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.user.email}</td>
				<td>{this.props.user.username}</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)