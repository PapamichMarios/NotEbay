import React                from 'react';

import NavBar               from './navbar';
import Home                 from './homepage/homepage';
import Login                from './login';
import Signup               from './signup/signup';
import Page404              from './errors/error404/error404';
import Page401              from './errors/error401/error401';
import Page500              from './errors/error500/error500';
import Profile              from './user/profile/profile';
import Categories           from './categories';
import AdvancedSearch       from './search/advancedSearch';
import SearchResult         from './search/searchResult';

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

import CreateMessage        from './user/messages/createMessage';
import Inbox                from './user/messages/inbox';
import Sent                 from './user/messages/sent';
import Message              from './user/messages/message';

import isAuthenticated      from './utils/authentication/isLoggedIn';
import isAdmin              from './utils/authentication/isAdmin';

import Loading              from './utils/loading/loading';
import * as Constants       from './utils/constants';

import { BrowserRouter as Router, Switch, Route, withRouter, Redirect } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        this.handleLogin  = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.saveCategories = this.saveCategories.bind(this);
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
        //clear the session
        localStorage.clear();

        //redirect
        this.props.history.push("/welcome");
        location.reload();
    }

    saveCategories() {
        this.setState({loading: true});

        //get root categories
        fetch('/app/categories/rootSubs', {
           headers: {
               'Accept': 'application/json',
           },
           method: 'GET'
        })
        .then(categories => categories.json())
        .then(categories => {
            localStorage.setItem('categories', JSON.stringify(categories));
        })
        .catch(error => console.error('Error', error));

        //set loading
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, Constants.TIMEOUT_DURATION);
    }

    componentDidMount() {
      //save the categories in the session
      if(localStorage.getItem('categories') === null) {
        this.saveCategories();
      }
    }

    render() {
      if(this.state.loading) {
        return <Loading />;
      } else {
        let categories = JSON.parse(localStorage.getItem('categories'));
        return (
            <div className="App">
                <div>
                  <NavBar onLogout={this.handleLogout} categories={categories} />

                  <Switch>
                    {/* public */}
                    <Route exact path="/"                                render={ (props) => <Home {...props} onLogin={this.handleLogin} /> } />
                    <Route exact path="/welcome"                         render={ (props) => <Home {...props} onLogin={this.handleLogin} /> } />
                    <Route exact path="/home"                            render={ (props) => <Home {...props} onLogin={this.handleLogin} /> } />
                    <Route exact path="/categories"                      component={Categories} />
                    <Route exact path="/advanced-search"                 component={AdvancedSearch} />

                    <Route exact path="/searchResults?category=:category" component={SearchResult} />
                    <Route exact path="/searchResults?name=:name"         component={SearchResult} />
                    <Route exact path="/searchResults?category=:category&name=:name&description=:description&minPrice=:minPrice&maxPrice=:maxPrice&city=:city&country=:country"
                                                                         component={SearchResult} />


                    <Route exact path="/login"                           render={ (props) => !isAuthenticated() ? <Login {...props} onLogin={this.handleLogin} /> : <Redirect to="/" />} />
                    <Route exact path="/signup"                          render={ () => !isAuthenticated() ? <Signup /> : <Redirect to="/" /> } />

                    {/* admin */}
                    <Route exact path="/users"                           render={ () => isAdmin() ? <Users />        : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/users/:id"                       render={ () => isAdmin() ? <User />         : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/applications"                    render={ () => isAdmin() ? <Applications /> : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/applications/:id"                render={ () => isAdmin() ? <Application />  : <Redirect to="/unauthorized" /> } />

                    {/* authenticated */}
                    <Route exact path="/profile"                         render={ () => isAuthenticated() ? <Profile />          : <Redirect to="/unauthorized" /> } />

                    <Route exact path="/my-auctions"                     render={ () => isAuthenticated() ? <AuctionsHomepage /> : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/my-auctions/:id"                 render={ () => isAuthenticated() ? <Auction />          : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/my-auctions/:id/bids"            render={ () => isAuthenticated() ? <BidList />          : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/my-auctions/:id/rating"          render={ () => isAuthenticated() ? <SellerRating />     : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/submit-auction"                  render={ () => isAuthenticated() ? <SubmitAuction />    : <Redirect to="/unauthorized" /> } />

                    <Route exact path="/auctions/:id"                    render={ () => isAuthenticated() ? <Bid />              : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/auctions/:id/rating"             render={ () => isAuthenticated() ? <BidderRating />     : <Redirect to="/unauthorized" /> } />

                    <Route exact path="/messages"                        render={ () => isAuthenticated() ? <Inbox />            : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/messages/inbox"                  render={ () => isAuthenticated() ? <Inbox/>             : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/messages/sent"                   render={ () => isAuthenticated() ? <Sent />             : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/messages/inbox/message/:id"      render={ () => isAuthenticated() ? <Message />          : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/messages/sent/message/:id"       render={ () => isAuthenticated() ? <Message />          : <Redirect to="/unauthorized" /> } />
                    <Route exact path="/messages/create-message"         render={ () => isAuthenticated() ? <CreateMessage />    : <Redirect to="/unauthorized" /> } />

                    {/* errors */}
                    <Route exact path="/unauthorized"                    component={Page401} />
                    <Route exact path="/internal-server-error"           component={Page500} />
                    <Route component={Page404} />
                  </Switch>
                </div>
            </div>
        );
      }
    }
}

export default withRouter(App);