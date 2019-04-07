import React, { Component } from "react";
import Classes from "./Layout.css";
import Header from "../../components/header/Header";
import Aux from "../Auxiliary/Auxiliary";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Header />
        <div className={Classes.Layout}>{this.props.children}</div>
      </Aux>
    );
  }
}

export default Layout;
