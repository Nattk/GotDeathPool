import * as actionTypes from "../actions/actionType";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, error: null, loading: true };
    case actionTypes.AUTH_SUCCESS:
      return { ...state, token: action.token, userId: action.userId, loading: false};
    case actionTypes.AUTH_FAIL:
      return { ...state, error: action.error, loading: false };
    case actionTypes.AUTH_LOGOUT:
      return { ...state, token: null, userId: null, authRedirectPath: "/" };
    case actionTypes.SET_AUTH_REDIRECT:
        return {...state, authRedirectPath: action.path}
    default:
      return state;
  }
};

export default reducer;
