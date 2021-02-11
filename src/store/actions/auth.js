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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
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
                const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationTime);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkTimeLogout(res.data.expiresIn));
            })
            .catch(err => {
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkTimeLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}