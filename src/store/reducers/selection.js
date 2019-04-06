import * as actionTypes from "../actions/actionType";

const initialState = {
  characters: {},
  loading: true,
  char_error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHARACTERS_START:
      return { ...state, loading: true };
    case actionTypes.GET_CHARACTERS_SUCCESS:
      console.log(state);
      return { ...state, characters: action.characters, loading: false };
    case actionTypes.GET_CHARACTERS_FAIL:
      return { ...state, char_error: action.error, loading: false };
    case actionTypes.UPDATE_CHARACTER_STATUS:
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.index]: {
            ...state.characters[action.index],
            status: action.status
          }
        }
      };
    case actionTypes.POST_USER_CHOICES_START:
      return { ...state, loading: true };
    case actionTypes.POST_USER_CHOICES_SUCCESS:
      return { ...state, loading: true };
    case actionTypes.POST_USER_CHOICES_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
