import {AUTH_SIGN_IN} from "./types";

export const LOGEDIN= (payload)=>{
    return dispatch =>{
        dispatch({
            type: AUTH_SIGN_IN,
            payload
        })
    }
}