import React                from 'react';

import NavBar               from './navbar';
import Home                 from './homepage';
import Login                from './login';
import Signup               from './signup/signup';
import Page404              from './errors/error404';
import Profile              from './user/profile/profile';
import Messages             from './user/messages/messages';
import Categories           from './categories';

import Auction              from './seller/auction/auction';
import AuctionsHomepage     from './seller/myAuctions';
import SellerRating         from './seller/rating';
import SubmitAuction        from './seller/createAuction';
import BidList              from './seller/bidders';

import Bid                  from './bidder/bid';
import BidderRating         from './bidder/rating';

import Users                from './admin/users/users';
import User                 from './admin/users/userProfile';

import Applications         from './admin/applications/applications';
import Application          from './admin/applications/applicationProfile';

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
        localStorage.removeItem('loggedIn');

        //redirect
        this.props.history.push("/welcome");
        location.reload();
    }

    render() {
      return (
        <div className="App">
            <div>
              <NavBar onLogout={this.handleLogout}/>

              <Switch>
                <Route exact path="/"                       component={Home}   />
                <Route exact path="/welcome"                component={Home}   />
                <Route exact path="/home"                   component={Home}   />
                <Route exact path="/login"                  render={(props) => <Login {...props} onLogin={this.handleLogin} />} />
                <Route exact path="/signup"                 component={Signup} />
                <Route exact path="/profile"                component={Profile} />
                <Route exact path="/messages"               component={Messages} />
                <Route exact path="/categories"             component={Categories} />

                <Route exact path="/users"                  component={Users} />
                <Route path="/users/:id"                    component={User} />

                <Route exact path="/applications"           component={Applications} />
                <Route path="/applications/:id"             component={Application} />

                <Route exact path="/my-auctions"            component={AuctionsHomepage} />
                <Route exact path="/my-auctions/:id"        component={Auction} />
                <Route exact path="/my-auctions/:id/bids"   component={BidList} />
                <Route exact path="/my-auctions/:id/rating" component={SellerRating} />
                <Route exact path="/submit-auction"         component={SubmitAuction} />

                <Route exact path="/auctions/:id"           component={Bid} />
                <Route exact path="/auctions/:id/rating"    component={BidderRating} />

                <Route component={Page404} />
              </Switch>
            </div>
        </div>
      );
    }
}

export default withRouter(App);