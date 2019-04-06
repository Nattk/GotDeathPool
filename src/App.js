import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
import Selection from "./containers/Selection/Selection";
import Choices from "./containers/Choices/Choices";
import BackOffice from "./containers/BackOffice/BackOffice";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Layout from "./HOC/Layout/Layout";

class App extends Component {
  state = {
    authCheckout: false
  };

  componentWillMount() {
    this.props.onAutoSignup();
  }

  render() {
    let routes = null;

    if (this.props.isAuthenticated) {
      routes = (
        <Layout>
          <Switch>
            <Route path="/selection" component={Selection} />
            <Route path="/choices" component={Choices} />
            <Route path="/back" component={BackOffice} />
            <Route path="/Logout" exact component={Logout} />
            <Route path="/" exact component={Auth} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      );
    } else {
      routes = (
        <Layout>
          <Switch>
            <Route path="/" exact component={Auth} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      );
    }
    return routes;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignup: () => dispatch(actionCreators.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
