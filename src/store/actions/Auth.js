import * as actionTypes from "./actionType";
import axios from "axios";

const API_KEY = "AIzaSyCpnZs1i9Onn7oAqnigHkQCF6cvcU_QtBE";

export const authStart = () => {
    return {
      type: actionTypes.AUTH_START
    };
  };
  
  export const authSuccess = (token, userId) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      token: token,
      userId: userId
    };
  };
  
  export const authFail = error => {
    return {
      type: actionTypes.AUTH_FAIL,
      error: error
    };
  };

  export const auth = (email,password,signUp) => {
    return dispatch => {
        dispatch(authStart());
        let url =  null;
        const payload = {
            email: email,
            password: password,
            returnSecureToken: true        
        }
        if(signUp){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+API_KEY;
        }
        else{
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="+API_KEY;
        }
        axios.post(url,payload).then(response =>{
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("userId", response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        }).catch(error=>{
            dispatch(authFail(error.message));
        });
    }
  }