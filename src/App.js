import React, { Component } from 'react';
import Selection from './containers/Selection/Selection';
import Choices from './containers/Choices/Choices';
import BackOffice from './containers/BackOffice/BackOffice';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Layout from './HOC/Layout/Layout';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/selection" component={Selection}/>
              <Route path="/choices" component={Choices}/>
              <Route path="/back" component={BackOffice}/>
              <Route path="/Logout" exact component={Logout}/>
              <Route path="/" exact component={Auth}/>
              <Redirect to="/" />
            </Switch>
          </Layout>  
        </BrowserRouter>
    );
  }
}
export default App;
