import React, { Component } from 'react';
import Selection from './containers/Selection/Selection';
import Choices from './containers/Choices/Choices';
import BackOffice from './containers/BackOffice/BackOffice';
import SingIn from './containers/Auth/Sign/SignIn/SignIn';
import Logout from './containers/Auth/Logout/Logout';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Layout from './HOC/Layout/Layout';

class App extends Component {
  render() {
    let routes = null;
    if(localStorage.getItem('token')){
      routes = (
        <Switch>
        <Route path="/selection" component={Selection}/>
        <Route path="/choices" component={Choices}/>
        <Route path="/back" component={BackOffice}/>
        <Route path="/Logout" exact component={Logout}/>
        <Route path="/" exact component={SingIn}/>
        <Redirect to="/" />
      </Switch>
      )
    }
    else{
      routes = (
        <Switch>
          <Route path="/" exact component={SingIn}/>
          <Redirect to="/" />
        </Switch> 
      ) 
    }

    return (
    <BrowserRouter>
      <Layout>
        {routes}
      </Layout>  
    </BrowserRouter>
    );
  }
}
export default App;
