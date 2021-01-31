import {AUTH_SIGN_IN} from "../actions/types";

const DEAFAULT_STATE = {
    isAuthenticated: false
}

const state = (state=DEAFAULT_STATE, action)=>{
    switch(action.type){
        case AUTH_SIGN_IN:
        return { ...state, isAuthenticated : action.payload }
        default: return state
    }
}
export default state;