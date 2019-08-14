import React        from 'react';

import NavBar       from './navbar';
import Home         from './homepage';
import Login        from './login';
import Signup       from './signup/signup';
import Page404      from './errors/error404';
import Profile      from './user/profile';
import Inbox        from './user/inbox';

import Auction from './auctions/auction';
import AuctionsHomepage     from './auctions/auctionsHomepage.js';
import SubmitAuction from './auctions/submitAuction.js';

import Users        from './admin/users/users';
import User         from './admin/users/userProfile';

import Applications from './admin/applications/applications';
import Application  from './admin/applications/applicationProfile';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin  = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(isAdmin) {

        //redirect after login
        if(isAdmin) {
            this.props.history.push("/users");
            location.reload();
        } else {
            this.props.history.push("/welcome");
            location.reload();
        }
    }

    handleLogout() {
        //remove token from the session
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('username');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('isAdmin');

        //redirect
        this.props.history.push("/welcome");
        location.reload();
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
                <Route exact path="/"               component={Home}   />
                <Route exact path="/welcome"        component={Home}   />
                <Route exact path="/home"           component={Home}   />
                <Route exact path="/login"          render={(props) => <Login {...props} onLogin={this.handleLogin} />} />
                <Route exact path="/signup"         component={Signup} />
                <Route exact path="/profile"        component={Profile} />
                <Route exact path="/inbox"          component={Inbox} />


                <Route exact path="/users"          component={Users} />
                <Route path="/users/:id"            component={User} />

                <Route exact path="/applications"   component={Applications} />
                <Route path="/applications/:id"     component={Application} />

                <Route exact path="/auctions"       component={AuctionsHomepage} />
                <Route path="/auctions/:id"         component={Auction} />
                <Route exact path="/submitAuction"  component={SubmitAuction} />
                <Route component={Page404} />
              </Switch>
            </div>
        </div>
      );
    }
}

export default withRouter(App);