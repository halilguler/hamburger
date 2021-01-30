import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC49Q-KBojafWu9VaG7jEg_q_f4BJn14GI";
        if (!isSignUp) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC49Q-KBojafWu9VaG7jEg_q_f4BJn14GI";
        }
        axios.post(url, authData)
            .then(res => {
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkTimeLogout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response.data.error.message);
                dispatch(authFail(err.response.data.error.message));
            })
    }
}

export const checkTimeLogout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expireTime * 1000);
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}