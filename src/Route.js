import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/login/Login";

class AppRouter extends Component {
  render() {
    const user = localStorage.getItem("persistantState");
    console.log("user", this.props.user.auth);
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signin" component={Login} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.Login };
};

export default connect(mapStateToProps)(AppRouter);
