import * as actionTypes from "./actionType";
import axios from "axios";

export const getBackCharactersStart = () => {
  return {
    type: actionTypes.GET_BACK_CHARACTERS_START
  };
};

export const getBackCharactersSuccess = characters => {
  return {
    type: actionTypes.GET_BACK_CHARACTERS_SUCCESS,
    characters: characters
  };
};

export const getBackCharactersFail = error => {
  return {
    type: actionTypes.GET_BACK_CHARACTERS_FAIL,
    error: error
  };
};

export const patchCharacterStatusSuccess = (response) => {
  return {
    type: actionTypes.PATCH_CHARACTER_STATUS_SUCCESS,
    response: response
  };
};

export const patchCharacterStatusStart = () => {
    return {
      type: actionTypes.PATCH_CHARACTER_STATUS_START,
    };
  };

  export const patchCharacterStatusFail = () => {
    return {
      type: actionTypes.PATCH_CHARACTER_STATUS_FAIL,
    };
  };


export const getBackCharacters = token => {
  return dispatch => {
    dispatch(getBackCharactersStart());

    axios
      .get("https://gotpool-83470.firebaseio.com/characters.json?auth=" + token)
      .then(char => {
          console.log(char);
        dispatch(getBackCharactersSuccess(char.data));
      })
      .catch(error => {
        dispatch(getBackCharactersFail(error.message));
      });
  };
};

export const patchCharacterStatus = (index,status,token) => {
    return dispatch =>{
        dispatch(patchCharacterStatusStart());
        const data = {"status":status};
        axios.patch('https://gotpool-83470.firebaseio.com/characters/'+index+'/.json?auth='+token, data).then(response =>{
            dispatch(patchCharacterStatusSuccess(response));
        }).catch(error=>{
            dispatch(patchCharacterStatusFail(error.message))
        })
    }

}