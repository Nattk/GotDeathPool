import * as actionTypes from '../actions/actionType';

const initialState = {
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_CHOICES:
      return {
      }
    default:
      return state;
  }
};

export default reducer;
