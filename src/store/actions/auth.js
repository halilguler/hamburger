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
                console.log(res.data);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
            })
            .catch(err => {
                console.log(err.response.data.error.message);
                dispatch(authFail(err.response.data.error.message));
            })
    }
}