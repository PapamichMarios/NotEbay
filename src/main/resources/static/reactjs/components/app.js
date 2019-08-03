import React    from 'react';

import NavBar   from './navbar';
import Home     from './homepage';
import Login    from './login';
import Signup   from './signup';
import Page404  from './errors/error404';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin  = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin() {
        //redirect
        this.props.history.push("/welcome");
    }

    handleLogout() {
        //remove token from the session
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('username');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');

        //redirect
        this.props.history.push("/welcome");
    }

    componentDidMount() {
        console.log(localStorage.getItem('accessToken'));
    }

    render() {
      return (
        <div className="App">
            <div>
              <NavBar onLogout={this.handleLogout}/>

              <Switch>
                <Route exact path="/"        component={Home}   />
                <Route exact path="/welcome" component={Home}   />
                <Route exact path="/home"    component={Home}   />
                <Route exact path="/login"   render={(props) => <Login {...props} onLogin={this.handleLogin} />} />
                <Route exact path="/signup"  component={Signup} />
                <Route component={Page404} />
              </Switch>
            </div>
        </div>
      );
    }
}

export default withRouter(App);