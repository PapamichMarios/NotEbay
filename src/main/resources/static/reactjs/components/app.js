import React    from 'react';

import NavBar   from './navbar';
import Home     from './homepage';
import Login    from './login';
import Signup   from './signup';
import Page404  from './errors/error404';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
    render() {
      return (
        <div className="App">
          <Router>
            <div>
              <NavBar />

              <Switch>
                <Route exact path="/"        component={Home}   />
                <Route exact path="/welcome" component={Home}   />
                <Route exact path="/home"    component={Home}   />
                <Route exact path="/login"   component={Login}  />
                <Route exact path="/signup"  component={Signup} />
                <Route component={Page404} />
              </Switch>

            </div>
          </Router>
        </div>
      );
    }
}