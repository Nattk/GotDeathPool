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
  
export const setAuthRedirect = path => {
    return {
      type: actionTypes.SET_AUTH_REDIRECT,
      path: path
    };
  };

  export const checkAuthTimeOut = expTime => {
    return dispatch => {
      setTimeout(() => {
        dispatch(authLogout());
      }, expTime * 1000);
    };
  };
  
  export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
  
    return {
      type: actionTypes.AUTH_LOGOUT
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
            const expirationDate = new Date(
                new Date().getTime() + response.data.expiresIn * 1000
              );
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("userId", response.data.localId);
            localStorage.setItem("expirationDate", expirationDate);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        }).catch(error=>{
            dispatch(authFail(error.message));
        });
    }
  }

  export const authCheckState = () => {
    console.log('authCheckState');
    return dispatch => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(authLogout());
      } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
          dispatch(authLogout());
        } else {
          const userId = localStorage.getItem("userId");
          dispatch(authSuccess(token, userId));
          dispatch(
            checkAuthTimeOut(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
        }
      }
    };
  };