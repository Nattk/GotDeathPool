import * as actionTypes from "../actions/actionType";

const initialState = {
  characters: [],
  loading: false,
  char_error: null,
  post_success: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHARACTERS_START:
      return { ...state, loading: true };
    case actionTypes.GET_CHARACTERS_SUCCESS:
      return { ...state, characters: action.characters, loading: false };
    case actionTypes.GET_CHARACTERS_FAIL:
      return { ...state, char_error: action.error, loading: false };
    case actionTypes.CHOICES_DONE:
      return { ...state, postSuccess: true, loading: false };
    case actionTypes.UPDATE_CHARACTER_STATUS:
      let character = [...state.characters];
      character = character.map((item,index)=>{
        if(index === action.index){
          item = {...item, status:action.status}
          return item;
        }
        return item;
      })
    return {...state,characters:character};
    case actionTypes.POST_USER_CHOICES_START:
      return { ...state, loading: true };
    case actionTypes.POST_USER_CHOICES_SUCCESS:
      return { ...state, loading: false, postSuccess: true };
    case actionTypes.POST_USER_CHOICES_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
