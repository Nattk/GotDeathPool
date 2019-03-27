import React, { Component } from 'react';
import Auth from './containers/Auth/Auth';
import Selection from './containers/Selection/Selection';
import Choices from './containers/Choices/Choices';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from './HOC/Layout/Layout';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/selection" component={Selection}/>
          <Route path="/choices" component={Choices}/>
        </Switch>  
      </Layout>  
    </BrowserRouter>
    );
  }
}
export default App;
