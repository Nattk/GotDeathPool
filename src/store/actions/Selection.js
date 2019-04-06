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
    console.log(userId,token);
    axios
      .get(
        "https://gotpool-83470.firebaseio.com/users/"+userId +".json?auth=" +token,
        { cancelToken: source.token }
      )
      .then(choice => {
        console.log(choice);
        if (choice.data) {
          source.cancel("Redirection.");
        } else {
          return axios.get(
            "https://gotpool-83470.firebaseio.com/characters.json?auth=" +
              token
          );
        }
      })
      .then(char => {
        console.log(char);
          dispatch(getCharactersSuccess(char.data))
      })
      .catch(error => {
        if (axios.isCancel(error)) {
            console.log('cancel', error);
            dispatch(getCharactersFail(error.message))
        } else {
             console.log('not cancel', error);
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