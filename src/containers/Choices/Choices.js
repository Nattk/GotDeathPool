import React, { Component } from "react";
import Classes from "./Choices.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../HOC/Auxiliary/Auxiliary";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Choices extends Component {
  state = {
    characters: {},
    choices: {},
    isLoaded: false
  };
  componentDidMount() {
    this.props.onGetUserChoices(this.props.userId, this.props.token);
  }

  updatePoints = () => {
    let result = 0;
    this.props.characters.forEach((char, index) => {
      if (char.status === this.props.choices[index].status) {
        result = result + 3;
      }
    });
    return result;
  };

  render() {
    let choices = null;
    let points = null;
    if (!this.props.isLoaded) {
      choices = (
        <div>
          {this.props.choices.map((choices, index) => (
            <div className={Classes.Characters} key={choices.id}>
              <p>{choices.name}</p>
              <p>{choices.status}</p>
              <p>{this.props.characters[index].status}</p>
            </div>
          ))}
        </div>
      );
      points = this.updatePoints();
    } else {
      choices = <Spinner />;
    }
    return (
      <Aux>
        <section className={Classes.Choices}>
          <h1>GOT your predictions</h1>
          <p>For each good answer you get 3 points</p>
          <div className={Classes.Titles}>
            <p>Characters</p>
            <p>Predictions</p>
            <p>Status</p>
          </div>
          {choices}
          <div className={Classes.Titles}>
            <p>Points</p>
            <p>{points}</p>
          </div>
        </section>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    choices: state.choices.choices,
    characters: state.choices.characters,
    isLoaded: state.choices.loading,
    error: state.choices.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUserChoices: (userId, token) =>
      dispatch(actionCreators.getUserChoices(userId, token))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Choices)
);
