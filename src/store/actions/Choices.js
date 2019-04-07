import * as actionTypes from "./actionType";
import axios from "axios";

export const getUserChoicesStart = () => {
    return {
      type: actionTypes.GET_USER_CHOICES_START
    };
  };
  
  export const getUserChoicesSuccess = (choices,characters) => {
    return {
      type: actionTypes.GET_USER_CHOICES_SUCCESS,
      choices: choices,
      characters: characters
    };
  };

  export const getCharactersSuccess = characters => {
    return {
      type: actionTypes.GET_CHARACTERS_SUCCESS,
      characters: characters
    };
  };
  
  export const getUserChoicesFail = error => {
    return {
      type: actionTypes.GET_USER_CHOICES_FAIL,
      error: error
    };
  };
  

export const getUserChoices = (userId, token) =>{
    return dispatch =>{
        dispatch(getUserChoicesStart());
        axios.all([
          axios.get('https://gotpool-83470.firebaseio.com/users/'+userId+'/choices.json?auth='+token),
          axios.get('https://gotpool-83470.firebaseio.com/characters.json?auth='+token)
        ]).then((choices) =>{
          console.log(choices);
          dispatch(getUserChoicesSuccess(choices[0].data,choices[1].data));
        })
        .catch(error=>{
          console.log(error);
            dispatch(getUserChoicesFail(error.message));
        })   
    }

}