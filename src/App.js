import React, { Component } from 'react';
import Selection from './containers/Selection/Selection';
import Choices from './containers/Choices/Choices';
import BackOffice from './containers/BackOffice/BackOffice';
import SingIn from './containers/Auth/Sign/SignIn/SignIn';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Layout from './HOC/Layout/Layout';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/signIn" component={SingIn}/>
          <Route path="/selection" component={Selection}/>
          <Route path="/choices" component={Choices}/>
          <Route path="/back" component={BackOffice}/>
        </Switch>  
      </Layout>  
    </BrowserRouter>
    );
  }
}
export default App;
