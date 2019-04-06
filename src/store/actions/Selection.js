import * as actionTypes from "./actionType";
import axios from "axios";

export const getCharactersStart = () => {
  return {
    type: actionTypes.GET_CHARACTERS_START
  };
};

export const getCharactersSuccess = characters => {
  return {
    type: actionTypes.GET_CHARACTERS_SUCCESS,
    characters: characters
  };
};

export const getCharactersFail = error => {
  return {
    type: actionTypes.GET_CHARACTERS_FAIL,
    error: error
  };
};

export const updateCharacterStatus = (index,status) =>{
    return {
        type: actionTypes.UPDATE_CHARACTER_STATUS,
        index: index,
        status: status
    }
}

export const getCharacters = (userId, token) => {
  return dispatch => {
    dispatch(getCharactersStart());
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios
      .get(
        "https://gotpool-83470.firebaseio.com/users/"+userId +".json?auth=" +token,
        { cancelToken: source.token }
      )
      .then(choice => {
        if (choice.data) {
          source.cancel("Redirection.");
        } else {
          return axios.get(
            "https://gotpool-83470.firebaseio.com/characters.json?auth=" +
              userId
          );
        }
      })
      .then(char => {
          dispatch(getCharactersSuccess(char.data))
      })
      .catch(error => {
        if (axios.isCancel(error)) {
            dispatch(getCharactersFail(error.message))
        } else {
            dispatch(getCharactersFail(error.message))
        }
      });
  };
};

export const postUserChoicesStart = () => {
    return {
      type: actionTypes.POST_USER_CHOICES_START
    };
  };
  
  export const postUserChoicesSuccess = response => {
    return {
      type: actionTypes.POST_USER_CHOICES_SUCCESS,
      response: response
    };
  };
  
  export const postUserChoicesFail = error => {
    return {
      type: actionTypes.POST_USER_CHOICES_FAIL,
      error: error
    };
  };

  export const postUserChoice = (userChoices, userId, token) =>{
      return dispatch =>{
        dispatch(postUserChoicesStart());
        const payload = {userChoices, choice:true};
        axios.patch('https://gotpool-83470.firebaseio.com/users/'+userId+'.json?auth='+token, payload).then( response =>{
            //this.props.push.history('/choices');
            dispatch(postUserChoicesSuccess(response));
        }).catch(error=>{
            dispatch(postUserChoicesFail(error));
        })
      }
  }