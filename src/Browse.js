import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Browse extends Component {

	render() {
        return (
          <Router>
            <div id="container">
              <div>
                <Link to="/">Landing</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
              </div>
              <Switch>
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Landing} />
              </Switch>
            </div>
          </Router>
        );
      }
}

export default Browse;