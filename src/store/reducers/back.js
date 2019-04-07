import * as actionTypes from "../actions/actionType";

const initialState = {
  characters: [],
  error: null,
  loading: true,
  refresh: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BACK_CHARACTERS_START:
      return { ...state, loading: true };
    case actionTypes.GET_BACK_CHARACTERS_SUCCESS:
      return { ...state, characters: action.characters, loading: false };
    case actionTypes.GET_BACK_CHARACTERS_FAIL:
      return { ...state, error: action.error, loading: false };
    case actionTypes.PATCH_CHARACTER_STATUS_START:
      return { ...state, loading: true };
    case actionTypes.PATCH_CHARACTER_STATUS_SUCCESS:
      return { ...state, refresh: true, loading: false };
    case actionTypes.PATCH_CHARACTER_STATUS_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducer;
