import * as actionTypes from "../actions/actionType";

const initialState = {
  choices: [],
  characters: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_CHOICES_START:
      return { ...state, loading: true };
    case actionTypes.GET_USER_CHOICES_SUCCESS:
      return { ...state, choices: action.choices, characters: action.characters, loading: false };
    case actionTypes.GET_USER_CHOICES_FAIL:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
