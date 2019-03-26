import React, { Component } from 'react';
import Auth from './containers/Auth/Auth';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from './HOC/Layout/Layout';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth}/>
        </Switch>  
      </Layout>  
    </BrowserRouter>
    );
  }
}

export default App;
