import React from "react";
import Aux from "../../../HOC/Auxiliary/Auxiliary";
import Classes from "./Button.css";

const button = props => {
  if (props.disabled) {
    return (
      <Aux>
        <button className={Classes[props.btnType]} onClick={props.clicked}>
          {props.name}
        </button>
      </Aux>
    );
  } else {
    return (
      <Aux>
        <button
          className={Classes[props.btnType]}
          disabled
          onClick={props.clicked}
        >
          {props.name}
        </button>
      </Aux>
    );
  }
};

export default button;
