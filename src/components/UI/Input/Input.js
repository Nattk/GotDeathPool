import React from "react";
import Aux from "../../../HOC/Auxiliary/Auxiliary";
import Classes from "./Input.css";

const input = props => (
  <Aux>
    <input
      className={Classes.Input}
      onChange={props.changed}
      type={props.type}
      placeholder={props.placeholder}
    />
  </Aux>
);

export default input;
