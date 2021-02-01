import {AUTH_SIGN_IN, CHANGE_CURRENCY, CHANGE_NAV} from "./types";

export const LOGEDIN= (payload)=>{
    return dispatch =>{
        dispatch({
            type: AUTH_SIGN_IN,
            payload
        })
    }
}

export const SET_NAV = (route) =>{
    return dispatch => {
        dispatch({
            type : CHANGE_NAV,
            payload : route
        })
    }
}

export const SET_CURRENCY = (currency) =>{
    return dispatch => {
        dispatch({
            type : CHANGE_CURRENCY,
            payload : currency
        })
    }
}