import * as actionTypes from '../actions/actionType';

const initialState = {
    characters: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHARACTERS:
      return {
      };
    default:
      return state;
  }
};

export default reducer;
